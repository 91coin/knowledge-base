// 方剂数据加载模块
// 支持从 JSON 文件动态加载 10 万 + 方剂数据

export interface Recipe {
  id: number | string
  name?: string
  title?: string
  composition?: string
  content?: string
  source: string
  effects?: string
  preparation?: string
  usage?: string
  cautions?: string
  tags?: string[]
  category?: string
  dataset?: string
}

// 懒加载完整方剂数据
export async function loadAllRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch('/data/formulas.min.json')
    const data = await response.json()
    return data.formulas || []
  } catch (error) {
    console.error('加载方剂数据失败:', error)
    return []
  }
}

// 搜索方剂
export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  if (!query.trim()) return recipes
  
  const q = query.toLowerCase().trim()
  return recipes.filter(recipe => 
    recipe.name?.toLowerCase().includes(q) ||
    recipe.title?.toLowerCase().includes(q) ||
    recipe.composition?.toLowerCase().includes(q) ||
    recipe.content?.toLowerCase().includes(q) ||
    recipe.effects?.toLowerCase().includes(q) ||
    recipe.source.toLowerCase().includes(q) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(q))
  )
}

// 按分类筛选
export function filterByCategory(recipes: Recipe[], category: string): Recipe[] {
  if (!category) return recipes
  return recipes.filter(recipe => recipe.category === category)
}

// 按来源筛选
export function filterBySource(recipes: Recipe[], source: string): Recipe[] {
  if (!source) return recipes
  return recipes.filter(recipe => recipe.source.includes(source))
}

// 获取统计信息
export function getRecipeStats(recipes: Recipe[]) {
  const stats = {
    total: recipes.length,
    bySource: {} as Record<string, number>,
    topSources: [] as { name: string; count: number }[],
  }
  
  // 统计来源
  recipes.forEach(recipe => {
    const source = recipe.source.split('》')[0] + '》'
    stats.bySource[source] = (stats.bySource[source] || 0) + 1
  })
  
  // Top 来源
  stats.topSources = Object.entries(stats.bySource)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
  
  return stats
}
