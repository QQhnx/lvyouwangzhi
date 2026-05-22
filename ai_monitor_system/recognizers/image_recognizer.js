
// 图像识别器
const logger = require('../core/logger');
const config = require('../config/config');

class ImageRecognizer {
  constructor() {
    this.templateImages = new Map();
  }

  // 截图
  async captureScreenshot(options = {}) {
    try {
      logger.debug('截取屏幕', options);

      if (typeof zdjl !== 'undefined') {
        // 根据自动精灵的截图API
        // 实际使用时需要适配
        return { success: true, data: 'screenshot_data' };
      }

      return null;
    } catch (e) {
      logger.error('截图失败', e);
      return null;
    }
  }

  // 注册模板图像
  registerTemplate(name, imageData) {
    this.templateImages.set(name, imageData);
    logger.info('注册模板图像', { name });
  }

  // 查找图像
  async findImage(templateName, options = {}) {
    try {
      const { threshold = config.recognizer.imageMatchThreshold, region = null } = options;
      
      logger.debug('查找图像', { templateName, threshold, region });

      const template = this.templateImages.get(templateName);
      if (!template) {
        logger.warn('模板图像不存在', { templateName });
        return null;
      }

      // 使用自动精灵的图像查找功能
      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.findLocationAsync) {
        // 需要根据实际API调整
        const location = await zdjl.findLocationAsync({
          image: template,
          threshold,
          region,
        });

        if (location) {
          return {
            x: location.x,
            y: location.y,
            width: location.width || 0,
            height: location.height || 0,
            confidence: location.confidence || threshold,
          };
        }
      }

      return null;
    } catch (e) {
      logger.error('查找图像失败', e);
      return null;
    }
  }

  // 查找所有匹配的所有位置
  async findAllImages(templateName, options = {}) {
    try {
      // 类似findImage，但返回所有匹配
      // 实际实现取决于自动精灵的API
      return [];
    } catch (e) {
      logger.error('查找所有图像失败', e);
      return [];
    }
  }

  // 检查图像是否存在
  async imageExists(templateName, options = {}) {
    const location = await this.findImage(templateName, options);
    return location !== null;
  }

  // 获取图像位置
  async getImageLocation(templateName, options = {}) {
    const location = await this.findImage(templateName, options);
    if (!location) return null;

    return {
      x: location.x + location.width / 2,
      y: location.y + location.height / 2,
      bounds: {
        x: location.x,
        y: location.y,
        width: location.width,
        height: location.height,
      },
      confidence: location.confidence,
    };
  }

  // 等待图像出现
  async waitForImage(templateName, timeout = 5000, options = {}) {
    const startTime = Date.now();
    
    while (Date.now() - startTime &lt; timeout) {
      const exists = await this.imageExists(templateName, options);
      if (exists) {
        return true;
      }
      await this.sleep(500);
    }

    logger.warn('等待图像超时', { templateName, timeout });
    return false;
  }

  // 等待图像消失
  async waitForImageGone(templateName, timeout = 5000, options = {}) {
    const startTime = Date.now();
    
    while (Date.now() - startTime &lt; timeout) {
      const exists = await this.imageExists(templateName, options);
      if (!exists) {
        return true;
      }
      await this.sleep(500);
    }

    logger.warn('等待图像消失超时', { templateName, timeout });
    return false;
  }

  // 点击图像
  async clickImage(templateName, options = {}) {
    const location = await this.getImageLocation(templateName, options);
    if (!location) {
      throw new Error('未找到图像');
    }

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.clickAsync) {
      return await zdjl.clickAsync(location.x, location.y);
    }

    return location;
  }

  // 获取指定位置的颜色
  async getColor(x, y) {
    try {
      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.getScreenColorAsync) {
        return await zdjl.getScreenColorAsync(x, y);
      }
      return null;
    } catch (e) {
      logger.error('获取颜色失败', e);
      return null;
    }
  }

  // 比较颜色
  async compareColor(x, y, expectedColor, tolerance = 10) {
    const color = await this.getColor(x, y);
    if (!color) return false;

    // 简单的颜色比较
    const distance = this.colorDistance(color, expectedColor);
    return distance &lt;= tolerance;
  }

  // 计算颜色距离
  colorDistance(color1, color2) {
    // 假设颜色格式为 {r, g, b}
    const dr = color1.r - color2.r;
    const dg = color1.g - color2.g;
    const db = color1.b - color2.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  // 获取区域颜色
  async getRegionColors(region) {
    try {
      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.getScreenAreaColorsAsync) {
        return await zdjl.getScreenAreaColorsAsync(region);
      }
      return [];
    } catch (e) {
      logger.error('获取区域颜色失败', e);
      return [];
    }
  }

  // 清除模板
  unregisterTemplate(name) {
    this.templateImages.delete(name);
  }

  // 清除所有模板
  clearAllTemplates() {
    this.templateImages.clear();
  }

  // 延时
  sleep(ms) {
    return new Promise(resolve =&gt; setTimeout(resolve, ms));
  }
}

module.exports = new ImageRecognizer();

