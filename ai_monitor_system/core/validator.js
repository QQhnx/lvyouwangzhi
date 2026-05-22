
// 操作验证器
const logger = require('./logger');
const config = require('../config/config');

class OperationValidator {
  constructor() {
    this.validationRules = new Map();
  }

  // 注册验证规则
  registerRule(actionType, validator) {
    this.validationRules.set(actionType, validator);
    logger.debug('已注册验证规则', { actionType });
  }

  // 验证操作结果
  async validate(feedback, validationConfig) {
    logger.info('开始验证操作', { 
      actionId: feedback.actionId,
      actionType: feedback.actionType 
    });

    const validationResult = {
      actionId: feedback.actionId,
      success: false,
      checks: [],
      errorType: null,
      errorDetails: null,
      retrySuggested: false,
      timestamp: Date.now(),
    };

    try {
      // 基础检查
      const basicCheck = this.checkBasicConditions(feedback);
      validationResult.checks.push(basicCheck);

      // 状态变化检查
      const stateCheck = this.checkStateChange(feedback);
      validationResult.checks.push(stateCheck);

      // 自定义验证规则
      if (validationConfig &amp;&amp; validationConfig.customCheck) {
        const customCheck = await validationConfig.customCheck(feedback);
        validationResult.checks.push(customCheck);
      }

      // 检查是否有注册的验证规则
      const ruleValidator = this.validationRules.get(feedback.actionType);
      if (ruleValidator) {
        const ruleCheck = await ruleValidator(feedback, validationConfig);
        validationResult.checks.push(ruleCheck);
      }

      // 综合判断
      validationResult.success = validationResult.checks.every(check =&gt; check.passed);

      if (!validationResult.success) {
        const failedChecks = validationResult.checks.filter(check =&gt; !check.passed);
        validationResult.errorType = this.classifyError(failedChecks);
        validationResult.errorDetails = failedChecks.map(check =&gt; check.message);
        validationResult.retrySuggested = this.shouldRetry(validationResult.errorType);
      }

      logger.info('验证完成', {
        actionId: feedback.actionId,
        success: validationResult.success,
        errorType: validationResult.errorType,
      });

    } catch (e) {
      logger.error('验证过程出错', e);
      validationResult.errorType = 'VALIDATION_ERROR';
      validationResult.errorDetails = e.message;
      validationResult.retrySuggested = true;
    }

    return validationResult;
  }

  // 基础条件检查
  checkBasicConditions(feedback) {
    const checks = {
      name: '基础条件检查',
      passed: true,
      message: '基础条件正常',
      details: {},
    };

    // 检查是否有前置状态
    if (!feedback.preState) {
      checks.passed = false;
      checks.message = '缺少前置状态';
      checks.details.missingPreState = true;
    }

    // 检查是否有后置状态
    if (!feedback.postState) {
      checks.passed = false;
      checks.message = '缺少后置状态';
      checks.details.missingPostState = true;
    }

    return checks;
  }

  // 状态变化检查
  checkStateChange(feedback) {
    const checks = {
      name: '状态变化检查',
      passed: true,
      message: '状态变化正常',
      details: {},
    };

    if (!feedback.stateChanged) {
      checks.passed = false;
      checks.message = '屏幕状态未发生变化';
      checks.details.noStateChange = true;
    }

    checks.details.stateChanged = feedback.stateChanged;
    checks.details.duration = feedback.duration;

    return checks;
  }

  // 错误分类
  classifyError(failedChecks) {
    if (failedChecks.some(check =&gt; check.details?.missingPreState || check.details?.missingPostState)) {
      return 'STATE_CAPTURE_ERROR';
    }
    
    if (failedChecks.some(check =&gt; check.details?.noStateChange)) {
      return 'NO_STATE_CHANGE';
    }

    if (failedChecks.some(check =&gt; check.details?.textNotFound)) {
      return 'TEXT_NOT_FOUND';
    }

    if (failedChecks.some(check =&gt; check.details?.buttonNotFound)) {
      return 'BUTTON_NOT_FOUND';
    }

    if (failedChecks.some(check =&gt; check.details?.imageNotMatch)) {
      return 'IMAGE_NOT_MATCH';
    }

    return 'UNKNOWN_ERROR';
  }

  // 判断是否应该重试
  shouldRetry(errorType) {
    const retryableErrors = [
      'NO_STATE_CHANGE',
      'TEXT_NOT_FOUND',
      'BUTTON_NOT_FOUND',
      'IMAGE_NOT_MATCH',
      'UNKNOWN_ERROR',
    ];
    
    return retryableErrors.includes(errorType);
  }

  // 文字存在性验证
  checkTextExists(feedback, expectedText) {
    const check = {
      name: '文字验证',
      passed: false,
      message: '',
      details: { expectedText },
    };

    const postText = feedback.postState?.screenText || [];
    const textFound = postText.some(text =&gt; 
      text.toLowerCase().includes(expectedText.toLowerCase())
    );

    check.passed = textFound;
    check.message = textFound 
      ? `找到预期文字: ${expectedText}` 
      : `未找到预期文字: ${expectedText}`;
    check.details.textFound = textFound;
    check.details.foundText = postText;

    return check;
  }

  // 按钮存在性验证
  checkButtonExists(feedback, buttonSelector) {
    const check = {
      name: '按钮验证',
      passed: false,
      message: '',
      details: { buttonSelector },
    };

    const postNodes = feedback.postState?.screenNodes || [];
    const buttonFound = postNodes.some(node =&gt; 
      this.matchesSelector(node, buttonSelector)
    );

    check.passed = buttonFound;
    check.message = buttonFound 
      ? `找到预期按钮` 
      : `未找到预期按钮`;
    check.details.buttonFound = buttonFound;

    return check;
  }

  // 图像匹配验证
  checkImageMatch(feedback, expectedImage) {
    const check = {
      name: '图像验证',
      passed: false,
      message: '',
      details: {},
    };

    // 图像匹配逻辑（占位）
    check.passed = false;
    check.message = '图像匹配功能待实现';
    check.details.imageNotMatch = true;

    return check;
  }

  // 匹配选择器
  matchesSelector(node, selector) {
    // 简单的节点匹配逻辑
    if (selector.text &amp;&amp; node.text) {
      return node.text.includes(selector.text);
    }
    if (selector.id &amp;&amp; node.id) {
      return node.id === selector.id;
    }
    return false;
  }

  // 生成验证报告
  generateReport(validationResults) {
    const report = {
      total: validationResults.length,
      success: validationResults.filter(r =&gt; r.success).length,
      failed: validationResults.filter(r =&gt; !r.success).length,
      retryable: validationResults.filter(r =&gt; r.retrySuggested).length,
      errors: {},
      timestamp: Date.now(),
    };

    // 统计错误类型
    validationResults.forEach(result =&gt; {
      if (!result.success &amp;&amp; result.errorType) {
        report.errors[result.errorType] = (report.errors[result.errorType] || 0) + 1;
      }
    });

    return report;
  }
}

module.exports = new OperationValidator();

