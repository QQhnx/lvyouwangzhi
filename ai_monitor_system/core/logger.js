
// 日志系统
const config = require('../config/config');

class Logger {
  constructor() {
    this.logs = [];
    this.levelMap = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
  }

  // 记录日志
  log(level, message, data = null) {
    if (!config.logger.enabled) return;
    
    const logLevel = this.levelMap[level];
    const configLevel = this.levelMap[config.logger.level];
    
    if (logLevel &lt; configLevel) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };

    this.logs.push(logEntry);
    this.print(logEntry);
    
    if (config.logger.saveToFile) {
      this.saveToFile(logEntry);
    }
  }

  debug(message, data) {
    this.log('debug', message, data);
  }

  info(message, data) {
    this.log('info', message, data);
  }

  warn(message, data) {
    this.log('warn', message, data);
  }

  error(message, data) {
    this.log('error', message, data);
  }

  // 打印日志
  print(logEntry) {
    const colors = {
      debug: '\x1b[36m',
      info: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
    };
    const reset = '\x1b[0m';
    
    console.log(
      `${colors[logEntry.level]}[${logEntry.timestamp}] [${logEntry.level.toUpperCase()}] ${logEntry.message}${reset}`,
      logEntry.data ? logEntry.data : ''
    );
  }

  // 保存到文件
  saveToFile(logEntry) {
    try {
      const logStr = JSON.stringify(logEntry) + '\n';
      // 在自动精灵环境中使用 zdjl.appendFileAsync
      if (typeof zdjl !== 'undefined' &amp;&amp; zdjl.appendFileAsync) {
        // 实际使用时实现文件保存
      }
    } catch (e) {
      console.error('保存日志失败:', e);
    }
  }

  // 获取所有日志
  getLogs(level = null) {
    if (level) {
      return this.logs.filter(log =&gt; log.level === level);
    }
    return this.logs;
  }

  // 清空日志
  clearLogs() {
    this.logs = [];
  }
}

module.exports = new Logger();

