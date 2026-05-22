
// 系统配置
const config = {
  // 监察系统配置
  monitor: {
    enabled: true,
    autoRetry: true,
    maxRetries: 3,
    retryDelay: 1000,
    feedbackTimeout: 5000,
  },

  // 日志配置
  logger: {
    enabled: true,
    level: 'info',
    saveToFile: true,
    filePath: '/sdcard/ai_monitor_logs/',
    maxFileSize: 10 * 1024 * 1024,
  },

  // 识别器配置
  recognizer: {
    ocrEnabled: true,
    imageMatchThreshold: 0.8,
    buttonDetectTimeout: 2000,
  },

  // 操作执行配置
  action: {
    defaultWaitTime: 500,
    clickDuration: 100,
    swipeDuration: 300,
  },
};

module.exports = config;

