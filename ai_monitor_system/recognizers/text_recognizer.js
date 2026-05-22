
// 文字识别器
const logger = require('../core/logger');
const config = require('../config/config');

class TextRecognizer {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5000;
  }

  // 识别屏幕文字
  async recognize(region = null) {
    try {
      logger.debug('开始文字识别', { region });

      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.ocrAsync) {
        const options = region ? { region } : {};
        const result = await zdjl.ocrAsync(options);
        return this.parseOCRResult(result);
      }

      return [];
    } catch (e) {
      logger.error('文字识别失败', e);
      return [];
    }
  }

  // 解析OCR结果
  parseOCRResult(ocrResult) {
    if (!ocrResult) return [];

    // 根据自动精灵的OCR返回格式解析
    // 假设返回格式包含text、x、y、width、height等字段
    if (Array.isArray(ocrResult)) {
      return ocrResult.map(item =&gt; ({
        text: item.text || '',
        x: item.x || 0,
        y: item.y || 0,
        width: item.width || 0,
        height: item.height || 0,
        confidence: item.confidence || 1,
      }));
    }

    return [];
  }

  // 查找包含特定文字的区域
  async findText(searchText, options = {}) {
    const { caseSensitive = false, exactMatch = false, region = null } = options;
    
    logger.debug('查找文字', { searchText, options });

    const textResults = await this.recognize(region);
    
    const found = textResults.filter(item =&gt; {
      let text1 = item.text;
      let text2 = searchText;

      if (!caseSensitive) {
        text1 = text1.toLowerCase();
        text2 = text2.toLowerCase();
      }

      if (exactMatch) {
        return text1 === text2;
      }
      return text1.includes(text2);
    });

    logger.info(`找到 ${found.length} 个匹配文字`, { searchText });
    return found;
  }

  // 检查文字是否存在
  async textExists(searchText, options = {}) {
    const found = await this.findText(searchText, options);
    return found.length &gt; 0;
  }

  // 获取文字位置
  async getTextLocation(searchText, options = {}) {
    const found = await this.findText(searchText, options);
    if (found.length === 0) return null;

    // 返回第一个匹配项的中心位置
    const item = found[0];
    return {
      x: item.x + item.width / 2,
      y: item.y + item.height / 2,
      text: item.text,
      bounds: {
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
      },
    };
  }

  // 等待文字出现
  async waitForText(searchText, timeout = 5000, options = {}) {
    const startTime = Date.now();
    
    while (Date.now() - startTime &lt; timeout) {
      const exists = await this.textExists(searchText, options);
      if (exists) {
        return true;
      }
      await this.sleep(500);
    }

    logger.warn('等待文字超时', { searchText, timeout });
    return false;
  }

  // 等待文字消失
  async waitForTextGone(searchText, timeout = 5000, options = {}) {
    const startTime = Date.now();
    
    while (Date.now() - startTime &lt; timeout) {
      const exists = await this.textExists(searchText, options);
      if (!exists) {
        return true;
      }
      await this.sleep(500);
    }

    logger.warn('等待文字消失超时', { searchText, timeout });
    return false;
  }

  // 获取所有文字
  async getAllText(region = null) {
    const results = await this.recognize(region);
    return results.map(item =&gt; item.text);
  }

  // 清除缓存
  clearCache() {
    this.cache.clear();
  }

  // 延时
  sleep(ms) {
    return new Promise(resolve =&gt; setTimeout(resolve, ms));
  }
}

module.exports = new TextRecognizer();

