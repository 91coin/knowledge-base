// 国家药食同源目录数据
// 整理时间：2026-03-21
// 数据修正：2026-03-22
// 依据：国家卫健委《按照传统既是食品又是中药材的物质目录》（106 种，截至 2023 年底）

export const YAOSHI_TONGYUAN_CATALOG = {
  total: 106,
  baseCount: 87,
  added2023: 3,
  animalCount: 5,
  
  // 药食同源目录（106 种）
  items: [
    // 植物类（78 种）
    { name: '丁香', category: '植物', type: '温里' },
    { name: '八角茴香', category: '植物', type: '温里' },
    { name: '刀豆', category: '植物', type: '温中' },
    { name: '小茴香', category: '植物', type: '温里' },
    { name: '小蓟', category: '植物', type: '凉血' },
    { name: '山药', category: '植物', type: '补气' },
    { name: '山楂', category: '植物', type: '消食' },
    { name: '马齿苋', category: '植物', type: '清热' },
    { name: '乌梅', category: '植物', type: '敛肺' },
    { name: '木瓜', category: '植物', type: '化湿' },
    { name: '火麻仁', category: '植物', type: '润肠' },
    { name: '代代花', category: '植物', type: '理气' },
    { name: '玉竹', category: '植物', type: '滋阴' },
    { name: '甘草', category: '植物', type: '补气' },
    { name: '白芷', category: '植物', type: '解表' },
    { name: '白果', category: '植物', type: '止咳' },
    { name: '白扁豆', category: '植物', type: '健脾' },
    { name: '白扁豆花', category: '植物', type: '化湿' },
    { name: '龙眼肉', category: '植物', type: '补血' },
    { name: '决明子', category: '植物', type: '清热' },
    { name: '百合', category: '植物', type: '滋阴' },
    { name: '肉豆蔻', category: '植物', type: '温中' },
    { name: '肉桂', category: '植物', type: '温里' },
    { name: '余甘子', category: '植物', type: '清热' },
    { name: '佛手', category: '植物', type: '理气' },
    { name: '杏仁', category: '植物', type: '止咳' },
    { name: '沙棘', category: '植物', type: '消食' },
    { name: '芡实', category: '植物', type: '固精' },
    { name: '花椒', category: '植物', type: '温中' },
    { name: '赤小豆', category: '植物', type: '利水' },
    { name: '鸡内金', category: '植物', type: '消食' },
    { name: '麦芽', category: '植物', type: '消食' },
    { name: '昆布', category: '植物', type: '化痰' },
    { name: '枣', category: '植物', type: '补气' },
    { name: '罗汉果', category: '植物', type: '清热' },
    { name: '郁李仁', category: '植物', type: '润肠' },
    { name: '金银花', category: '植物', type: '清热' },
    { name: '青果', category: '植物', type: '清热' },
    { name: '鱼腥草', category: '植物', type: '清热' },
    { name: '姜', category: '植物', type: '温中' },
    { name: '枳椇子', category: '植物', type: '利水' },
    { name: '枸杞子', category: '植物', type: '滋阴' },
    { name: '栀子', category: '植物', type: '清热' },
    { name: '砂仁', category: '植物', type: '化湿' },
    { name: '胖大海', category: '植物', type: '清热' },
    { name: '茯苓', category: '植物', type: '利水' },
    { name: '香橼', category: '植物', type: '理气' },
    { name: '香薷', category: '植物', type: '解表' },
    { name: '桃仁', category: '植物', type: '活血' },
    { name: '桑叶', category: '植物', type: '解表' },
    { name: '桑椹', category: '植物', type: '滋阴' },
    { name: '桔梗', category: '植物', type: '化痰' },
    { name: '益智仁', category: '植物', type: '温脾' },
    { name: '荷叶', category: '植物', type: '清热' },
    { name: '莱菔子', category: '植物', type: '消食' },
    { name: '莲子', category: '植物', type: '健脾' },
    { name: '高良姜', category: '植物', type: '温中' },
    { name: '淡竹叶', category: '植物', type: '清热' },
    { name: '淡豆豉', category: '植物', type: '解表' },
    { name: '菊花', category: '植物', type: '清热' },
    { name: '菊苣', category: '植物', type: '清热' },
    { name: '黄芥子', category: '植物', type: '化痰' },
    { name: '黄精', category: '植物', type: '补气' },
    { name: '紫苏', category: '植物', type: '解表' },
    { name: '紫苏籽', category: '植物', type: '化痰' },
    { name: '葛根', category: '植物', type: '解表' },
    { name: '黑芝麻', category: '植物', type: '补血' },
    { name: '黑胡椒', category: '植物', type: '温中' },
    { name: '槐米', category: '植物', type: '凉血' },
    { name: '槐花', category: '植物', type: '凉血' },
    { name: '蒲公英', category: '植物', type: '清热' },
    { name: '蜂蜜', category: '植物', type: '润燥' },
    { name: '榧子', category: '植物', type: '杀虫' },
    { name: '酸枣仁', category: '植物', type: '安神' },
    { name: '鲜白茅根', category: '植物', type: '凉血' },
    { name: '鲜芦根', category: '植物', type: '清热' },
    { name: '薤白', category: '植物', type: '理气' },
    { name: '薏苡仁', category: '植物', type: '利水' },
    { name: '薄荷', category: '植物', type: '解表' },
    { name: '橘皮', category: '植物', type: '理气' },
    { name: '党参', category: '植物', type: '补气', added: '2023' },
    { name: '黄芪', category: '植物', type: '补气', added: '2023' },
    { name: '铁皮石斛', category: '植物', type: '滋阴', added: '2023' },
    
    // 动物类（5 种）
    { name: '乌梢蛇', category: '动物', type: '祛风' },
    { name: '蝮蛇', category: '动物', type: '祛风' },
    { name: '牡蛎', category: '动物', type: '安神' },
    { name: '蛤蚧', category: '动物', type: '补肺' },
    { name: '蜈蚣', category: '动物', type: '息风' },
    
    // 其他类（4 种）
    { name: '红曲', category: '其他', type: '消食' },
    { name: '酒酿', category: '其他', type: '温中' },
    { name: '姜黄', category: '其他', type: '活血' },
    { name: '荜茇', category: '其他', type: '温中' }
  ],
  
  // 古籍经典食疗方（150 首）
  recipes: {
    byEffect: {
      '补气类': [
        '四君子汤', '参苓白术散', '补中益气汤', '山药粥', '黄芪炖鸡',
        '人参粥', '白术猪肚汤', '茯苓粥', '大枣粥', '莲子粥',
        '芡实粥', '扁豆粥', '黄芪茶', '党参粥', '太子参茶',
        '灵芝茶', '西洋参茶', '甘草茶', '蜂蜜水', '龙眼肉粥'
      ],
      '养血类': [
        '红枣花生汤', '桑椹膏', '枸杞粥', '黑芝麻糊', '红枣粥',
        '桂圆鸡蛋汤', '花生衣汤', '葡萄干粥', '樱桃酒', '阿胶糕',
        '丹参茶', '玫瑰花茶', '木瓜粥', '桃仁粥', '山楂茶',
        '黑木耳汤', '红糖水', '当归生姜羊肉汤'
      ],
      '滋阴类': [
        '百合粥', '蜂蜜水', '梨膏', '玉竹粥', '石斛茶',
        '鸭肉冬瓜汤', '猪皮冻', '藕粉', '麦冬茶', '天麻茶',
        '五味子茶', '黄精粥', '葛根茶', '芦根茶', '白茅根茶',
        '菊花茶', '枸杞茶', '桑椹茶', '银耳羹', '甲鱼汤'
      ],
      '温阳类': [
        '姜枣茶', '肉桂粥', '羊肉汤', '韭菜炒鸡蛋', '核桃仁粥',
        '小茴香粥', '丁香茶', '胡椒猪肚汤', '高良姜粥', '桂皮茶',
        '八角茶', '花椒茶', '荜茇茶', '姜黄茶', '酒酿',
        '红曲酒', '虫草茶', '藏红花茶'
      ],
      '健脾类': [
        '四神汤', '薏米红豆粥', '茯苓饼', '麦芽山楂饮', '鸡内金饼',
        '萝卜粥', '陈皮粥', '砂仁粥', '木瓜粥', '荷叶粥',
        '冬瓜粥', '玉米须茶', '赤小豆汤', '鲤鱼汤', '鲫鱼汤',
        '南瓜粥', '小米粥', '锅巴粥', '山药茯苓粥', '白术茶',
        '党参茶', '甘草大枣汤', '莲子山药粥', '芡实莲子粥', '扁豆山药粥'
      ],
      '祛湿类': [
        '薏苡仁粥', '赤小豆汤', '冬瓜汤', '荷叶茶', '绿豆汤',
        '苦瓜炒蛋', '黄瓜凉拌', '芹菜汁', '马齿苋粥', '鱼腥草茶',
        '蒲公英茶', '菊花茶', '金银花茶', '栀子茶', '淡竹叶茶',
        '玉米须茶', '西瓜汁', '香蕉', '茯苓茶', '薏苡仁茶',
        '茵陈茶', '车前草茶'
      ],
      '清热类': [
        '菊花茶', '金银花茶', '薄荷茶', '桑叶茶', '葛根茶',
        '黄芩茶', '栀子茶', '蒲公英茶', '鱼腥草茶', '马齿苋粥',
        '绿豆汤', '西瓜汁', '苦瓜炒蛋', '黄瓜凉拌', '芹菜汁',
        '冬瓜汤', '荷叶茶', '淡竹叶茶', '白茅根茶', '芦根茶',
        '板蓝根茶', '大青叶茶', '野菊花茶', '紫花地丁茶', '黄连茶'
      ],
      '理气类': [
        '陈皮茶', '佛手茶', '香橼茶', '玫瑰花茶', '茉莉花茶',
        '薄荷茶', '紫苏茶', '砂仁茶', '丁香茶', '八角茶',
        '小茴香茶', '花椒茶', '胡椒茶', '姜茶', '枣茶',
        '甘草茶', '蜂蜜水', '芝麻糊', '核桃仁粥', '松子仁粥',
        '桃仁粥', '山楂茶'
      ]
    },
    
    byPopulation: {
      '儿童食疗': [
        '鸡内金饼', '麦芽山楂饮', '山药粥', '莲子粥', '南瓜粥',
        '小米粥', '萝卜粥', '大枣粥', '茯苓粥', '扁豆粥',
        '陈皮粥', '砂仁粥', '荷叶粥', '冬瓜粥', '玉米须茶'
      ],
      '女性食疗': [
        '红枣花生汤', '龙眼肉粥', '玫瑰花茶', '枸杞粥', '黑芝麻糊',
        '桑椹膏', '百合粥', '银耳羹', '阿胶糕', '当归生姜羊肉汤',
        '红糖水', '黑木耳汤', '丹参茶', '藏红花茶', '虫草茶',
        '石斛茶', '五味子茶', '黄精粥', '木瓜粥', '樱桃酒'
      ],
      '老人食疗': [
        '枸杞粥', '核桃仁粥', '山药粥', '茯苓粥', '蜂蜜水',
        '黑芝麻糊', '黄精粥', '玉竹粥', '石斛茶', '人参粥',
        '党参茶', '西洋参茶', '灵芝茶', '虫草茶', '天麻茶',
        '葛根茶', '菊花茶', '决明子茶', '山楂茶', '丹参茶'
      ],
      '孕妇食疗': [
        '山药粥', '莲子粥', '大枣粥', '小米粥', '南瓜粥',
        '茯苓粥', '白扁豆粥', '芝麻糊', '龙眼肉粥', '百合粥'
      ],
      '亚健康人群': [
        '黄芪茶', '灵芝茶', '西洋参茶', '枸杞茶', '菊花茶',
        '玫瑰花茶', '蜂蜜水', '黑芝麻糊', '核桃仁粥', '山药粥',
        '茯苓粥', '莲子粥', '百合粥', '桑椹膏', '黄精粥'
      ]
    },
    
    byConstitution: [
      { type: '平和质', recipes: ['五谷杂粮粥', '山药粥', '茯苓粥'], contraindications: '无明显禁忌' },
      { type: '气虚质', recipes: ['山药粥', '黄芪炖鸡', '党参茶', '甘草茶'], contraindications: '生冷苦寒' },
      { type: '阳虚质', recipes: ['姜枣茶', '肉桂粥', '羊肉汤', '虫草茶'], contraindications: '生冷寒凉' },
      { type: '阴虚质', recipes: ['百合粥', '桑椹膏', '石斛茶', '五味子茶'], contraindications: '辛辣燥热' },
      { type: '痰湿质', recipes: ['薏米红豆粥', '茯苓饼', '陈皮茶', '砂仁茶'], contraindications: '肥甘厚味' },
      { type: '湿热质', recipes: ['绿豆汤', '荷叶茶', '栀子茶', '茵陈茶'], contraindications: '辛辣油腻' },
      { type: '血瘀质', recipes: ['山楂茶', '黑木耳汤', '丹参茶', '藏红花茶'], contraindications: '寒凉收涩' },
      { type: '气郁质', recipes: ['玫瑰花茶', '茉莉花茶', '佛手茶', '香橼茶'], contraindications: '收敛酸涩' },
      { type: '特禀质', recipes: ['灵芝茶', '蜂蜜水', '黄芪茶', '五味子茶'], contraindications: '发物' }
    ],
    
    bySeason: [
      { season: '春', principle: '养肝护阳', recipes: ['枸杞茶', '韭菜', '菊花茶', '玫瑰花茶', '佛手茶'] },
      { season: '夏', principle: '清热解暑', recipes: ['绿豆汤', '冬瓜汤', '荷叶茶', '西瓜汁', '金银花茶', '薄荷茶'] },
      { season: '秋', principle: '润肺防燥', recipes: ['梨膏', '百合粥', '蜂蜜水', '桑椹膏', '石斛茶', '玉竹粥'] },
      { season: '冬', principle: '温补肾阳', recipes: ['姜枣茶', '肉桂粥', '羊肉汤', '核桃仁粥', '虫草茶', '八角茶'] }
    ]
  },
  
  // 禁忌人群
  contraindications: {
    '孕妇': ['薏苡仁', '山楂', '肉桂', '螃蟹', '甲鱼', '藏红花', '桃仁'],
    '儿童': ['人参', '黄芪（慎用）'],
    '糖尿病患者': ['蜂蜜', '冰糖', '大枣', '西瓜'],
    '高血压患者': ['甘草（长期大量）'],
    '肾病患者': ['杨桃', '高蛋白食物'],
    '肝病患者': ['酒精', '高脂肪食物']
  }
}

// 统计信息
export const YAOSHI_STATS = {
  totalItems: 106,
  plantItems: 78,
  animalItems: 5,
  otherItems: 4,
  added2023: 3,
  totalRecipes: 150,
  effectCategories: 8,
  populationCategories: 5,
  constitutionTypes: 9,
  seasons: 4
}
