from playwright.sync_api import sync_playwright
import time

def test_continuous_scroll_prevention():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            executable_path="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        )
        page = browser.new_page()
        
        print("=" * 60)
        print("测试 CardStack 连续滚动防止网页下滑")
        print("=" * 60)
        
        try:
            # 1. 访问网站
            print("\n[1] 访问网站...")
            page.goto('http://localhost:3001/')
            page.wait_for_load_state('networkidle')
            time.sleep(2)
            print("✓ 网站加载成功")
            
            # 2. 滚动到 CardStack 区域
            print("\n[2] 滚动到 CardStack 区域...")
            page.evaluate('document.getElementById("attractions").scrollIntoView()')
            time.sleep(1)
            initial_after_nav = page.evaluate('window.scrollY')
            print(f"到达 CardStack 后的滚动位置: {initial_after_nav}")
            print("✓ 已滚动到景点展示区域")
            
            # 3. 快速多次连续滚轮滚动
            print("\n[3] 测试快速连续滚动...")
            container = page.locator('.relative.w-full.flex-grow').first
            container.hover()
            
            print("执行 10 次快速滚轮...")
            for i in range(10):
                page.mouse.wheel(0, 150)
                time.sleep(0.1)
            
            # 记录滚动位置
            final_scroll_y = page.evaluate('window.scrollY')
            print(f"连续滚动后的滚动位置: {final_scroll_y}")
            
            # 检查滚动位置变化
            scroll_change = abs(final_scroll_y - initial_after_nav)
            print(f"滚动位置变化: {scroll_change}")
            
            # 检查网页是否有明显下滑（变化超过 200 算有明显下滑）
            if scroll_change < 200:
                print("✓ 网页没有明显下滑，连续滚动被成功阻止！")
            else:
                print("! 网页有下滑：")
                
            print("\n" + "=" * 60)
            print("✅ 连续滚动测试完成！")
            print("=" * 60)
            
        except Exception as e:
            print(f"\n❌ 发生错误: {e}")
            raise
        finally:
            browser.close()
            print("\n浏览器已关闭")

if __name__ == "__main__":
    test_continuous_scroll_prevention()
