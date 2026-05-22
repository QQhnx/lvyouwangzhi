
// 输入操作
const logger = require('../core/logger');

class InputAction {
  constructor() {
    this.lastInput = null;
  }

  // 输入文本
  async execute(text, options = {}) {
    const { clear = false, append = true } = options;
    
    logger.info('执行输入', { text, clear, append });

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.inputAsync) {
      const result = await zdjl.inputAsync(text);
      this.lastInput = { text, timestamp: Date.now() };
      return result;
    }

    this.lastInput = { text, timestamp: Date.now() };
    return { success: true, text };
  }

  // 输入文本（清除原有内容）
  async inputText(text) {
    return await this.execute(text, { clear: true });
  }

  // 追加文本
  async appendText(text) {
    return await this.execute(text, { append: true });
  }

  // 按下键
  async pressKey(keyCode) {
    logger.info('按下键', { keyCode });

    if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.pressKeyAsync) {
      return await zdjl.pressKeyAsync(keyCode);
    }

    return { success: true, keyCode };
  }

  // 按下回车
  async pressEnter() {
    logger.info('按下回车');
    return await this.pressKey('enter');
  }

  // 按下退格
  async pressBackspace(count = 1) {
    logger.info('按下退格', { count });
    
    for (let i = 0; i &lt; count; i++) {
      await this.pressKey('backspace');
    }
    
    return { success: true, action: 'backspace', count };
  }

  // 按下ESC
  async pressEsc() {
    logger.info('按下ESC');
    return await this.pressKey('esc');
  }

  // 按下TAB
  async pressTab() {
    logger.info('按下TAB');
    return await this.pressKey('tab');
  }

  // 按下方向键
  async pressArrow(direction) {
    const keyMap = {
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
    };

    const key = keyMap[direction];
    if (!key) {
      throw new Error(`无效的方向: ${direction}`);
    }

    logger.info('按下方向键', { direction });
    return await this.pressKey(key);
  }

  // 按下组合键
  async pressKeyCombo(keys) {
    logger.info('按下组合键', { keys });

    if (typeof zdjl !== 'undefined') {
      // 需要根据自动精灵的API实现
      // 可能需要使用 zdjl.gestureAsync 或其他方式
    }

    return { success: true, keys };
  }

  // 清除输入框内容
  async clearInput() {
    logger.info('清除输入框');
    
    // 先选择全部
    await this.pressKeyCombo(['ctrl', 'a']);
    await this.sleep(100);
    // 再删除
    await this.pressBackspace();
    
    return { success: true, action: 'clearInput' };
  }

  // 模拟键盘输入（逐个字符）
  async typeText(text, delay = 50) {
    logger.info('模拟打字', { text, delay });

    for (const char of text) {
      await this.execute(char);
      await this.sleep(delay);
    }

    return { success: true, text, typed: true };
  }

  // 获取最后一次输入
  getLastInput() {
    return this.lastInput;
  }

  // 延时
  sleep(ms) {
    return new Promise(resolve =&gt; setTimeout(resolve, ms));
  }
}

module.exports = new InputAction();

