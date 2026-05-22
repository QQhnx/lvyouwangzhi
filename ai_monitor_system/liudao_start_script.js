// 六道轮回 - 优化版脚本
// 针对当前开始界面优化

// 监察系统
const monitor = {
  async clickText(text) {
    console.log(`[查找并点击] ${text}`);
    try {
      const loc = await zdjl.findLocationAsync({ text });
      if (loc) {
        await zdjl.clickAsync(loc.x, loc.y);
        console.log(`✓ 找到并点击: ${text}`);
        return true;
      }
      console.log(`✗ 未找到: ${text}`);
      return false;
    } catch (e) {
      console.error(`✗ 点击失败: ${e.message}`);
      return false;
    }
  },
  
  async waitForText(text, timeout = 15000) {
    console.log(`[等待文字] ${text}`);
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        const result = await zdjl.ocrAsync();
        const texts = Array.isArray(result) ? result.map(t => t.text || t).filter(Boolean) : [];
        if (texts.some(t => t.includes(text))) {
          console.log(`✓ 检测到: ${text}`);
          return true;
        }
      } catch (e) {
        console.warn('OCR错误:', e.message);
      }
      await this.sleep(1000);
    }
    console.log(`✗ 超时未找到: ${text}`);
    return false;
  },
  
  sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
};

// 主程序
async function runGame() {
  console.log('═══════════════════════════════════');
  console.log('      六道轮回 - 每日任务自动化      ');
  console.log('═══════════════════════════════════');
  console.log(`开始时间: ${new Date().toLocaleString()}`);
  
  try {
    // === 步骤1: 进入游戏 ===
    console.log('\n【步骤1】进入游戏');
    console.log('当前界面: 开始界面');
    
    // 点击进入游戏按钮
    const entered = await monitor.clickText('进入游戏');
    
    if (!entered) {
      // 如果找不到文字，尝试点击屏幕底部中间位置
      console.log('尝试直接点击位置...');
      await zdjl.clickAsync(498, 950); // 大约是按钮位置
    }
    
    // 等待加载完成
    console.log('等待游戏加载...');
    await monitor.waitForText('副本', 20000);
    await monitor.sleep(2000);
    
    // === 步骤2: 每日副本 ===
    console.log('\n【步骤2】每日副本');
    await monitor.clickText('副本');
    await monitor.sleep(1500);
    await monitor.clickText('开始挑战');
    await monitor.waitForText('胜利', 60000);
    await monitor.sleep(1000);
    await monitor.clickText('领取');
    await monitor.clickText('确定');
    
    // === 步骤3: 太虚幻境 ===
    console.log('\n【步骤3】太虚幻境');
    await monitor.clickText('太虚幻境');
    await monitor.sleep(1500);
    await monitor.clickText('进入挑战');
    await monitor.waitForText('完成', 60000);
    await monitor.sleep(1000);
    await monitor.clickText('领取奖励');
    await monitor.clickText('确定');
    
    // === 步骤4: 每日活动 ===
    console.log('\n【步骤4】每日活动');
    await monitor.clickText('活动');
    await monitor.sleep(1500);
    await monitor.clickText('签到');
    await monitor.clickText('领取');
    await monitor.clickText('确定');
    
    // === 步骤5: 珍宝阁 ===
    console.log('\n【步骤5】枋市珍宝阁');
    await monitor.clickText('枋市');
    await monitor.sleep(1500);
    await monitor.clickText('珍宝阁');
    await monitor.sleep(1000);
    await monitor.clickText('劫灰');
    await monitor.clickText('免费领取');
    await monitor.clickText('确定');
    
    await monitor.clickText('历练符');
    await monitor.clickText('免费领取');
    await monitor.clickText('确定');
    
    await monitor.clickText('仙石');
    await monitor.clickText('免费礼包');
    await monitor.clickText('确定');
    
    console.log('\n═══════════════════════════════════');
    console.log('              全部完成!              ');
    console.log('═══════════════════════════════════');
    
  } catch (error) {
    console.error('\n✗ 执行出错:', error.message);
  }
}

// 运行脚本
runGame();
