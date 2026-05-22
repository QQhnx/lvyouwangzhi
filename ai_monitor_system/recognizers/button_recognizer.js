
// 按钮识别器
const logger = require('../core/logger');
const config = require('../config/config');

class ButtonRecognizer {
  constructor() {
    this.cache = new Map();
  }

  // 查找按钮
  async findButton(selector, options = {}) {
    try {
      logger.debug('查找按钮', { selector, options });

      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.findNodeAsync) {
        const node = await zdjl.findNodeAsync(selector);
        if (node) {
          return this.parseNode(node);
        }
      }

      return null;
    } catch (e) {
      logger.error('查找按钮失败', e);
      return null;
    }
  }

  // 查找多个按钮
  async findButtons(selector, options = {}) {
    try {
      logger.debug('查找多个按钮', { selector, options });

      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.findNodeAsync) {
        // 需要根据自动精灵的实际API调整
        // 假设findNodeAsync返回数组或单个节点
        const result = await zdjl.findNodeAsync(selector);
        if (Array.isArray(result)) {
          return result.map(node =&gt; this.parseNode(node));
        } else if (result) {
          return [this.parseNode(result)];
        }
      }

      return [];
    } catch (e) {
      logger.error('查找多个按钮失败', e);
      return [];
    }
  }

  // 解析节点
  parseNode(node) {
    if (!node) return null;

    return {
      id: node.id || '',
      text: node.text || '',
      desc: node.desc || '',
      x: node.x || 0,
      y: node.y || 0,
      width: node.width || 0,
      height: node.height || 0,
      clickable: node.clickable || false,
      scrollable: node.scrollable || false,
      checked: node.checked || false,
      enabled: node.enabled !== false,
      raw: node,
    };
  }

  // 按文字查找按钮
  async findButtonByText(text, options = {}) {
    const { exactMatch = false } = options;
    
    const selector = exactMatch 
      ? { text: text } 
      : { textMatches: text };

    return await this.findButton(selector);
  }

  // 按ID查找按钮
  async findButtonById(id) {
    return await this.findButton({ id });
  }

  // 按描述查找按钮
  async findButtonByDesc(desc, options = {}) {
    return await this.findButton({ desc });
  }

  // 检查按钮是否存在
  async buttonExists(selector) {
    const button = await this.findButton(selector);
    return button !== null;
  }

  // 获取按钮位置
  async getButtonLocation(selector) {
    const button = await this.findButton(selector);
    if (!button) return null;

    return {
      x: button.x + button.width / 2,
      y: button.y + button.height / 2,
      bounds: {
        x: button.x,
        y: button.y,
        width: button.width,
        height: button.height,
      },
      button,
    };
  }

  // 获取可点击按钮
  async getClickableButtons() {
    const buttons = await this.findButtons({ clickable: true });
    return buttons.filter(b =&gt; b.clickable &amp;&amp; b.enabled);
  }

  // 等待按钮出现
  async waitForButton(selector, timeout = 5000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime &lt; timeout) {
      const exists = await this.buttonExists(selector);
      if (exists) {
        return true;
      }
      await this.sleep(500);
    }

    logger.warn('等待按钮超时', { selector, timeout });
    return false;
  }

  // 等待按钮可点击
  async waitForButtonClickable(selector, timeout = 5000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime &lt; timeout) {
      const button = await this.findButton(selector);
      if (button &amp;&amp; button.clickable &amp;&amp; button.enabled) {
        return true;
      }
      await this.sleep(500);
    }

    logger.warn('等待按钮可点击超时', { selector, timeout });
    return false;
  }

  // 等待按钮消失
  async waitForButtonGone(selector, timeout = 5000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime &lt; timeout) {
      const exists = await this.buttonExists(selector);
      if (!exists) {
        return true;
      }
      await this.sleep(500);
    }

    logger.warn('等待按钮消失超时', { selector, timeout });
    return false;
  }

  // 点击按钮
  async clickButton(selector, options = {}) {
    const location = await this.getButtonLocation(selector);
    if (!location) {
      throw new Error('未找到按钮');
    }

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.clickAsync) {
      return await zdjl.clickAsync(location.x, location.y);
    }

    return location;
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

module.exports = new ButtonRecognizer();

