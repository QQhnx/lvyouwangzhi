
// 点击操作
const logger = require('../core/logger');
const config = require('../config/config');

class ClickAction {
  constructor() {
    this.lastClick = null;
  }

  // 执行点击
  async execute(x, y, options = {}) {
    const { duration = config.action.clickDuration, pressure = 1 } = options;
    
    logger.info('执行点击', { x, y, duration });

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.clickAsync) {
      const result = await zdjl.clickAsync(x, y, duration, pressure);
      this.lastClick = { x, y, timestamp: Date.now() };
      return result;
    }

    this.lastClick = { x, y, timestamp: Date.now() };
    return { success: true, x, y };
  }

  // 长按
  async longPress(x, y, duration = 1000) {
    logger.info('执行长按', { x, y, duration });

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.longClickAsync) {
      return await zdjl.longClickAsync(x, y, duration);
    }

    return { success: true, x, y, duration };
  }

  // 双击
  async doubleClick(x, y, interval = 100) {
    logger.info('执行双击', { x, y, interval });

    await this.execute(x, y);
    await this.sleep(interval);
    await this.execute(x, y);

    return { success: true, x, y, type: 'doubleClick' };
  }

  // 多点点击
  async multiClick(points, interval = 100) {
    logger.info('执行多点点击', { count: points.length, interval });

    const results = [];
    for (const point of points) {
      const result = await this.execute(point.x, point.y);
      results.push(result);
      await this.sleep(interval);
    }

    return results;
  }

  // 随机点击区域
  async clickInRegion(x1, y1, x2, y2) {
    const x = x1 + Math.random() * (x2 - x1);
    const y = y1 + Math.random() * (y2 - y1);
    
    logger.info('随机点击区域', { x1, y1, x2, y2, actualX: x, actualY: y });
    
    return await this.execute(x, y);
  }

  // 获取最后一次点击
  getLastClick() {
    return this.lastClick;
  }

  // 延时
  sleep(ms) {
    return new Promise(resolve =&gt; setTimeout(resolve, ms));
  }
}

module.exports = new ClickAction();

