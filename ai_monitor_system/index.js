
// AI实时操作反馈与自我监察系统 - 入口文件
// 基于自动精灵的游戏自动化工具

// 导出核心模块
module.exports = {
  // 核心系统
  monitor: require('./core/monitor'),
  feedback: require('./core/feedback'),
  validator: require('./core/validator'),
  logger: require('./core/logger'),
  
  // 配置
  config: require('./config/config'),
  
  // 识别器
  textRecognizer: require('./recognizers/text_recognizer'),
  buttonRecognizer: require('./recognizers/button_recognizer'),
  imageRecognizer: require('./recognizers/image_recognizer'),
  
  // 操作
  clickAction: require('./actions/click_action'),
  swipeAction: require('./actions/swipe_action'),
  inputAction: require('./actions/input_action'),
};

console.log('AI实时操作反馈与自我监察系统已加载');

