// 方剂库统计数据
// 更新时间：2026/3/23 08:28:20

export const RECIPE_STATS = {
  total: 101401,
  datasets: {
    '84212': 84212,
    'yaoshi-tongyuan': 17189
  },
  topSources: [
    { name: '《北京市中药成方选集》', count: 475 },
    { name: '《中医皮肤病学简编》', count: 343 },
    { name: '《青囊秘传》', count: 289 },
    { name: '《医学入门》卷七', count: 282 },
    { name: '《重订通俗伤寒论》', count: 270 },
    { name: '《仙拈集》卷二', count: 259 },
    { name: '《景岳全书》卷五十一', count: 251 },
    { name: '《慈禧光绪医方选议》', count: 250 },
    { name: '《医学入门》卷八', count: 227 },
    { name: '《圣惠》卷八十四', count: 225 }
  ],
  topTags: [
    { name: '药食同源', count: 17189 },
    { name: '食疗', count: 17189 },
    { name: '补气', count: 3903 },
    { name: '养血', count: 3827 },
    { name: '祛湿', count: 3623 },
    { name: '温阳', count: 2070 },
    { name: '滋阴', count: 1184 },
    { name: '伤寒论', count: 903 },
    { name: '温里', count: 748 },
    { name: '解表', count: 744 }
  ]
}

export const DATASETS = [
  {
    id: '84212',
    name: '84,212 首经典方剂库',
    description: '收录《北京市中药成方选集》《中医皮肤病学简编》《青囊秘传》《医学入门》《圣惠方》等经典医籍',
    count: 84212,
    color: '#667eea',
    icon: '📚'
  },
  {
    id: 'yaoshi-tongyuan',
    name: '药食同源方剂库',
    description: '国家卫健委公布的药食同源物质组成的食疗方剂',
    count: 17189,
    color: '#27ae60',
    icon: '🌿'
  }
]

export const TOP_SOURCES = RECIPE_STATS.topSources
export const TOP_TAGS = RECIPE_STATS.topTags

// 示例方剂
export const SAMPLE_RECIPES_84212 = [
  {
    id: 'recipe_sample_1',
    title: '八味丸',
    source: '《魏氏家藏方》',
    content: '【组成】熟地黄、山茱萸、山药、泽泻、牡丹皮、茯苓、桂枝、附子。【功效】温补肾阳。【主治】肾阳不足证。',
    effects: '温补肾阳，填精益髓',
    tags: ['补益剂', '温阳', '补肾']
  },
  {
    id: 'recipe_sample_2',
    title: '加味二陈汤',
    source: '《普济方》',
    content: '【组成】陈皮、半夏、茯苓、甘草、生姜、乌梅。【功效】燥湿化痰，理气和中。【主治】湿痰咳嗽。',
    effects: '燥湿化痰，理气和中',
    tags: ['祛痰剂', '化痰', '理气']
  }
]

export const SAMPLE_RECIPES_YAOSHI = [
  {
    id: 'yaoshi_sample_1',
    title: '山药薏米粥',
    source: '民间食疗方',
    content: '【组成】山药 30g、薏米 30g、大米 50g。【功效】健脾祛湿。【主治】脾虚湿盛。',
    effects: '健脾祛湿，益气养阴',
    tags: ['药食同源', '食疗', '健脾', '祛湿']
  },
  {
    id: 'yaoshi_sample_2',
    title: '枸杞菊花茶',
    source: '《本草纲目》',
    content: '【组成】枸杞 10g、菊花 5g。【功效】滋补肝肾，清肝明目。【主治】肝肾阴虚，目暗不明。',
    effects: '滋补肝肾，清肝明目',
    tags: ['药食同源', '食疗', '滋阴', '明目']
  }
]
