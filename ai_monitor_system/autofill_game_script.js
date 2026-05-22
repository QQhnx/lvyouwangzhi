// 自动精灵游戏自动化脚本示例
// 使用AI实时反馈与自我监察系统

// 由于自动精灵的JS环境特殊，我们需要重新实现核心功能
// 以下是针对自动精灵环境优化的版本

class AutoGameMonitor {
  constructor() {
    this.actionCount = 0;
    this.successCount = 0;
    this.failedCount = 0;
    this.history = [];
  }

  // 执行操作并实时反馈
  async executeAction(actionFn, actionName, validationFn) {
    this.actionCount++;
    console.log(`[操作开始] ${actionName}`);
    
    // 1. 采集操作前状态
    const preState = await this.captureState();
    
    try {
      // 2. 执行操作
      const result = await actionFn();
      
      // 3. 等待操作生效
      await this.sleep(500);
      
      // 4. 采集操作后状态
      const postState = await this.captureState();
      
      // 5. 验证操作结果
      const validation = validationFn ? await validationFn(preState, postState) : this.defaultValidation(preState, postState);
      
      if (validation.success) {
        this.successCount++;
        console.log(`[操作成功] ${actionName} - 验证通过`);
        return { success: true, result, validation };
      } else {
        this.failedCount++;
        console.log(`[操作失败] ${actionName} - ${validation.message}`);
        return { success: false, result, validation };
      }
    } catch (error) {
      this.failedCount++;
      console.error(`[操作异常] ${actionName} - ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // 采集屏幕状态
  async captureState() {
    try {
      // 使用自动精灵的API获取屏幕信息
      const text = await this.getScreenText();
      const nodes = await this.getScreenNodes();
      
      return {
        timestamp: Date.now(),
        text: text,
        nodes: nodes
      };
    } catch (e) {
      console.error('状态采集失败:', e);
      return null;
    }
  }

  // 获取屏幕文字（OCR）
  async getScreenText() {
    if (typeof zdjl !== 'undefined' && zdjl.ocrAsync) {
      try {
        const result = await zdjl.ocrAsync();
        return result || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  // 获取屏幕节点
  async getScreenNodes() {
    if (typeof zdjl !== 'undefined' && zdjl.findNodeAsync) {
      try {
        const result = await zdjl.findNodeAsync({});
        return result || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  // 默认验证：检查屏幕状态是否变化
  defaultValidation(preState, postState) {
    if (!preState || !postState) {
      return { success: false, message: '状态采集失败' };
    }
    
    // 比较文字变化
    const textChanged = JSON.stringify(preState.text) !== JSON.stringify(postState.text);
    
    if (textChanged) {
      return { success: true, message: '屏幕状态已更新' };
    }
    
    return { success: false, message: '屏幕状态无变化' };
  }

  // 等待
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 获取统计
  getStats() {
    return {
      total: this.actionCount,
      success: this.successCount,
      failed: this.failedCount,
      successRate: this.actionCount > 0 ? (this.successCount / this.actionCount * 100).toFixed(2) + '%' : '0%'
    };
  }
}

// 创建全局监察器实例
const monitor = new AutoGameMonitor();

// ============ 游戏自动化脚本示例 ============

async function runGameScript() {
  console.log('========== 游戏自动化开始 ==========');
  
  try {
    // 示例1: 点击开始游戏按钮
    await monitor.executeAction(
      async () => {
        const location = await zdjl.findLocationAsync({ text: '开始游戏' });
        if (location) {
          await zdjl.clickAsync(location.x, location.y);
          return { clicked: true, location };
        }
        throw new Error('未找到开始游戏按钮');
      },
      '点击开始游戏',
      async (pre, post) => {
        // 验证：等待游戏界面出现
        await monitor.sleep(1000);
        const text = await monitor.getScreenText();
        const hasStart = text.some(t => t.includes('选择关卡') || t.includes('游戏'));
        return { success: hasStart, message: hasStart ? '游戏已启动' : '游戏未启动' };
      }
    );
    
    // 示例2: 执行游戏操作
    for (let i = 0; i < 3; i++) {
      await monitor.executeAction(
        async () => {
          // 随机点击屏幕位置
          const x = 200 + Math.random() * 600;
          const y = 400 + Math.random() * 800;
          await zdjl.clickAsync(x, y);
          return { x, y };
        },
        `游戏操作 ${i + 1}`,
        null // 使用默认验证
      );
      
      await monitor.sleep(300);
    }
    
    // 示例3: 滑动操作
    await monitor.executeAction(
      async () => {
        await zdjl.swipeAsync(500, 1500, 500, 500, 300);
        return { action: 'swipeUp' };
      },
      '向上滑动',
      null
    );
    
    // 示例4: 等待特定文字出现
    const hasTaskComplete = await waitForText('任务完成', 10000);
    if (hasTaskComplete) {
      console.log('[检测到] 任务完成!');
      
      // 点击领取奖励
      await monitor.executeAction(
        async () => {
          const location = await zdjl.findLocationAsync({ text: '领取奖励' });
          if (location) {
            await zdjl.clickAsync(location.x, location.y);
          }
        },
        '领取奖励',
        null
      );
    }
    
    // 输出统计
    console.log('========== 执行统计 ==========');
    const stats = monitor.getStats();
    console.log(`总操作: ${stats.total}`);
    console.log(`成功: ${stats.success}`);
    console.log(`失败: ${stats.failed}`);
    console.log(`成功率: ${stats.successRate}`);
    
  } catch (error) {
    console.error('脚本执行出错:', error);
  }
}

// 等待文字出现
async function waitForText(text, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const screenText = await monitor.getScreenText();
    if (screenText.some(t => t.includes(text))) {
      return true;
    }
    await monitor.sleep(500);
  }
  return false;
}

// ============ 使用说明 ============

/*
使用方法：

1. 在自动精灵中创建新的"运行JS代码"动作
2. 将此脚本复制到编辑器中
3. 修改游戏操作逻辑为你的实际需求
4. 运行脚本

核心API：
- monitor.executeAction(actionFn, name, validationFn) - 执行带监察的操作
- monitor.sleep(ms) - 等待
- waitForText(text, timeout) - 等待文字出现

配置说明：
- 修改 actionFn 为你的实际操作
- 修改 validationFn 为你的验证逻辑
- 不提供 validationFn 时使用默认验证（检查屏幕变化）
*/
