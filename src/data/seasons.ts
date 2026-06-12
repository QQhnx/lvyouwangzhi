import { Season } from '../types';

export const seasons: Season[] = [
  {
    id: 'spring',
    name: '春',
    nameEn: 'Spring',
    description: '春回大地，万物复苏。颐和园的春天是一幅生机盎然的画卷，西堤两岸桃红柳绿，昆明湖冰消雪融，知春亭畔山桃绽放，处处洋溢着春的气息。',
    highlights: [
      {
        title: '西堤桃柳',
        description: '西堤两岸桃红柳绿，桃花盛开时节宛若仙境。堤上六桥造型各异，与桃柳相映成趣。',
        image: '/春.jpg',
      },
      {
        title: '知春亭山桃',
        description: '知春亭周围的山桃树已有百年历史，春季花开时节，满树繁花，美不胜收。',
        image: '/春.jpg',
      },
      {
        title: '昆明湖冰消',
        description: '春季气温回升，昆明湖冰面逐渐消融，湖光山色重新焕发生机。',
        image: '/春.jpg',
      },
    ],
    bestTime: '3月下旬至4月中旬',
    photographyTips: [
      '清晨拍摄西堤桃花，光线柔和',
      '知春亭山桃与佛香阁同框',
      '使用长焦镜头捕捉昆明湖倒影',
      '关注水面冰裂纹理',
    ],
  },
  {
    id: 'summer',
    name: '夏',
    nameEn: 'Summer',
    description: '夏日炎炎，颐和园却是一片清凉世界。谐趣园的荷花亭亭玉立，昆明湖上泛舟消暑，长廊听雨别有情趣，是避暑纳凉的绝佳去处。',
    highlights: [
      {
        title: '谐趣园荷花',
        description: '谐趣园荷塘中荷花盛开，粉白相间，清香四溢。荷叶田田，鱼戏莲叶间。',
        image: '/夏.jpg',
      },
      {
        title: '昆明湖泛舟',
        description: '夏季可以乘坐龙舟或游船游览昆明湖，从湖面欣赏万寿山和佛香阁的壮丽景色。',
        image: '/昆明湖畔.jpg',
      },
      {
        title: '长廊听雨',
        description: '雨天漫步长廊，听雨打廊檐，别有一番意境。雨中长廊彩画更显灵动。',
        image: '/长廊内部视角.jpg',
      },
    ],
    bestTime: '6月至8月',
    photographyTips: [
      '拍摄荷花使用微距镜头',
      '雨后长廊更显灵动',
      '泛舟湖上拍摄佛香阁倒影',
      '注意防暑，随身携带水和遮阳用品',
    ],
  },
  {
    id: 'autumn',
    name: '秋',
    nameEn: 'Autumn',
    description: '秋高气爽，颐和园换上金秋盛装。万寿山层林尽染，满园桂花飘香，十七孔桥迎来一年中最美的"金光穿洞"时刻。',
    highlights: [
      {
        title: '万寿山丹枫',
        description: '秋天万寿山的枫叶红了，层层叠叠，色彩斑斓，与古建筑相映成趣。',
        image: '/秋.png',
      },
      {
        title: '满园桂香',
        description: '秋季桂花盛开，满园飘香。乐寿堂前的古玉兰树在秋天也格外静美。',
        image: '/秋.png',
      },
      {
        title: '金光穿洞',
        description: '每年秋分前后，夕阳西下时，阳光穿过十七孔桥的所有桥洞，形成著名的"金光穿洞"奇观。',
        image: '/秋.png',
      },
    ],
    bestTime: '9月下旬至11月中旬',
    photographyTips: [
      '金光穿洞最佳拍摄时间：秋分前后下午4点左右',
      '万寿山红叶使用广角镜头',
      '早晨拍摄晨雾中的佛香阁',
      '带上三脚架拍摄长曝光',
    ],
  },
  {
    id: 'winter',
    name: '冬',
    nameEn: 'Winter',
    description: '冬日的颐和园银装素裹，分外妖娆。佛香阁在雪景中更显庄严，昆明湖冰场欢声笑语，踏雪寻梅别有情趣。',
    highlights: [
      {
        title: '佛香阁雪景',
        description: '雪后的佛香阁红墙金瓦白雪，色彩鲜明，宛如一幅中国水墨画。',
        image: '/冬.jpg',
      },
      {
        title: '昆明湖冰场',
        description: '冬季昆明湖结冰后开放冰场，可以体验滑冰、冰车等冰雪运动。',
        image: '/冬.jpg',
      },
      {
        title: '踏雪寻梅',
        description: '雪天漫步园中，脚下积雪咯吱作响，别有一番情趣。乐寿堂前的玉兰树也是赏雪的好去处。',
        image: '/冬.jpg',
      },
    ],
    bestTime: '12月至2月',
    photographyTips: [
      '雪后清晨是最佳拍摄时机',
      '注意防寒保暖',
      '拍摄佛香阁雪景使用偏振镜',
      '冰面倒影同样精彩',
    ],
  },
];
