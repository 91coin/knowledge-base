// 84,212 首方剂数据
// 数据来源：方剂 84212a.xlsx (37,839 首) + 方剂 84212b.xlsx (46,373 首)
// 处理时间：2026-03-23

export const RECIPE_84212_STATS = {
  total: 84212,
  fileA: 37839,
  fileB: 46373,
  topSources: [
    { name: '《北京市中药成方选集》', count: 426 },
    { name: '《中医皮肤病学简编》', count: 314 },
    { name: '《青囊秘传》', count: 265 },
    { name: '《医学入门》卷七', count: 234 },
    { name: '《重订通俗伤寒论》', count: 213 },
    { name: '《圣惠》卷八十五', count: 208 },
    { name: '《医学入门》卷八', count: 202 },
    { name: '《慈禧光绪医方选议》', count: 200 },
    { name: '《仙拈集》卷二', count: 192 },
    { name: '《圣惠》卷八十四', count: 176 },
  ],
  topHerbs: [
    { name: '甘草', count: 26165 },
    { name: '当归', count: 16236 },
    { name: '人参', count: 14123 },
    { name: '茯苓', count: 13917 },
    { name: '白术', count: 10369 },
    { name: '防风', count: 8621 },
    { name: '黄芩', count: 7864 },
    { name: '黄连', count: 7462 },
    { name: '大黄', count: 7201 },
    { name: '半夏', count: 7119 },
  ]
}

// 示例数据（用于演示，完整数据从 JSON 文件加载）
export const SAMPLE_RECIPES = [
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
  },
  {
    id: 'recipe_sample_3',
    title: '金银花散',
    source: '《卫生宝鉴》',
    content: '【组成】金银花、连翘、蒲公英、紫花地丁。【功效】清热解毒，消肿散结。【主治】痈疮疖肿。',
    effects: '清热解毒，消肿散结',
    tags: ['清热剂', '解毒', '消肿']
  },
  {
    id: 'recipe_sample_4',
    title: '大腹皮丸',
    source: '《圣惠》',
    content: '【组成】大腹皮、木香、青皮、陈皮、厚朴。【功效】行气导滞，消胀除满。【主治】气滞腹胀。',
    effects: '行气导滞，消胀除满',
    tags: ['理气剂', '消胀', '行气']
  },
  {
    id: 'recipe_sample_5',
    title: '枳朴汤',
    source: '《古今医彻》',
    content: '【组成】枳实、厚朴、大黄、芒硝。【功效】行气通便，泻热攻下。【主治】阳明腑实证。',
    effects: '行气通便，泻热攻下',
    usage: '水煎服，日 1 剂',
    caution: '体虚者慎用',
    tags: ['泻下剂', '通便', '攻下']
  },
  {
    id: 'recipe_sample_6',
    title: '乌犀丸',
    source: '《圣惠》',
    content: '【组成】乌犀角、朱砂、牛黄、麝香。【功效】清热解毒，开窍醒神。【主治】热病神昏。',
    effects: '清热解毒，开窍醒神',
    tags: ['开窍剂', '解毒', '醒神']
  },
  {
    id: 'recipe_sample_7',
    title: '沃雪滚痰丸',
    source: '《幼科金针》',
    content: '【组成】大黄、黄芩、礞石、沉香。【功效】泻火逐痰。【主治】实热老痰证。',
    effects: '泻火逐痰',
    usage: '每服 3-6g，温开水送下',
    caution: '孕妇忌用，体虚者慎用',
    tags: ['祛痰剂', '泻火', '逐痰']
  }
]

// 按来源分类的数据文件列表
export const RECIPE_FILES_BY_SOURCE = [
  { source: '北京市中药成方选集', file: 'recipes-北京市中药成方选集。.json', count: 426 },
  { source: '中医皮肤病学简编', file: 'recipes-中医皮肤病学简编。.json', count: 314 },
  { source: '青囊秘传', file: 'recipes-青囊秘传。.json', count: 265 },
  { source: '医学入门卷七', file: 'recipes-医学入门卷七。.json', count: 234 },
  { source: '重订通俗伤寒论', file: 'recipes-重订通俗伤寒论。.json', count: 213 },
  { source: '圣惠卷八十五', file: 'recipes-圣惠卷八十五。.json', count: 208 },
  { source: '医学入门卷八', file: 'recipes-医学入门卷八。.json', count: 202 },
  { source: '慈禧光绪医方选议', file: 'recipes-慈禧光绪医方选议。.json', count: 200 },
  { source: '仙拈集卷二', file: 'recipes-仙拈集卷二。.json', count: 192 },
  { source: '圣惠卷八十四', file: 'recipes-圣惠卷八十四。.json', count: 176 },
]
