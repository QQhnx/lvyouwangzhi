import numpy as np 
import matplotlib.pyplot as plt 
import matplotlib.patches as patches

# 根据图片创建钻石剑的像素坐标
# 颜色定义
diamond_light = '#7EF5E3'  # 浅钻石色
diamond_dark = '#2D8B7C'   # 深钻石色  
handle = '#8B6914'         # 棕色手柄
handle_dark = '#5C4200'    # 深棕色
outline = '#1A4A3F'        # 轮廓色

# 创建一个16x16的网格来表示钻石剑
fig, ax = plt.subplots(figsize=(8, 8))

# 像素坐标系统 - 根据图片精确绘制
# 定义每个像素的位置 (x, y) 和颜色
pixels = [
    # 剑尖 (顶部)
    (10, 15, diamond_dark),
    (9, 14, diamond_light),
    (10, 14, diamond_light),
    
    # 剑身
    (8, 13, diamond_dark),
    (9, 13, diamond_light),
    (10, 13, diamond_light),
    (11, 13, diamond_dark),
    
    (7, 12, diamond_dark),
    (8, 12, diamond_light),
    (9, 12, diamond_light),
    (10, 12, diamond_light),
    (11, 12, diamond_light),
    (12, 12, diamond_dark),
    
    (6, 11, diamond_dark),
    (7, 11, diamond_light),
    (8, 11, diamond_light),
    (9, 11, diamond_light),
    (10, 11, diamond_light),
    (11, 11, diamond_light),
    (12, 11, diamond_dark),
    
    (5, 10, diamond_dark),
    (6, 10, diamond_light),
    (7, 10, diamond_light),
    (8, 10, diamond_light),
    (9, 10, diamond_light),
    (10, 10, diamond_light),
    (11, 10, diamond_light),
    (12, 10, diamond_dark),
    
    (4, 9, diamond_dark),
    (5, 9, diamond_light),
    (6, 9, diamond_light),
    (7, 9, diamond_light),
    (8, 9, diamond_light),
    (9, 9, diamond_light),
    (10, 9, diamond_light),
    (11, 9, diamond_light),
    (12, 9, diamond_dark),
    
    (3, 8, diamond_dark),
    (4, 8, diamond_light),
    (5, 8, diamond_light),
    (6, 8, diamond_light),
    (7, 8, diamond_light),
    (8, 8, diamond_light),
    (9, 8, diamond_light),
    (10, 8, diamond_light),
    (11, 8, diamond_dark),
    
    (2, 7, diamond_dark),
    (3, 7, diamond_light),
    (4, 7, diamond_light),
    (5, 7, diamond_light),
    (6, 7, diamond_light),
    (7, 7, diamond_light),
    (8, 7, diamond_light),
    (9, 7, diamond_dark),
    
    # 护手
    (1, 6, diamond_dark),
    (2, 6, diamond_light),
    (3, 6, diamond_light),
    (4, 6, diamond_light),
    (5, 6, diamond_light),
    (6, 6, diamond_light),
    (7, 6, diamond_light),
    (8, 6, diamond_dark),
    (9, 6, diamond_dark),
    (10, 6, diamond_dark),
    (11, 6, diamond_dark),
    (12, 6, diamond_dark),
    
    (0, 5, diamond_dark),
    (1, 5, diamond_dark),
    (2, 5, diamond_light),
    (3, 5, diamond_light),
    (4, 5, diamond_light),
    (5, 5, diamond_light),
    (6, 5, diamond_light),
    (7, 5, diamond_light),
    (8, 5, diamond_light),
    (9, 5, diamond_dark),
    (10, 5, diamond_dark),
    (11, 5, diamond_dark),
    
    # 手柄
    (0, 4, diamond_dark),
    (1, 4, handle_dark),
    (2, 4, handle),
    (3, 4, handle),
    (4, 4, handle),
    (5, 4, handle),
    (6, 4, handle),
    (7, 4, handle),
    (8, 4, handle),
    (9, 4, handle_dark),
    
    (0, 3, diamond_dark),
    (1, 3, handle_dark),
    (2, 3, handle),
    (3, 3, handle),
    (4, 3, handle),
    (5, 3, handle),
    (6, 3, handle),
    (7, 3, handle),
    (8, 3, handle),
    (9, 3, handle_dark),
    
    # 剑柄末端
    (0, 2, diamond_dark),
    (1, 2, diamond_dark),
    (2, 2, handle_dark),
    (3, 2, handle),
    (4, 2, handle),
    (5, 2, handle),
    (6, 2, handle),
    (7, 2, handle),
    (8, 2, handle_dark),
    (9, 2, diamond_dark),
    
    (0, 1, diamond_dark),
    (1, 1, diamond_dark),
    (2, 1, diamond_dark),
    (3, 1, handle_dark),
    (4, 1, handle),
    (5, 1, handle),
    (6, 1, handle),
    (7, 1, handle_dark),
    (8, 1, diamond_dark),
    (9, 1, diamond_dark),
    
    (0, 0, diamond_dark),
    (1, 0, diamond_dark),
    (2, 0, diamond_dark),
    (3, 0, diamond_dark),
    (4, 0, handle_dark),
    (5, 0, handle),
    (6, 0, handle_dark),
    (7, 0, diamond_dark),
    (8, 0, diamond_dark),
    (9, 0, diamond_dark),
]

# 绘制像素
for x, y, color in pixels:
    rect = patches.Rectangle((x - 0.5, y - 0.5), 1, 1, 
                            linewidth=0, edgecolor='none', 
                            facecolor=color)
    ax.add_patch(rect)

# 设置坐标轴
ax.set_xlim(-0.5, 13)
ax.set_ylim(-0.5, 16)
ax.set_aspect('equal')
ax.axis('off')

plt.title('Diamond Sword')
plt.tight_layout()
plt.show()
