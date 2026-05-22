
// 滑动操作
const logger = require('../core/logger');
const config = require('../config/config');

class SwipeAction {
  constructor() {
    this.lastSwipe = null;
  }

  // 执行滑动
  async execute(x1, y1, x2, y2, options = {}) {
    const { duration = config.action.swipeDuration, delay = 0 } = options;
    
    logger.info('执行滑动', { x1, y1, x2, y2, duration });

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.swipeAsync) {
      const result = await zdjl.swipeAsync(x1, y1, x2, y2, duration, delay);
      this.lastSwipe = { x1, y1, x2, y2, timestamp: Date.now() };
      return result;
    }

    this.lastSwipe = { x1, y1, x2, y2, timestamp: Date.now() };
    return { success: true, x1, y1, x2, y2 };
  }

  // 向上滑动
  async swipeUp(startX = null, startY = null, distance = 500) {
    // 如果没有指定起始位置，从屏幕底部向上滑动
    const x = startX !== null ? startX : this.getScreenCenterX();
    const y = startY !== null ? startY : this.getScreenHeight() - 100;
    const endY = Math.max(100, y - distance);

    logger.info('向上滑动', { x, y, endY });
    
    return await this.execute(x, y, x, endY);
  }

  // 向下滑动
  async swipeDown(startX = null, startY = null, distance = 500) {
    const x = startX !== null ? startX : this.getScreenCenterX();
    const y = startY !== null ? startY : 100;
    const endY = Math.min(this.getScreenHeight() - 100, y + distance);

    logger.info('向下滑动', { x, y, endY });
    
    return await this.execute(x, y, x, endY);
  }

  // 向左滑动
  async swipeLeft(startX = null, startY = null, distance = 500) {
    const x = startX !== null ? startX : this.getScreenWidth() - 100;
    const y = startY !== null ? startY : this.getScreenCenterY();
    const endX = Math.max(100, x - distance);

    logger.info('向左滑动', { x, y, endX });
    
    return await this.execute(x, y, endX, y);
  }

  // 向右滑动
  async swipeRight(startX = null, startY = null, distance = 500) {
    const x = startX !== null ? startX : 100;
    const y = startY !== null ? startY : this.getScreenCenterY();
    const endX = Math.min(this.getScreenWidth() - 100, x + distance);

    logger.info('向右滑动', { x, y, endX });
    
    return await this.execute(x, y, endX, y);
  }

  // 拖拽
  async drag(x1, y1, x2, y2, duration = 500) {
    logger.info('执行拖拽', { x1, y1, x2, y2, duration });
    
    return await this.execute(x1, y1, x2, y2, { duration });
  }

  // 快速滑动（快速滑动）
  async fastSwipe(x1, y1, x2, y2) {
    logger.info('执行快速滑动', { x1, y1, x2, y2 });
    
    return await this.execute(x1, y1, x2, y2, { duration: 100 });
  }

  // 缓慢滑动
  async slowSwipe(x1, y1, x2, y2) {
    logger.info('执行缓慢滑动', { x1, y1, x2, y2 });
    
    return await this.execute(x1, y1, x2, y2, { duration: 1000 });
  }

  // 多点滑动（多指操作）
  async multiSwipe(swipes) {
    logger.info('执行多点滑动', { count: swipes.length });

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.gesturesAsync) {
      return await zdjl.gesturesAsync(swipes);
    }

    // 如果不支持多点操作，依次执行单点滑动
    const results = [];
    for (const swipe of swipes) {
      const result = await this.execute(swipe.x1, swipe.y1, swipe.x2, swipe.y2);
      results.push(result);
    }

    return results;
  }

  // 放大手势
  async pinchOut(centerX = null, centerY = null, scale = 1.5) {
    const cx = centerX !== null ? centerX : this.getScreenCenterX();
    const cy = centerY !== null ? centerY : this.getScreenCenterY();
    const offset = 100;

    const swipes = [
      { x1: cx - offset, y1: cy - offset, x2: cx - offset * scale, y2: cy - offset * scale },
      { x1: cx + offset, y1: cy + offset, x2: cx + offset * scale, y2: cy + offset * scale },
    ];

    logger.info('执行放大手势', { cx, cy, scale });
    
    return await this.multiSwipe(swipes);
  }

  // 缩小手势
  async pinchIn(centerX = null, centerY = null, scale = 0.5) {
    const cx = centerX !== null ? centerX : this.getScreenCenterX();
    const cy = centerY !== null ? centerY : this.getScreenCenterY();
    const offset = 200;

    const swipes = [
      { x1: cx - offset, y1: cy - offset, x2: cx - offset * scale, y2: cy - offset * scale },
      { x1: cx + offset, y1: cy + offset, x2: cx + offset * scale, y2: cy + offset * scale },
    ];

    logger.info('执行缩小手势', { cx, cy, scale });
    
    return await this.multiSwipe(swipes);
  }

  // 获取屏幕宽度（占位，实际需要从设备获取）
  getScreenWidth() {
    return 1080; // 默认值
  }

  // 获取屏幕高度
  getScreenHeight() {
    return 1920; // 默认值
  }

  // 获取屏幕中心X
  getScreenCenterX() {
    return this.getScreenWidth() / 2;
  }

  // 获取屏幕中心Y
  getScreenCenterY() {
    return this.getScreenHeight() / 2;
  }

  // 获取最后一次滑动
  getLastSwipe() {
    return this.lastSwipe;
  }

  // 延时
  sleep(ms) {
    return new Promise(resolve =&gt; setTimeout(resolve, ms));
  }
}

module.exports = new SwipeAction();

