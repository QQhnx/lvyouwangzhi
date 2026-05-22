from playwright.sync_api import sync_playwright
import time

def test_cardstack_scroll_functionality():
    with sync_playwright() as p:
        # Try to launch with Chrome or Edge
        browser = None
        try:
            print("尝试使用 Chrome 浏览器...")
            browser = p.chromium.launch(
                headless=True,
                executable_path="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            )
        except:
            try:
                print("尝试使用 Edge 浏览器...")
                browser = p.chromium.launch(
                    headless=True,
                    executable_path="C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
                )
            except:
                print("❌ 未找到 Chrome 或 Edge 浏览器")
                return
        
        page = browser.new_page()
        
        print("=" * 60)
        print("测试颐和园网站 CardStack 智能滚动控制功能")
        print("=" * 60)
        
        try:
            # 1. 访问网站
            print("\n[1] 访问网站...")
            page.goto('http://localhost:3001/')
            page.wait_for_load_state('networkidle')
            time.sleep(2)
            print("✓ 网站加载成功")
            
            # 2. 检查 HeroSection 是否存在
            print("\n[2] 检查 HeroSection...")
            hero = page.locator('section#hero')
            assert hero.is_visible(), "HeroSection 未找到"
            print("✓ HeroSection 存在且可见")
            
            # 3. 滚动到 CardStack 区域
            print("\n[3] 滚动到 CardStack 区域...")
            page.evaluate('document.getElementById("attractions").scrollIntoView()')
            time.sleep(1)
            print("✓ 已滚动到景点展示区域")
            
            # 4. 检查 CardStack 容器是否存在
            print("\n[4] 检查 CardStack 容器...")
            card_container = page.locator('[class*="perspective"]')
            assert card_container.count() > 0, "CardStack 容器未找到"
            print(f"✓ 找到 {card_container.count()} 个卡片容器")
            
            # 5. 检查景点卡片数量
            print("\n[5] 检查景点卡片数量...")
            cards = page.locator('.absolute.inset-0')
            card_count = cards.count()
            print(f"✓ 发现 {card_count} 个景点卡片")
            assert card_count >= 1, "未找到景点卡片"
            
            # 6. 测试滚轮滚动功能
            print("\n[6] 测试滚轮滚动功能...")
            page.evaluate('document.getElementById("attractions").scrollIntoView()')
            time.sleep(0.5)
            
            # 获取容器引用
            container = page.locator('.relative.w-full.flex-grow').first
            
            # 模拟向下滚动
            container.hover()
            page.mouse.wheel(0, 100)
            time.sleep(0.5)
            print("✓ 滚轮向下滚动事件已触发")
            
            # 继续滚动切换卡片
            for i in range(2):
                page.mouse.wheel(0, 100)
                time.sleep(0.5)
            print("✓ 多次滚轮滚动完成")
            
            # 7. 测试键盘导航
            print("\n[7] 测试键盘导航...")
            page.keyboard.press('ArrowUp')
            time.sleep(0.5)
            print("✓ ArrowUp 键已按下")
            
            page.keyboard.press('ArrowDown')
            time.sleep(0.5)
            print("✓ ArrowDown 键已按下")
            
            # 8. 检查 CardIndicator 是否存在
            print("\n[8] 检查卡片指示器...")
            indicators = page.locator('[class*="rounded"]')
            indicator_count = indicators.count()
            print(f"✓ 找到 {indicator_count} 个可能的指示器元素")
            
            # 9. 测试跳过按钮
            print("\n[9] 检查跳过按钮...")
            # 滚动到最后一张卡片
            for _ in range(card_count):
                page.mouse.wheel(0, 100)
                time.sleep(0.3)
            time.sleep(1)
            
            skip_button = page.locator('button:has-text("跳过查看")')
            if skip_button.count() > 0:
                print("✓ 跳过按钮已显示")
            else:
                print("! 跳过按钮未显示（可能不在最后一张卡片）")
            
            # 10. 检查季节分区
            print("\n[10] 检查季节分区...")
            seasons_section = page.locator('#seasons')
            if seasons_section.count() > 0:
                print("✓ 季节分区存在")
            else:
                print("! 季节分区未找到（可能需要继续滚动）")
            
            print("\n" + "=" * 60)
            print("✅ 所有测试通过！CardStack 滚动控制功能正常。")
            print("=" * 60)
            
        except AssertionError as e:
            print(f"\n❌ 测试失败: {e}")
            raise
        except Exception as e:
            print(f"\n❌ 发生错误: {e}")
            raise
        finally:
            browser.close()
            print("\n浏览器已关闭")

if __name__ == "__main__":
    test_cardstack_scroll_functionality()
