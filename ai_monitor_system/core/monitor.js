
// 监察系统核心
const logger = require('./logger');
const feedbackCollector = require('./feedback');
const validator = require('./validator');
const config = require('../config/config');

class AIMonitor {
  constructor() {
    this.actionId = 0;
    this.validationHistory = [];
    this.isRunning = false;
  }

  // 执行带监察的操作
  async executeWithMonitor(actionFn, actionType, actionParams, validationConfig = {}) {
    if (!config.monitor.enabled) {
      return await actionFn();
    }

    const action = {
      id: ++this.actionId,
      type: actionType,
      params: actionParams,
    };

    logger.info('开始执行操作', { actionId: action.id, actionType, actionParams });

    let attempts = 0;
    let lastResult = null;
    let lastValidation = null;

    while (attempts &lt;= config.monitor.maxRetries) {
      attempts++;
      logger.debug(`执行尝试 ${attempts}/${config.monitor.maxRetries + 1}`, { actionId: action.id });

      try {
        // 1. 采集操作前状态
        const preState = await feedbackCollector.capturePreState(actionType, actionParams);

        // 2. 执行操作
        const startTime = Date.now();
        const result = await actionFn();
        const executionTime = Date.now() - startTime;

        // 3. 采集操作后状态
        const postState = await feedbackCollector.capturePostState(action.id);

        // 4. 生成反馈
        const feedback = feedbackCollector.generateFeedback(preState, postState, action);
        feedback.executionTime = executionTime;

        // 5. 验证操作结果
        const validation = await validator.validate(feedback, validationConfig);

        // 保存验证结果
        this.validationHistory.push({
          action,
          feedback,
          validation,
          attempt: attempts,
          timestamp: Date.now(),
        });

        lastResult = result;
        lastValidation = validation;

        if (validation.success) {
          logger.info('操作执行成功', { 
            actionId: action.id, 
            attempts 
          });
          return {
            success: true,
            result,
            validation,
            feedback,
            attempts,
          };
        }

        // 操作失败，检查是否需要重试
        if (!config.monitor.autoRetry || !validation.retrySuggested) {
          logger.warn('操作失败，不进行重试', { 
            actionId: action.id, 
            errorType: validation.errorType 
          });
          break;
        }

        if (attempts &lt;= config.monitor.maxRetries) {
          logger.info('操作失败，准备重试', { 
            actionId: action.id, 
            errorType: validation.errorType,
            delay: config.monitor.retryDelay,
          });
          
          // 等待重试延迟
          await this.sleep(config.monitor.retryDelay);
        }

      } catch (e) {
        logger.error('操作执行异常', { 
          actionId: action.id, 
          error: e.message,
          attempt: attempts,
        });

        if (attempts &gt; config.monitor.maxRetries) {
          break;
        }

        await this.sleep(config.monitor.retryDelay);
      }
    }

    // 所有重试都失败
    logger.error('操作最终失败', { 
      actionId: action.id, 
      totalAttempts: attempts 
    });

    return {
      success: false,
      result: lastResult,
      validation: lastValidation,
      attempts,
      error: lastValidation?.errorType || 'UNKNOWN_ERROR',
    };
  }

  // 快速执行点击操作
  async click(x, y, validationConfig = {}) {
    return await this.executeWithMonitor(
      async () =&gt; {
        if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.clickAsync) {
          return await zdjl.clickAsync(x, y);
        }
        logger.debug('模拟点击', { x, y });
        return { x, y };
      },
      'click',
      { x, y },
      validationConfig
    );
  }

  // 快速执行滑动操作
  async swipe(x1, y1, x2, y2, validationConfig = {}) {
    return await this.executeWithMonitor(
      async () =&gt; {
        if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.swipeAsync) {
          return await zdjl.swipeAsync(x1, y1, x2, y2, config.action.swipeDuration);
        }
        logger.debug('模拟滑动', { x1, y1, x2, y2 });
        return { x1, y1, x2, y2 };
      },
      'swipe',
      { x1, y1, x2, y2 },
      validationConfig
    );
  }

  // 快速执行文本输入
  async inputText(text, validationConfig = {}) {
    return await this.executeWithMonitor(
      async () =&gt; {
        if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.inputAsync) {
          return await zdjl.inputAsync(text);
        }
        logger.debug('模拟输入', { text });
        return { text };
      },
      'input',
      { text },
      validationConfig
    );
  }

  // 按文字查找并点击
  async clickByText(targetText, validationConfig = {}) {
    return await this.executeWithMonitor(
      async () =&gt; {
        // 查找包含目标文字的位置
        let location = null;
        if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.findLocationAsync) {
          location = await zdjl.findLocationAsync({ text: targetText });
        }
        
        if (location) {
          if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.clickAsync) {
            return await zdjl.clickAsync(location.x, location.y);
          }
          return { x: location.x, y: location.y, text: targetText };
        }
        
        throw new Error(`未找到文字: ${targetText}`);
      },
      'clickByText',
      { text: targetText },
      validationConfig
    );
  }

  // 获取验证历史
  getValidationHistory() {
    return this.validationHistory;
  }

  // 获取统计报告
  getStatistics() {
    const total = this.validationHistory.length;
    const successful = this.validationHistory.filter(v =&gt; v.validation.success).length;
    const failed = total - successful;
    
    const errorTypes = {};
    this.validationHistory.forEach(v =&gt; {
      if (!v.validation.success &amp;&amp; v.validation.errorType) {
        errorTypes[v.validation.errorType] = (errorTypes[v.validation.errorType] || 0) + 1;
      }
    });

    return {
      total,
      successful,
      failed,
      successRate: total &gt; 0 ? (successful / total * 100).toFixed(2) + '%' : '0%',
      errorTypes,
      timestamp: Date.now(),
    };
  }

  // 清空历史
  clearHistory() {
    this.validationHistory = [];
    feedbackCollector.clearFeedbackHistory();
    logger.clearLogs();
    logger.info('历史记录已清空');
  }

  // 延时
  sleep(ms) {
    return new Promise(resolve =&gt; setTimeout(resolve, ms));
  }
}

module.exports = new AIMonitor();

