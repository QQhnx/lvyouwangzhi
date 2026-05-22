import numpy as np
import matplotlib.pyplot as plt

def draw_pixel(x, y, color, size=1):
    rect = plt.Rectangle((x - size/2, y - size/2), size, size, color=color)
    plt.gca().add_patch(rect)

# 0=空白, 1=浅青(钻石), 2=棕色(手柄), 3=黑色(轮廓), 4=深青(边框/护手)
# 从左上到右下逐行分析图片：
sword_pattern = [
    [0,0,0,0,0,0,3,4,4,4,4,4],
    [0,0,0,0,0,3,4,1,1,4,4,4],
    [0,0,0,0,3,4,1,1,1,4,4,0],
    [0,0,0,3,4,1,1,1,1,4,0,0],
    [0,0,3,4,1,1,1,1,1,0,0,0],
    [0,3,4,1,1,1,1,1,1,0,0,0],
    [3,4,4,4,4,4,4,4,4,0,0,0],
    [0,0,4,4,2,2,4,4,0,0,0,0],
    [0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,4,4,2,2,4,4,0,0,0,0],
    [0,4,4,2,2,2,2,4,4,0,0,0],
]

colors = {
    0: 'white',
    1: '#00ffff',
    2: '#8B4513',
    3: '#1a1a1a',
    4: '#006666'
}

plt.figure(figsize=(5, 5))

for row_idx, row in enumerate(sword_pattern):
    for col_idx, pixel in enumerate(row):
        if pixel != 0:
            draw_pixel(col_idx, len(sword_pattern)-1-row_idx, colors[pixel])

plt.gca().set_aspect('equal')
plt.title('Minecraft Diamond Sword')
plt.grid(False)
plt.xlim(-0.5, len(sword_pattern[0])-0.5)
plt.ylim(-0.5, len(sword_pattern)-0.5)
plt.axis('off')
plt.show()
