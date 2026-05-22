
// AI实时操作反馈与自我监察系统 - 快速入门
// 这个文件展示了最基本的使用方式

const { monitor, logger, textRecognizer } = require('./index');

// 快速入门示例
async function quickStart() {
  console.log('=== AI实时操作反馈与自我监察系统 - 快速入门 ===\n');
  
  // 1. 基本使用：点击屏幕并自动检查结果
  logger.info('步骤1: 执行带监察的点击操作');
  
  const clickResult = await monitor.click(500, 1000);
  console.log('点击结果:', clickResult.success ? '成功' : '失败');
  console.log('尝试次数:', clickResult.attempts);
  console.log('');
  
  // 2. 查找并点击文字
  logger.info('步骤2: 查找并点击文字');
  
  try {
    const textClickResult = await monitor.clickByText('开始游戏');
    console.log('文字点击结果:', textClickResult.success ? '成功' : '失败');
  } catch (error) {
    console.log('未找到目标文字');
  }
  console.log('');
  
  // 3. 查看统计
  logger.info('步骤3: 查看操作统计');
  
  const stats = monitor.getStatistics();
  console.log('总操作数:', stats.total);
  console.log('成功数:', stats.successful);
  console.log('成功率:', stats.successRate);
  console.log('');
  
  // 4. 执行滑动操作
  logger.info('步骤4: 执行滑动操作');
  
  const swipeResult = await monitor.swipe(500, 1500, 500, 500);
  console.log('滑动结果:', swipeResult.success ? '成功' : '失败');
  console.log('');
  
  console.log('快速入门示例完成！');
  console.log('查看 example.js 了解更多用法。');
}

// 运行快速入门
// quickStart();

module.exports = { quickStart };

