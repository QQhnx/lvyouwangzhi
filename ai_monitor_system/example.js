
// AI实时操作反馈与自我监察系统 - 使用示例
// 这个示例展示了如何在即时游戏中使用监察系统

const {
  monitor,
  validator,
  logger,
  textRecognizer,
  buttonRecognizer,
  imageRecognizer,
} = require('./index');

// 示例1: 基本的点击操作，带有自我监察
async function example1_basicClick() {
  logger.info('=== 示例1: 基本点击操作 ===');
  
  // 使用监察系统执行点击，同时会自动检查操作结果
  const result = await monitor.click(500, 1000);
  
  console.log('点击结果:', result);
  console.log('操作成功:', result.success);
  console.log('尝试次数:', result.attempts);
  
  if (!result.success) {
    console.log('失败原因:', result.error);
    console.log('验证详情:', result.validation);
  }
}

// 示例2: 带自定义验证的点击操作
async function example2_clickWithValidation() {
  logger.info('=== 示例2: 带自定义验证的点击 ===');
  
  // 定义验证配置，期望点击后出现"确认"文字
  const validationConfig = {
    customCheck: async (feedback) =&gt; {
      // 这里可以实现自定义验证逻辑
      // 例如检查操作后的屏幕状态
      
      // 模拟检查：假设点击后屏幕状态发生了变化
      return {
        name: '自定义检查',
        passed: feedback.stateChanged,
        message: feedback.stateChanged ? '状态已更新' : '状态未变化',
        details: feedback,
      };
    },
  };
  
  const result = await monitor.click(500, 1000, validationConfig);
  
  console.log('验证结果:', result.success);
}

// 示例3: 按文字查找并点击按钮，带有重试机制
async function example3_clickByText() {
  logger.info('=== 示例3: 按文字查找并点击 ===');
  
  try {
    // 查找并点击包含"开始游戏"文字的按钮
    const result = await monitor.clickByText('开始游戏');
    
    console.log('操作结果:', result);
  } catch (error) {
    console.error('操作失败:', error.message);
    
    // 查看详细的验证历史
    const history = monitor.getValidationHistory();
    console.log('验证历史:', history);
  }
}

// 示例4: 使用验证器注册自定义规则
async function example4_customValidationRule() {
  logger.info('=== 示例4: 自定义验证规则 ===');
  
  // 注册一个针对"购买"操作的验证规则
  validator.registerRule('purchase', async (feedback, config) =&gt; {
    // 检查购买后金币是否减少
    // 这里只是示例逻辑
    const hasChanged = feedback.stateChanged;
    
    return {
      name: '购买验证',
      passed: hasChanged,
      message: hasChanged ? '购买成功' : '购买可能失败',
      details: { feedback, config },
    };
  });
  
  // 使用这个验证规则
  const result = await monitor.executeWithMonitor(
    async () =&gt; {
      // 执行购买操作...
      return { action: 'purchase' };
    },
    'purchase',
    { item: 'sword' }
  );
  
  console.log('购买操作结果:', result);
}

// 示例5: 使用文本识别器
async function example5_textRecognition() {
  logger.info('=== 示例5: 文本识别 ===');
  
  // 检查屏幕上是否有特定文字
  const exists = await textRecognizer.textExists('任务完成');
  
  if (exists) {
    console.log('检测到任务完成！');
    
    // 获取文字位置
    const location = await textRecognizer.getTextLocation('任务完成');
    console.log('文字位置:', location);
    
    // 点击文字位置
    if (location) {
      await monitor.click(location.x, location.y);
    }
  } else {
    console.log('未检测到任务完成文字');
  }
}

// 示例6: 使用按钮识别器
async function example6_buttonRecognition() {
  logger.info('=== 示例6: 按钮识别 ===');
  
  // 等待按钮出现
  const buttonAppeared = await buttonRecognizer.waitForButton({ text: '确认' }, 5000);
  
  if (buttonAppeared) {
    console.log('确认按钮已出现');
    
    // 等待按钮可点击
    const clickable = await buttonRecognizer.waitForButtonClickable({ text: '确认' }, 3000);
    
    if (clickable) {
      // 点击按钮，带自我监察
      const result = await monitor.executeWithMonitor(
        async () =&gt; await buttonRecognizer.clickButton({ text: '确认' }),
        'clickButton',
        { button: '确认' }
      );
      
      console.log('按钮点击结果:', result);
    }
  }
}

// 示例7: 完整的游戏自动化流程示例
async function example7_completeGameFlow() {
  logger.info('=== 示例7: 完整游戏流程 ===');
  
  try {
    // 1. 点击开始游戏按钮，带验证
    logger.info('步骤1: 点击开始游戏');
    const startResult = await monitor.clickByText('开始游戏', {
      customCheck: async (feedback) =&gt; {
        // 验证游戏是否开始
        return {
          name: '游戏开始验证',
          passed: feedback.stateChanged,
          message: '游戏已开始',
        };
      },
    });
    
    if (!startResult.success) {
      throw new Error('无法开始游戏');
    }
    
    // 2. 等待加载完成
    logger.info('步骤2: 等待游戏加载');
    await monitor.sleep(2000);
    
    // 3. 执行一些游戏操作
    logger.info('步骤3: 执行游戏操作');
    
    // 示例：点击几个位置
    await monitor.click(300, 800);
    await monitor.click(600, 1200);
    
    // 滑动操作
    await monitor.swipe(500, 1500, 500, 500);
    
    // 4. 完成任务后验证
    logger.info('步骤4: 验证任务完成');
    const taskComplete = await textRecognizer.waitForText('任务完成', 10000);
    
    if (taskComplete) {
      logger.info('任务完成！');
      
      // 点击领取奖励
      await monitor.clickByText('领取奖励');
    }
    
    // 5. 获取统计数据
    const stats = monitor.getStatistics();
    logger.info('操作统计:', stats);
    
  } catch (error) {
    logger.error('游戏流程出错:', error);
    
    // 获取完整的验证历史用于调试
    const history = monitor.getValidationHistory();
    logger.info('验证历史:', history);
  }
}

// 示例8: 错误处理和自动重试演示
async function example8_errorHandling() {
  logger.info('=== 示例8: 错误处理和重试 ===');
  
  // 模拟一个可能失败的操作
  // 监察系统会自动重试最多3次（可在config中配置）
  
  let attemptCount = 0;
  
  const result = await monitor.executeWithMonitor(
    async () =&gt; {
      attemptCount++;
      logger.info(`执行尝试 ${attemptCount}`);
      
      // 模拟前两次失败，第三次成功
      if (attemptCount &lt; 3) {
        throw new Error('临时失败');
      }
      
      return { success: true };
    },
    'testRetry',
    {},
    {
      customCheck: async (feedback) =&gt; {
        return {
          name: '成功检查',
          passed: attemptCount &gt;= 3,
          message: attemptCount &gt;= 3 ? '成功' : '需要重试',
        };
      },
    }
  );
  
  console.log('最终结果:', result);
  console.log('总尝试次数:', attemptCount);
}

// 主函数 - 运行示例
async function main() {
  console.log('AI实时操作反馈与自我监察系统 - 使用示例\n');
  
  try {
    // 取消注释你想运行的示例
    
    // await example1_basicClick();
    // await example2_clickWithValidation();
    // await example3_clickByText();
    // await example4_customValidationRule();
    // await example5_textRecognition();
    // await example6_buttonRecognition();
    await example7_completeGameFlow();
    // await example8_errorHandling();
    
    // 获取并显示统计信息
    console.log('\n=== 统计信息 ===');
    const stats = monitor.getStatistics();
    console.log('总操作数:', stats.total);
    console.log('成功数:', stats.successful);
    console.log('失败数:', stats.failed);
    console.log('成功率:', stats.successRate);
    console.log('错误类型:', stats.errorTypes);
    
  } catch (error) {
    console.error('示例运行出错:', error);
  }
}

// 运行示例（在实际使用时调用）
// main();

module.exports = {
  example1_basicClick,
  example2_clickWithValidation,
  example3_clickByText,
  example4_customValidationRule,
  example5_textRecognition,
  example6_buttonRecognition,
  example7_completeGameFlow,
  example8_errorHandling,
  main,
};

