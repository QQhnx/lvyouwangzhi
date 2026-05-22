// 六道轮回 - 稳定版脚本 v2.0
// 优化文字查找和OCR调用

// 监察系统
const monitor = {
  async clickByText(text, retryCount = 2) {
    console.log(`[查找] ${text}`);
    
    for (let i = 0; i < retryCount; i++) {
      try {
        // 方法1: 使用findLocationAsync直接查找
        const loc = await zdjl.findLocationAsync({ 
          type: 'text',
          text: text 
        });
        
        if (loc && loc.x !== undefined && loc.y !== undefined) {
          await zdjl.clickAsync(loc.x, loc.y);
          console.log(`✓ 点击成功: ${text} (${loc.x}, ${loc.y})`);
          return { success: true, x: loc.x, y: loc.y };
        }
        
        // 方法2: 尝试模糊匹配
        const loc2 = await zdjl.findLocationAsync({ 
          textMatches: text 
        });
        
        if (loc2 && loc2.x !== undefined) {
          await zdjl.clickAsync(loc2.x, loc2.y);
          console.log(`✓ 点击成功(模糊): ${text}`);
          return { success: true, x: loc2.x, y: loc2.y };
        }
        
      } catch (e) {
        console.warn(`查找尝试 ${i+1} 失败:`, e.message);
      }
      
      await this.sleep(500);
    }
    
    console.log(`✗ 未找到: ${text}`);
    return { success: false };
  },
  
  async click(x, y) {
    try {
      await zdjl.clickAsync(x, y);
      console.log(`✓ 点击坐标: (${x}, ${y})`);
      return { success: true };
    } catch (e) {
      console.error(`✗ 坐标点击失败:`, e.message);
      return { success: false };
    }
  },
  
  async wait(seconds = 1000) {
    await this.sleep(seconds);
  },
  
  sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
};

// 主程序
async function main() {
  console.log('═══════════════════════════════════');
  console.log('  六道轮回 - 每日任务 (稳定版 v2.0)');
  console.log('═══════════════════════════════════');
  console.log(`时间: ${new Date().toLocaleTimeString()}`);
  
  try {
    // === 1. 进入游戏 ===
    console.log('\n【1】进入游戏');
    
    // 尝试点击进入游戏
    let entered = await monitor.clickByText('进入游戏');
    
    if (!entered.success) {
      // 使用备用坐标
      console.log('使用备用位置...');
      await monitor.click(498, 950);
    }
    
    // 等待加载
    await monitor.wait(3000);
    
    // === 2. 每日副本 ===
    console.log('\n【2】每日副本');
    await monitor.clickByText('副本');
    await monitor.wait(1500);
    
    await monitor.clickByText('开始挑战');
    await monitor.wait(2000);
    
    // 等待战斗完成
    console.log('等待战斗...');
    await monitor.wait(15000);
    
    await monitor.clickByText('领取');
    await monitor.clickByText('确定');
    
    // === 3. 太虚幻境 ===
    console.log('\n【3】太虚幻境');
    await monitor.clickByText('太虚幻境');
    await monitor.wait(1500);
    
    await monitor.clickByText('进入挑战');
    await monitor.wait(15000);
    
    await monitor.clickByText('领取');
    await monitor.clickByText('确定');
    
    // === 4. 每日活动 ===
    console.log('\n【4】每日活动');
    await monitor.clickByText('活动');
    await monitor.wait(1500);
    
    await monitor.clickByText('签到');
    await monitor.wait(500);
    await monitor.clickByText('领取');
    await monitor.clickByText('确定');
    
    await monitor.clickByText('关闭');
    
    // === 5. 珍宝阁 ===
    console.log('\n【5】枋市珍宝阁');
    await monitor.clickByText('枋市');
    await monitor.wait(1500);
    
    await monitor.clickByText('珍宝阁');
    await monitor.wait(1000);
    
    // 领取劫灰
    await monitor.clickByText('劫灰');
    await monitor.wait(500);
    await monitor.clickByText('免费');
    await monitor.clickByText('确定');
    
    // 领取历练符
    await monitor.clickByText('历练符');
    await monitor.wait(500);
    await monitor.clickByText('免费');
    await monitor.clickByText('确定');
    
    // 领取仙石
    await monitor.clickByText('仙石');
    await monitor.wait(500);
    await monitor.clickByText('免费');
    await monitor.clickByText('确定');
    
    console.log('\n═══════════════════════════════════');
    console.log('     ✓ 全部任务执行完成!');
    console.log('═══════════════════════════════════');
    
  } catch (error) {
    console.error('\n✗ 错误:', error.message);
  }
}

// 运行
main();
