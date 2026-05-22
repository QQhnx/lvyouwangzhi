
// 反馈收集器
const logger = require('./logger');
const config = require('../config/config');

class FeedbackCollector {
  constructor() {
    this.feedbackHistory = [];
  }

  // 采集操作前的屏幕状态
  async capturePreState(actionType, actionParams) {
    logger.debug('采集操作前状态', { actionType, actionParams });
    
    const preState = {
      timestamp: Date.now(),
      screenshot: await this.captureScreenshot(),
      screenText: await this.recognizeText(),
      screenNodes: await this.getNodes(),
    };

    return preState;
  }

  // 采集操作后的屏幕状态
  async capturePostState(actionId) {
    logger.debug('采集操作后状态', { actionId });
    
    // 等待操作生效
    await this.sleep(config.action.defaultWaitTime);

    const postState = {
      timestamp: Date.now(),
      screenshot: await this.captureScreenshot(),
      screenText: await this.recognizeText(),
      screenNodes: await this.getNodes(),
    };

    return postState;
  }

  // 截图
  async captureScreenshot() {
    try {
      if (typeof zdjl !== 'undefined') {
        // 在自动精灵环境中获取屏幕截图
        // 实际使用时实现截图保存
        return 'screenshot_data';
      }
      return null;
    } catch (e) {
      logger.error('截图失败', e);
      return null;
    }
  }

  // OCR文字识别
  async recognizeText() {
    try {
      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.ocrAsync) {
        // 使用自动精灵的OCR功能
        // const result = await zdjl.ocrAsync();
        // return result;
      }
      return [];
    } catch (e) {
      logger.error('文字识别失败', e);
      return [];
    }
  }

  // 获取界面节点
  async getNodes() {
    try {
      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.findNodeAsync) {
        // 使用自动精灵的节点查找功能
        // const result = await zdjl.findNodeAsync({});
        // return result;
      }
      return [];
    } catch (e) {
      logger.error('获取节点失败', e);
      return [];
    }
  }

  // 生成反馈报告
  generateFeedback(preState, postState, action) {
    const feedback = {
      actionId: action.id,
      actionType: action.type,
      actionParams: action.params,
      preState,
      postState,
      duration: postState.timestamp - preState.timestamp,
      stateChanged: this.compareStates(preState, postState),
      timestamp: Date.now(),
    };

    this.feedbackHistory.push(feedback);
    logger.info('反馈已收集', { actionId: action.id });

    return feedback;
  }

  // 比较屏幕状态变化
  compareStates(preState, postState) {
    if (!preState || !postState) return false;

    // 比较文字内容
    const textChanged = this.compareText(preState.screenText, postState.screenText);
    
    // 比较节点结构
    const nodesChanged = this.compareNodes(preState.screenNodes, postState.screenNodes);

    return textChanged || nodesChanged;
  }

  // 比较文字
  compareText(preText, postText) {
    if (!preText || !postText) return false;
    return JSON.stringify(preText) !== JSON.stringify(postText);
  }

  // 比较节点
  compareNodes(preNodes, postNodes) {
    if (!preNodes || !postNodes) return false;
    return JSON.stringify(preNodes) !== JSON.stringify(postNodes);
  }

  // 获取反馈历史
  getFeedbackHistory() {
    return this.feedbackHistory;
  }

  // 清空反馈历史
  clearFeedbackHistory() {
    this.feedbackHistory = [];
  }

  // 延时
  sleep(ms) {
    return new Promise(resolve =&gt; setTimeout(resolve, ms));
  }
}

module.exports = new FeedbackCollector();

