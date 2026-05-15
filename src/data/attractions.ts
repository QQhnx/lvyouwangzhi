import { Attraction } from '../types';

export const attractions: Attraction[] = [
  {
    id: 'foxiang-ge',
    name: '佛香阁',
    tagline: '八面三层四重檐，全园构图中心',
    category: 'building',
    tags: ['标志性建筑', '登高望远', '佛教文化'],
    heroImage: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '佛香阁始建于清乾隆年间，原为九层佛塔。1860年被英法联军焚毁，光绪年间重建为现在的三层阁楼。',
      architecture: '佛香阁高41米，八面三层四重檐攒尖顶，黄色琉璃瓦覆盖。建筑坐落在万寿山前山中心部位，成为全园的构图中心。阁内供奉有铜铸金裹千手观音菩萨。',
      significance: '佛香阁不仅是颐和园的标志性建筑，更是中国古典园林建筑艺术的杰出代表，承载着深厚的佛教文化内涵。登阁远眺，可将昆明湖和十七孔桥尽收眼底。'
    },
    archives: {
      height: '41米',
      builtYear: '光绪十七年（1891年）',
      features: ['八面三层四重檐', '黄色琉璃瓦', '铜铸金裹千手观音', '全园最高点'],
    },
    coordinates: { x: 50, y: 30 },
    relatedIds: ['chang-lang', 'shiqikong-bridge', 'paiyun-dian'],
  },
  {
    id: 'chang-lang',
    name: '长廊',
    tagline: '世界最长画廊，彩画精美绝伦',
    category: 'building',
    tags: ['世界最长', '彩画', '世界文化遗产'],
    heroImage: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '长廊始建于乾隆时期，与万寿山同期建造。1860年被英法联军焚毁，光绪时期重建。全长728米，共273间。',
      architecture: '长廊为穿斗式木结构，卷棚屋顶，黄色琉璃瓦覆顶。廊间设置留佳、寄澜、秋水、清遥四座八角攒尖亭，将长廊分为五段。',
      significance: '长廊以其独特的建筑形式和精美的彩画艺术闻名于世。廊内彩画题材广泛，包括人物、山水、花鸟等14000余幅，被誉为"世界上最长的画廊"。'
    },
    archives: {
      height: '3.5米（檐高）',
      area: '全长728米',
      builtYear: '乾隆十六年（1751年）',
      rebuiltYear: '光绪十二年（1886年）',
      features: ['全长728米', '273间', '14000余幅彩画', '四座八角亭'],
    },
    coordinates: { x: 45, y: 50 },
    relatedIds: ['foxiang-ge', 'shiqikong-bridge', 'paiyun-dian'],
  },
  {
    id: 'shiqikong-bridge',
    name: '十七孔桥',
    tagline: '金光穿洞奇观，十七个桥洞',
    category: 'water',
    tags: ['水景', '桥梁建筑', '金光穿洞'],
    heroImage: 'https://images.unsplash.com/photo-1590041264786-0d8e37ac6ef4?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1590041264786-0d8e37ac6ef4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580974511814-1e6b4a0f6a9a?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '十七孔桥建于清乾隆年间，是昆明湖东岸与南湖岛之间的重要通道。桥长150米，宽8米，是园内最大的石桥。',
      architecture: '桥身采用青石建成，共有17个桥洞。桥栏杆上雕刻有544只形态各异的石狮子。桥头还有两只栩栩如生的铜牛。',
      significance: '十七孔桥是颐和园最具代表性的景观之一。每年冬至前后，夕阳西下时，阳光会穿过所有17个桥洞，形成著名的"金光穿洞"奇观，吸引无数游客和摄影爱好者。'
    },
    archives: {
      height: '7米',
      area: '桥长150米，宽8米',
      builtYear: '乾隆年间',
      features: ['17个桥洞', '544只石狮子', '两只铜牛', '金光穿洞奇观'],
    },
    coordinates: { x: 70, y: 60 },
    relatedIds: ['foxiang-ge', 'chang-lang', 'xiequ-garden'],
  },
  {
    id: 'paiyun-dian',
    name: '排云殿',
    tagline: '慈禧庆寿之所，建筑群宏伟',
    category: 'building',
    tags: ['皇家建筑', '庆典场所', '慈禧太后'],
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '排云殿原名"大报恩延寿寺"，是乾隆为其母亲孝圣宪皇后祝寿而建。1860年被毁，光绪时期重建后改为现名。',
      architecture: '排云殿为重檐歇山顶建筑，黄色琉璃瓦覆盖，彩画精美。殿前有金水河和玉带桥，建筑群依山势层层上升，气势恢宏。',
      significance: '排云殿是颐和园万寿山前山建筑群的主体，是举行重大庆典活动的重要场所。殿名寓意"排除万难，云集吉祥"。'
    },
    archives: {
      height: '20米',
      builtYear: '光绪十二年（1886年）',
      features: ['重檐歇山顶', '黄色琉璃瓦', '12根金柱', '依山而建'],
    },
    coordinates: { x: 55, y: 35 },
    relatedIds: ['foxiang-ge', 'chang-lang', 'yishou-tang'],
  },
  {
    id: 'xiequ-garden',
    name: '谐趣园',
    tagline: '园中之园，荷塘假山精巧布局',
    category: 'garden',
    tags: ['园林精品', '园中之园', '江南风格'],
    heroImage: 'https://images.unsplash.com/photo-1580974511814-1e6b4a0f6a9a?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1580974511814-1e6b4a0f6a9a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590041797636-eec0b58d099f?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '谐趣园始建于乾隆年间，是仿照无锡惠山寄畅园建造的园中之园。1860年被毁，光绪时期重建。',
      architecture: '谐趣园占地约6000平方米，以荷池为中心，周围分布着楼、堂、亭、榭等建筑。园内有百间游廊，曲折幽深。',
      significance: '谐趣园是颐和园中最具江南园林特色的景点，体现了"一峰则太华千寻，一勺则江湖万里"的造园理念。园名寓意"谐趣"，强调园林的趣味性和观赏性。'
    },
    archives: {
      area: '约6000平方米',
      builtYear: '乾隆十六年（1751年）',
      rebuiltYear: '光绪十七年（1891年）',
      features: ['荷池为中心', '百间游廊', '十三座建筑', '江南园林风格'],
    },
    coordinates: { x: 60, y: 70 },
    relatedIds: ['shiqikong-bridge', 'qingyan-fang', 'deheyuan'],
  },
  {
    id: 'qingyan-fang',
    name: '清晏舫（石舫）',
    tagline: '西洋风格石船建筑，中西合璧典范',
    category: 'building',
    tags: ['中西合璧', '独特建筑', '水上建筑'],
    heroImage: 'https://images.unsplash.com/photo-1578469550956-0d16b69c6a3d?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578469550956-0d16b69c6a3d?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '石舫原建于乾隆年间，是一艘石造大船。1860年被毁，光绪时期重建，并加建了西洋风格的楼阁。',
      architecture: '石舫全长36米，用大理石雕造。重建后在石船上建造了西式两层楼阁，采用白色壁柱、黄色玻璃窗和紫色窗户，顶部还建有凉亭。',
      significance: '清晏舫是颐和园中最具特色的建筑之一，代表了清代皇家园林中西合璧的建筑风格。"清晏"寓意"河清海晏"，象征天下太平。'
    },
    archives: {
      height: '9米',
      area: '船长36米',
      builtYear: '乾隆二十年（1755年）',
      rebuiltYear: '光绪十九年（1893年）',
      features: ['石造大船', '西洋风格楼阁', '白色壁柱', '黄色玻璃窗'],
    },
    coordinates: { x: 30, y: 55 },
    relatedIds: ['xiequ-garden', 'yishou-tang', 'chang-lang'],
  },
  {
    id: 'yishou-tang',
    name: '乐寿堂',
    tagline: '慈禧寝宫，庭院玉兰闻名',
    category: 'building',
    tags: ['皇家寝宫', '玉兰名树', '慈禧太后'],
    heroImage: 'https://images.unsplash.com/photo-1590041797636-eec0b58d099f?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1590041797636-eec0b58d099f?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '乐寿堂建于乾隆年间，原为乾隆帝的寝宫。1860年被毁，光绪时期重建后改为慈禧太后的寝宫。',
      architecture: '乐寿堂为七间歇山顶建筑，黄色琉璃瓦覆盖。堂前庭院中有著名的玉兰树，已有200多年历史。堂内陈设保持原状，展示皇家生活场景。',
      significance: '乐寿堂是颐和园中最重要的宫殿建筑之一，见证了清代晚期的宫廷生活。堂前庭院的玉兰树是北京市最古老的玉兰树之一，每年春季花开时节，吸引大量游客前来观赏。'
    },
    archives: {
      builtYear: '乾隆十六年（1751年）',
      rebuiltYear: '光绪十七年（1891年）',
      features: ['七间歇山顶', '百年玉兰树', '皇家寝宫', '原状陈列'],
    },
    coordinates: { x: 40, y: 45 },
    relatedIds: ['paiyun-dian', 'qingyan-fang', 'deheyuan'],
  },
  {
    id: 'deheyuan',
    name: '德和园大戏楼',
    tagline: '清代三大戏台之一，戏曲艺术殿堂',
    category: 'building',
    tags: ['戏曲文化', '清代建筑', '表演艺术'],
    heroImage: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop',
    ],
    cultureContent: {
      history: '德和园大戏楼建于光绪年间，专为慈禧太后观看戏曲而建。与畅音阁、寿膳房并称为清代三大戏楼。',
      architecture: '戏楼为三层建筑，高21米，底层舞台宽17米。顶层设有绞车、索道等机关设备，可以表现升天、入地等戏剧效果。',
      significance: '德和园大戏楼是清代戏曲艺术的重要见证，代表了当时戏剧舞台的最高水平。楼内经常举办传统戏曲演出，让游客感受中国传统戏曲的魅力。'
    },
    archives: {
      height: '21米',
      builtYear: '光绪十七年（1891年）',
      features: ['三层建筑', '宽17米舞台', '机关设备', '清代三大戏楼之一'],
    },
    coordinates: { x: 48, y: 55 },
    relatedIds: ['yishou-tang', 'xiequ-garden', 'paiyun-dian'],
  },
];
