# 自动精灵使用指南

## 第一步：创建脚本

1. 打开自动精灵App
2. 新建一个脚本
3. 添加动作：选择"运行JS代码"
4. 将以下代码复制到编辑器中

## 第二步：基础代码模板

```javascript
// 创建监察器
const monitor = {
  executeAction: async function(actionFn, name, validationFn) {
    console.log(`[开始] ${name}`);
    
    // 采集前状态
    const preText = await this.getText();
    
    try {
      // 执行操作
      const result = await actionFn();
      
      // 等待操作生效
      await this.sleep(500);
      
      // 采集后状态
      const postText = await this.getText();
      
      // 验证结果
      let success = false;
      if (validationFn) {
        success = await validationFn(preText, postText);
      } else {
        // 默认验证：检查屏幕文字是否变化
        success = JSON.stringify(preText) !== JSON.stringify(postText);
      }
      
      console.log(`[${success ? '成功' : '失败'}] ${name}`);
      return { success, result };
      
    } catch (e) {
      console.error(`[错误] ${name}: ${e.message}`);
      return { success: false, error: e.message };
    }
  },
  
  getText: async function() {
    if (zdjl && zdjl.ocrAsync) {
      return await zdjl.ocrAsync() || [];
    }
    return [];
  },
  
  sleep: function(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
};
```

## 第三步：使用示例

### 示例1：点击按钮并验证

```javascript
// 点击"开始游戏"按钮
await monitor.executeAction(
  async () => {
    // 查找按钮位置
    const loc = await zdjl.findLocationAsync({ text: '开始游戏' });
    if (loc) {
      await zdjl.clickAsync(loc.x, loc.y);
    }
  },
  '点击开始游戏',
  async (pre, post) => {
    // 验证：检查是否有"关卡"文字出现
    return post.some(t => t.includes('关卡') || t.includes('选择'));
  }
);
```

### 示例2：执行多个操作

```javascript
// 游戏主循环
for (let i = 0; i < 10; i++) {
  await monitor.executeAction(
    async () => {
      // 随机点击
      const x = 300 + Math.random() * 400;
      const y = 600 + Math.random() * 400;
      await zdjl.clickAsync(x, y);
    },
    `第${i + 1}次操作`
  );
  
  await monitor.sleep(1000);
}
```

### 示例3：滑动操作

```javascript
// 向上滑动
await monitor.executeAction(
  async () => {
    await zdjl.swipeAsync(500, 1500, 500, 500, 300);
  },
  '向上滑动'
);
```

### 示例4：等待并响应

```javascript
// 等待任务完成
async function waitForTask() {
  for (let i = 0; i < 20; i++) {
    const text = await monitor.getText();
    
    if (text.some(t => t.includes('任务完成'))) {
      console.log('检测到任务完成!');
      
      // 点击领取
      const loc = await zdjl.findLocationAsync({ text: '领取' });
      if (loc) {
        await zdjl.clickAsync(loc.x, loc.y);
      }
      break;
    }
    
    await monitor.sleep(1000);
  }
}
```

## 第四步：完整游戏脚本示例

```javascript
// 自动精灵游戏脚本 - 示例
async function runGame() {
  console.log('游戏开始...');
  
  // 1. 开始游戏
  await monitor.executeAction(
    async () => {
      const loc = await zdjl.findLocationAsync({ text: '开始' });
      if (loc) await zdjl.clickAsync(loc.x, loc.y);
    },
    '点击开始'
  );
  
  await monitor.sleep(2000);
  
  // 2. 执行游戏操作
  for (let round = 1; round <= 5; round++) {
    console.log(`--- 第${round}轮 ---`);
    
    // 点击攻击
    await monitor.executeAction(
      async () => {
        const loc = await zdjl.findLocationAsync({ text: '攻击' });
        if (loc) await zdjl.clickAsync(loc.x, loc.y);
      },
      '攻击'
    );
    
    await monitor.sleep(500);
  }
  
  // 3. 检查结果
  const text = await monitor.getText();
  if (text.some(t => t.includes('胜利'))) {
    console.log('游戏胜利!');
  }
  
  console.log('游戏结束');
}

// 运行
runGame();
```

## 关键API说明

### 操作执行
- `zdjl.clickAsync(x, y)` - 点击坐标
- `zdjl.swipeAsync(x1, y1, x2, y2, duration)` - 滑动
- `zdjl.findLocationAsync({text: '文字'})` - 查找文字位置
- `zdjl.ocrAsync()` - 识别屏幕文字

### 监察系统
- `monitor.executeAction(fn, name, validate)` - 执行带监察的操作
- `monitor.getText()` - 获取屏幕文字
- `monitor.sleep(ms)` - 等待

### 验证函数
验证函数接收两个参数：`pre`(操作前文字) 和 `post`(操作后文字)
返回 `true` 表示成功，`false` 表示失败

## 调试技巧

1. **查看日志**：所有操作都会输出日志到控制台
2. **添加console.log**：在关键步骤添加日志
3. **单步测试**：先单独测试每个操作
4. **截图验证**：配合截图功能确认屏幕状态

## 错误处理

```javascript
try {
  await monitor.executeAction(
    async () => { /* 操作 */ },
    '操作名称'
  );
} catch (e) {
  console.error('发生错误:', e.message);
  // 可以选择重试或终止脚本
}
```

这样就完成了一个具有实时反馈和自我监察能力的游戏自动化脚本！
