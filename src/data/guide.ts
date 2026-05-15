import { GuideItem } from '../types';

export const guideItems: GuideItem[] = [
  // 交通类
  {
    id: 'metro',
    title: '地铁线路',
    description: '乘坐地铁4号线在西苑站或北宫门站下车，步行即可到达颐和园。',
    category: 'transport',
    icon: 'Train',
    details: [
      '4号线西苑站下车，从北宫门进入',
      '4号线北宫门站下车，从北宫门进入',
      '西苑站距离北宫门约800米',
      '建议从北宫门进入，游览更顺畅',
    ],
  },
  {
    id: 'bus',
    title: '公交线路',
    description: '多条公交线路可达颐和园各门口，方便快捷。',
    category: 'transport',
    icon: 'Bus',
    details: [
      '西宫门：469路、539路',
      '北宫门：303路、331路、346路、375路',
      '东宫门：74路、374路、437路',
      '新建宫门：74路、374路、437路',
    ],
  },
  {
    id: 'parking',
    title: '自驾停车',
    description: '园内设有多个停车场，但节假日停车位紧张，建议公共交通出行。',
    category: 'transport',
    icon: 'Car',
    details: [
      '北宫门停车场：约300个车位',
      '西宫门停车场：约200个车位',
      '平日停车费：10元/小时',
      '节假日可能限流，建议早到',
    ],
  },
  {
    id: 'ticket-info',
    title: '门票信息',
    description: '颐和园门票价格及开放时间详情。',
    category: 'transport',
    icon: 'Ticket',
    details: [
      '旺季（4月-10月）：门票30元，联票60元',
      '淡季（11月-3月）：门票20元，联票50元',
      '开放时间：6:30-18:00（旺季）',
      '建议购买联票，可参观佛香阁等景点',
    ],
  },

  // 美食类
  {
    id: 'inside-food',
    title: '园内餐饮',
    description: '颐和园内有多个餐饮服务点，提供各类美食。',
    category: 'food',
    icon: 'Utensils',
    details: [
      '听鹂馆：高端宫廷菜，人均约300元',
      '石舫快餐：简餐、小吃',
      '长廊茶馆：茶点、休闲',
      '建议自带干粮，景区内价格较高',
    ],
  },
  {
    id: 'surrounding-food',
    title: '周边美食',
    description: '颐和园周边有多家特色餐厅和茶馆。',
    category: 'food',
    icon: 'Coffee',
    details: [
      '北宫门外：各种小吃、快餐',
      '西苑商圈：火锅、烤鱼等',
      '颐和园路：老北京炸酱面',
      '建议品尝附近的京味小吃',
    ],
  },
  {
    id: 'imperial-cuisine',
    title: '宫廷小吃',
    description: '体验传统宫廷风味的小吃美食。',
    category: 'food',
    icon: 'Cake',
    details: [
      '豌豆黄：传统宫廷点心',
      '驴打滚：老北京名吃',
      '艾窝窝：糯米制品',
      '芸豆卷：精致小点',
    ],
  },

  // 住宿类
  {
    id: 'hotels',
    title: '周边酒店',
    description: '颐和园周边有多家中高档酒店可供选择。',
    category: 'accommodation',
    icon: 'Building2',
    details: [
      '颐和园酒店：四星级，近北宫门',
      '北京友谊宾馆：五星级，中关村',
      '如家快捷：经济型，适合背包客',
      '建议提前预订，尤其节假日',
    ],
  },
  {
    id: 'boutique-inns',
    title: '特色民宿',
    description: '体验老北京胡同文化的特色民宿。',
    category: 'accommodation',
    icon: 'Home',
    details: [
      '四合院民宿：体验老北京生活',
      '胡同客栈：文艺青年首选',
      '建议选择地铁沿线，交通便利',
      '民宿体验更深入当地文化',
    ],
  },

  // 特产类
  {
    id: 'cultural-products',
    title: '文创产品',
    description: '颐和园官方文创商店出售各类特色纪念品。',
    category: 'souvenirs',
    icon: 'Gift',
    details: [
      '地点：东宫门、北宫门均有',
      '特色：颐和园主题冰箱贴、书签',
      '服饰：带有颐和园元素的丝巾、披肩',
      '文房四宝：传统书法用品套装',
    ],
  },
  {
    id: 'specialties',
    title: '特色纪念品',
    description: '具有北京和颐和园特色的纪念品。',
    category: 'souvenirs',
    icon: 'ShoppingBag',
    details: [
      '书签、明信片：颐和园风景',
      '茶叶：茉莉花茶、龙井',
      '工艺品：景泰蓝、绢人',
      '建议在园内官方商店购买',
    ],
  },
  {
    id: 'tea-culture',
    title: '茶文化',
    description: '体验中国传统茶文化，购买优质茶叶。',
    category: 'souvenirs',
    icon: 'Coffee',
    details: [
      '茉莉花茶：北京特色',
      '碧螺春：江南名茶',
      '普洱茶：越陈越香',
      '长廊茶馆可品茶休息',
    ],
  },
];

export const faqItems = [
  {
    question: '颐和园最佳游览时间是什么时候？',
    answer: '春秋两季最佳。春季（3-4月）桃花盛开，秋季（9-11月）秋高气爽，尤其秋分前后的"金光穿洞"不可错过。建议避开节假日高峰。',
  },
  {
    question: '游览颐和园需要多长时间？',
    answer: '完整游览需要4-6小时。建议早起入园，从北宫门进入，先游后山，再至前山，可以避开人流高峰。',
  },
  {
    question: '可以带食物和饮料入园吗？',
    answer: '可以自带食物和饮料入园。建议携带一些干粮和水，园内餐饮价格较高。但请勿在文物建筑附近食用。',
  },
  {
    question: '需要提前预约吗？',
    answer: '目前无需预约。建议关注官方公告了解最新入园政策。节假日人流较大，建议提前做好规划。',
  },
  {
    question: '园内有哪些景点是必看的？',
    answer: '必看景点包括：佛香阁（需另外购票）、长廊、十七孔桥、谐趣园、石舫、排云殿等。建议根据时间合理安排游览路线。',
  },
  {
    question: '有轮椅租赁服务吗？',
    answer: '园内提供轮椅和婴儿车租赁服务。轮椅租金50元/次，婴儿车租金30元/次。需押金和身份证。',
  },
];
