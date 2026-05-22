// 六道轮回 - 游戏自动化脚本
// 包含：每日副本、太虚幻境、每日活动、地图推进、珍宝阁

// ============ 监察系统 ============
const monitor = {
  actionLog: [],
  
  async exec(actionFn, actionName, checkFn) {
    const startTime = Date.now();
    console.log(`▶ [${actionName}] 开始执行...`);
    
    // 采集前状态
    const preState = await this.captureState();
    
    try {
      // 执行操作
      const result = await actionFn();
      const execTime = Date.now() - startTime;
      
      // 等待操作生效
      await this.sleep(800);
      
      // 采集后状态
      const postState = await this.captureState();
      
      // 验证结果
      let success = false;
      let message = '';
      
      if (checkFn) {
        ({ success, message } = await checkFn(preState, postState));
      } else {
        // 默认验证：检查屏幕状态变化
        success = JSON.stringify(preState.text) !== JSON.stringify(postState.text);
        message = success ? '状态已变化' : '状态无变化';
      }
      
      // 记录日志
      this.actionLog.push({
        name: actionName,
        success,
        message,
        execTime,
        timestamp: new Date().toLocaleTimeString()
      });
      
      console.log(success ? 
        `✓ [${actionName}] 成功 (${execTime}ms)` : 
        `✗ [${actionName}] 失败 - ${message}`
      );
      
      return { success, result, message, execTime };
      
    } catch (error) {
      console.error(`✗ [${actionName}] 异常 - ${error.message}`);
      this.actionLog.push({
        name: actionName,
        success: false,
        message: error.message,
        execTime: Date.now() - startTime,
        timestamp: new Date().toLocaleTimeString()
      });
      return { success: false, error: error.message };
    }
  },
  
  async captureState() {
    return {
      text: await this.getScreenText(),
      nodes: await this.getScreenNodes()
    };
  },
  
  async getScreenText() {
    try {
      if (typeof zdjl !== 'undefined' && zdjl.ocrAsync) {
        const result = await zdjl.ocrAsync();
        return Array.isArray(result) ? result.map(t => t.text || t).filter(Boolean) : [];
      }
    } catch (e) {
      console.warn('OCR获取失败:', e.message);
    }
    return [];
  },
  
  async getScreenNodes() {
    try {
      if (typeof zdjl !== 'undefined' && zdjl.findNodeAsync) {
        return await zdjl.findNodeAsync({}) || [];
      }
    } catch (e) {
      console.warn('节点获取失败:', e.message);
    }
    return [];
  },
  
  async sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  },
  
  async findAndClick(text, region = null) {
    try {
      const options = { text };
      if (region) {
        options.region = region;
      }
      
      const loc = await zdjl.findLocationAsync(options);
      if (loc) {
        await zdjl.clickAsync(loc.x, loc.y);
        return { found: true, x: loc.x, y: loc.y };
      }
      return { found: false };
    } catch (e) {
      return { found: false, error: e.message };
    }
  },
  
  async waitForText(text, timeout = 15000, interval = 1000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const screenText = await this.getScreenText();
      if (screenText.some(t => t.includes(text))) {
        return true;
      }
      await this.sleep(interval);
    }
    return false;
  },
  
  getStats() {
    const success = this.actionLog.filter(a => a.success).length;
    const total = this.actionLog.length;
    return {
      total,
      success,
      failed: total - success,
      successRate: total > 0 ? (success / total * 100).toFixed(1) + '%' : '0%',
      log: this.actionLog.slice(-10)
    };
  }
};

// ============ 游戏模块 ============

// 1. 进入游戏
async function enterGame() {
  console.log('\n=== 进入游戏 ===');
  
  // 点击进入游戏按钮
  const result = await monitor.exec(
    async () => await monitor.findAndClick('进入游戏'),
    '点击进入游戏',
    async (pre, post) => {
      // 验证是否进入游戏主界面
      const hasMainUI = post.text.some(t => t.includes('副本') || t.includes('活动') || t.includes('背包'));
      return { success: hasMainUI, message: hasMainUI ? '已进入游戏' : '未进入游戏' };
    }
  );
  
  if (!result.success) {
    console.log('等待游戏加载...');
    await monitor.waitForText('副本', 20000);
  }
  
  await monitor.sleep(2000);
  return result.success;
}

// 2. 每日副本
async function dailyDungeon() {
  console.log('\n=== 每日副本 ===');
  
  try {
    // 找到并点击副本按钮
    const findResult = await monitor.exec(
      async () => await monitor.findAndClick('副本'),
      '打开副本界面'
    );
    
    if (!findResult.success) {
      console.log('未找到副本按钮，尝试其他入口...');
      await monitor.findAndClick('挑战');
      await monitor.sleep(1000);
    }
    
    // 查找可挑战的副本
    await monitor.sleep(1500);
    
    // 找到"开始挑战"或"进入"按钮
    const challenge = await monitor.findAndClick('开始挑战');
    if (!challenge.found) {
      await monitor.findAndClick('进入');
    }
    
    // 等待战斗完成
    console.log('进入战斗，等待完成...');
    await monitor.waitForText('胜利', 60000);
    await monitor.sleep(2000);
    
    // 点击领取奖励
    await monitor.findAndClick('领取');
    await monitor.findAndClick('确定');
    await monitor.findAndClick('关闭');
    
    console.log('✓ 每日副本完成');
    return true;
    
  } catch (e) {
    console.error('每日副本失败:', e.message);
    return false;
  }
}

// 3. 太虚幻境
async function taiXuHuanJing() {
  console.log('\n=== 太虚幻境 ===');
  
  try {
    // 找到太虚幻境入口
    const result = await monitor.exec(
      async () => await monitor.findAndClick('太虚幻境'),
      '打开太虚幻境'
    );
    
    if (!result.success) {
      // 尝试从活动入口进入
      await monitor.findAndClick('活动');
      await monitor.sleep(1000);
      await monitor.findAndClick('太虚幻境');
    }
    
    await monitor.sleep(1500);
    
    // 开始挑战
    await monitor.findAndClick('进入挑战');
    if (!result.found) {
      await monitor.findAndClick('开始');
    }
    
    // 等待完成
    console.log('挑战中...');
    await monitor.waitForText('完成', 60000);
    await monitor.sleep(2000);
    
    // 领取奖励
    await monitor.findAndClick('领取奖励');
    await monitor.findAndClick('确定');
    
    console.log('✓ 太虚幻境完成');
    return true;
    
  } catch (e) {
    console.error('太虚幻境失败:', e.message);
    return false;
  }
}

// 4. 每日活动
async function dailyActivity() {
  console.log('\n=== 每日活动 ===');
  
  try {
    // 打开活动界面
    const result = await monitor.exec(
      async () => await monitor.findAndClick('活动'),
      '打开活动界面'
    );
    
    if (!result.success) {
      return false;
    }
    
    await monitor.sleep(1500);
    
    // 查找可领取的活动奖励
    const activities = ['签到', '在线奖励', '每日任务', '累计登录'];
    
    for (const activity of activities) {
      await monitor.findAndClick(activity);
      await monitor.sleep(500);
      await monitor.findAndClick('领取');
      await monitor.findAndClick('确定');
    }
    
    // 关闭活动界面
    await monitor.findAndClick('关闭');
    
    console.log('✓ 每日活动完成');
    return true;
    
  } catch (e) {
    console.error('每日活动失败:', e.message);
    return false;
  }
}

// 5. 地图推进
async function mapProgress() {
  console.log('\n=== 地图推进 ===');
  
  try {
    // 打开地图
    const result = await monitor.exec(
      async () => await monitor.findAndClick('地图'),
      '打开地图'
    );
    
    if (!result.success) {
      return false;
    }
    
    await monitor.sleep(1500);
    
    // 查找可挑战的关卡
    await monitor.findAndClick('挑战');
    await monitor.findAndClick('开始');
    
    // 等待战斗
    console.log('战斗中...');
    await monitor.waitForText('胜利', 60000);
    await monitor.sleep(1000);
    
    // 继续或领取
    await monitor.findAndClick('继续');
    await monitor.findAndClick('领取');
    
    console.log('✓ 地图推进完成');
    return true;
    
  } catch (e) {
    console.error('地图推进失败:', e.message);
    return false;
  }
}

// 6. 枋市 - 珍宝阁
async function treasureShop() {
  console.log('\n=== 枋市 - 珍宝阁 ===');
  
  try {
    // 打开枋市
    const result = await monitor.exec(
      async () => await monitor.findAndClick('枋市'),
      '打开枋市'
    );
    
    if (!result.success) {
      // 尝试其他入口
      await monitor.findAndClick('商城');
    }
    
    await monitor.sleep(1500);
    
    // 进入珍宝阁
    await monitor.findAndClick('珍宝阁');
    await monitor.sleep(1000);
    
    // 领取劫灰（每日免费）
    await monitor.findAndClick('劫灰');
    await monitor.findAndClick('免费领取');
    await monitor.findAndClick('确定');
    
    // 领取蓝色历练符
    await monitor.findAndClick('历练符');
    await monitor.findAndClick('免费领取');
    await monitor.findAndClick('确定');
    
    // 领取仙石礼包
    await monitor.findAndClick('仙石');
    await monitor.findAndClick('免费礼包');
    await monitor.findAndClick('确定');
    
    // 关闭
    await monitor.findAndClick('关闭');
    
    console.log('✓ 珍宝阁领取完成');
    return true;
    
  } catch (e) {
    console.error('珍宝阁失败:', e.message);
    return false;
  }
}

// ============ 主程序 ============

async function runDailyTasks() {
  console.log('═══════════════════════════════════');
  console.log('      六道轮回 - 每日任务自动执行     ');
  console.log('═══════════════════════════════════');
  console.log(`开始时间: ${new Date().toLocaleString()}`);
  console.log('-----------------------------------');
  
  try {
    // 1. 进入游戏
    console.log('\n【步骤1】进入游戏');
    const entered = await enterGame();
    if (!entered) {
      console.log('无法进入游戏，退出');
      return;
    }
    
    // 2. 每日副本
    await dailyDungeon();
    
    // 3. 太虚幻境
    await taiXuHuanJing();
    
    // 4. 每日活动
    await dailyActivity();
    
    // 5. 地图推进
    await mapProgress();
    
    // 6. 珍宝阁
    await treasureShop();
    
    // 输出统计
    console.log('\n═══════════════════════════════════');
    console.log('              执行完成               ');
    console.log('═══════════════════════════════════');
    
    const stats = monitor.getStats();
    console.log(`总操作数: ${stats.total}`);
    console.log(`成功: ${stats.success} | 失败: ${stats.failed}`);
    console.log(`成功率: ${stats.successRate}`);
    console.log(`结束时间: ${new Date().toLocaleString()}`);
    
  } catch (error) {
    console.error('\n✗ 主程序出错:', error.message);
    
    const stats = monitor.getStats();
    console.log('\n错误时统计:');
    console.log(`总操作数: ${stats.total}`);
    console.log(`成功: ${stats.success} | 失败: ${stats.failed}`);
  }
}

// ============ 运行脚本 ============
console.log('脚本已加载，准备执行...');
console.log('请确保游戏界面在前台显示');
console.log('----------------------------');

// 等待3秒后开始
setTimeout(async () => {
  await runDailyTasks();
}, 3000);

// 导出供手动调用
module.exports = {
  monitor,
  runDailyTasks,
  enterGame,
  dailyDungeon,
  taiXuHuanJing,
  dailyActivity,
  mapProgress,
  treasureShop
};
