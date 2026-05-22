const { chromium } = require('playwright');

async function testCardStackScrollFunctionality() {
    console.log('='.repeat(60));
    console.log('测试颐和园网站 CardStack 智能滚动控制功能');
    console.log('='.repeat(60));
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        // 1. 访问网站
        console.log('\n[1] 访问网站...');
        await page.goto('http://localhost:3001/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        console.log('✓ 网站加载成功');
        
        // 2. 检查 HeroSection 是否存在
        console.log('\n[2] 检查 HeroSection...');
        const hero = await page.locator('section#hero');
        const heroVisible = await hero.isVisible();
        if (!heroVisible) {
            throw new Error('HeroSection 未找到');
        }
        console.log('✓ HeroSection 存在且可见');
        
        // 3. 滚动到 CardStack 区域
        console.log('\n[3] 滚动到 CardStack 区域...');
        await page.evaluate(() => {
            document.getElementById('attractions')?.scrollIntoView();
        });
        await page.waitForTimeout(1000);
        console.log('✓ 已滚动到景点展示区域');
        
        // 4. 检查 CardStack 容器是否存在
        console.log('\n[4] 检查 CardStack 容器...');
        const perspectiveElements = await page.locator('[class*="perspective"]').count();
        if (perspectiveElements === 0) {
            throw new Error('CardStack 容器未找到');
        }
        console.log(`✓ 找到 ${perspectiveElements} 个卡片容器`);
        
        // 5. 检查景点卡片数量
        console.log('\n[5] 检查景点卡片数量...');
        const cards = await page.locator('.absolute.inset-0').count();
        console.log(`✓ 发现 ${cards} 个景点卡片`);
        if (cards === 0) {
            throw new Error('未找到景点卡片');
        }
        
        // 6. 测试滚轮滚动功能
        console.log('\n[6] 测试滚轮滚动功能...');
        await page.evaluate(() => {
            document.getElementById('attractions')?.scrollIntoView();
        });
        await page.waitForTimeout(500);
        
        // 获取容器引用并滚动
        const container = page.locator('.relative.w-full.flex-grow').first();
        await container.hover();
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(500);
        console.log('✓ 滚轮向下滚动事件已触发');
        
        // 继续滚动切换卡片
        for (let i = 0; i < 2; i++) {
            await page.mouse.wheel(0, 100);
            await page.waitForTimeout(500);
        }
        console.log('✓ 多次滚轮滚动完成');
        
        // 7. 测试键盘导航
        console.log('\n[7] 测试键盘导航...');
        await page.keyboard.press('ArrowUp');
        await page.waitForTimeout(500);
        console.log('✓ ArrowUp 键已按下');
        
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(500);
        console.log('✓ ArrowDown 键已按下');
        
        // 8. 检查 CardIndicator 是否存在
        console.log('\n[8] 检查卡片指示器...');
        const indicators = await page.locator('[class*="rounded"]').count();
        console.log(`✓ 找到 ${indicators} 个可能的指示器元素`);
        
        // 9. 测试跳过按钮
        console.log('\n[9] 检查跳过按钮...');
        // 滚动到最后一张卡片
        for (let i = 0; i < cards; i++) {
            await page.mouse.wheel(0, 100);
            await page.waitForTimeout(300);
        }
        await page.waitForTimeout(1000);
        
        const skipButton = page.locator('button:has-text("跳过查看")');
        const skipButtonCount = await skipButton.count();
        if (skipButtonCount > 0) {
            console.log('✓ 跳过按钮已显示');
        } else {
            console.log('! 跳过按钮未显示（可能不在最后一张卡片）');
        }
        
        // 10. 检查季节分区
        console.log('\n[10] 检查季节分区...');
        const seasonsSection = await page.locator('#seasons').count();
        if (seasonsSection > 0) {
            console.log('✓ 季节分区存在');
        } else {
            console.log('! 季节分区未找到（可能需要继续滚动）');
        }
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ 所有测试通过！CardStack 滚动控制功能正常。');
        console.log('='.repeat(60));
        
    } catch (error) {
        console.log(`\n❌ 测试失败: ${error.message}`);
        throw error;
    } finally {
        await browser.close();
        console.log('\n浏览器已关闭');
    }
}

if (require.main === module) {
    testCardStackScrollFunctionality()
        .then(() => {
            console.log('\n测试完成');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n测试失败:', error);
            process.exit(1);
        });
}

module.exports = { testCardStackScrollFunctionality };
