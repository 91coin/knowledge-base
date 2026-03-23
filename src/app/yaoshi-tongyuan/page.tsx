'use client'

import { useState, useMemo, useEffect } from 'react'

// ============ 类型定义 ============
interface YaoshiItem {
  name: string
  pinyin: string
  category: string
  added?: string
}

interface Recipe {
  name: string
  ingredients: string[]
  effect: string
  note?: string
}

interface RecipeGroup {
  name: string
  count: number
  recipes: Recipe[]
}

// ============ 工具函数 ============
const formatCount = (num: number): string => num.toLocaleString('zh-CN')

// ============ 样式 ============
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 50%, #f0f9ff 100%)',
    padding: '0',
  },
  header: {
    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    color: 'white',
    padding: '48px 24px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 24px rgba(217, 119, 6, 0.3)',
  },
  title: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  subtitle: {
    fontSize: '18px',
    opacity: 0.95,
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    marginTop: '24px',
    flexWrap: 'wrap' as const,
  },
  statCard: {
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '16px 32px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'block',
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9,
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    padding: '24px',
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  navButton: (active: boolean) => ({
    padding: '12px 24px',
    background: active ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' : 'white',
    color: active ? 'white' : '#374151',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    boxShadow: active ? '0 4px 12px rgba(217, 119, 6, 0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
  }),
  section: {
    padding: '48px 24px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sectionDesc: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '32px',
    lineHeight: 1.6,
  },
  catalogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '48px',
  },
  categoryCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    border: '1px solid #f3f4f6',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '2px solid #f3f4f6',
  },
  categoryName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  categoryCount: {
    fontSize: '14px',
    color: '#6b7280',
    background: '#f3f4f6',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  itemList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  itemTag: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    color: '#92400e',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #fcd34d',
  },
  itemTagNew: {
    background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    color: '#166534',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #86efac',
    position: 'relative' as const,
  },
  newBadge: {
    position: 'absolute' as const,
    top: '-8px',
    right: '-8px',
    background: '#ef4444',
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '2px 6px',
    borderRadius: '10px',
  },
  recipeSection: {
    marginBottom: '48px',
  },
  recipeGroupTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingBottom: '12px',
    borderBottom: '2px solid #e5e7eb',
  },
  recipeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  recipeCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    border: '1px solid #f3f4f6',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  recipeName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  recipeEffect: {
    fontSize: '14px',
    color: '#059669',
    fontWeight: '600',
    marginBottom: '12px',
    padding: '6px 12px',
    background: '#d1fae5',
    borderRadius: '8px',
    display: 'inline-block',
  },
  recipeIngredients: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: 1.8,
    marginBottom: '12px',
  },
  recipeNote: {
    fontSize: '13px',
    color: '#6b7280',
    fontStyle: 'italic',
    padding: '8px 12px',
    background: '#f9fafb',
    borderRadius: '8px',
    marginTop: '12px',
  },
  warningBox: {
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    border: '2px solid #ef4444',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '32px',
  },
  warningTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  warningList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  warningTag: {
    background: 'white',
    color: '#dc2626',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ef4444',
  },
  constitutionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  constitutionCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    border: '1px solid #f3f4f6',
  },
  constitutionName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  },
  constitutionDesc: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '16px',
    lineHeight: 1.6,
  },
  constitutionSection: {
    marginBottom: '12px',
  },
  constitutionLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px',
  },
  constitutionItems: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
  },
  constitutionItem: {
    fontSize: '13px',
    padding: '4px 10px',
    borderRadius: '6px',
    background: '#f3f4f6',
    color: '#374151',
  },
  constitutionItemAvoid: {
    fontSize: '13px',
    padding: '4px 10px',
    borderRadius: '6px',
    background: '#fee2e2',
    color: '#dc2626',
  },
  backToHome: {
    position: 'fixed' as const,
    bottom: '32px',
    right: '32px',
    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    boxShadow: '0 4px 16px rgba(217, 119, 6, 0.4)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    zIndex: 1000,
  },
} as const

// ============ 主组件 ============
export default function YaoshiTongyuanPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'recipes' | 'constitution' | 'season'>('catalog')
  const [yaoshiData, setYaoshiData] = useState<any>(null)
  const [recipesData, setRecipesData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [yaoshiRes, recipesRes] = await Promise.all([
          fetch('/data/yaoshi-tongyuan-106.json'),
          fetch('/data/yaoshi-tongyuan-recipes-150.json')
        ])
        const yaoshi = await yaoshiRes.json()
        const recipes = await recipesRes.json()
        setYaoshiData(yaoshi)
        setRecipesData(recipes)
        setIsLoading(false)
      } catch (error) {
        console.error('加载药食同源数据失败:', error)
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // 统计数据
  const stats = useMemo(() => ({
    totalItems: yaoshiData?.meta?.totalCount || 106,
    plantCount: yaoshiData?.categories?.plant?.count || 78,
    animalCount: yaoshiData?.categories?.animal?.count || 5,
    otherCount: yaoshiData?.categories?.other?.count || 4,
    recipeCount: recipesData?.meta?.totalCount || 150,
  }), [yaoshiData, recipesData])

  // 加载状态
  if (isLoading || !yaoshiData || !recipesData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 50%, #f0f9ff 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'pulse 2s ease-in-out infinite' }}>🍲</div>
          <div style={{ fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>正在加载药食同源数据...</div>
        </div>
      </div>
    )
  }

  // 渲染目录标签
  const renderCatalog = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        📜 国家药食同源目录
        <span style={{ fontSize: '16px', fontWeight: 'normal', color: '#6b7280' }}>
          （{stats.totalItems}种）
        </span>
      </h2>
      <p style={styles.sectionDesc}>
        依据国家卫健委《按照传统既是食品又是中药材的物质目录》（截至 2023 年底）
      </p>

      {/* 植物类 */}
      <div style={styles.catalogGrid}>
        <div style={styles.categoryCard}>
          <div style={styles.categoryHeader}>
            <span style={styles.categoryName}>🌿 植物类</span>
            <span style={styles.categoryCount}>{stats.plantCount}种</span>
          </div>
          <div style={styles.itemList}>
            {yaoshiData.categories.plant.items.map((item: YaoshiItem) => (
              <span 
                key={item.name} 
                style={item.added === '2023' ? styles.itemTagNew : styles.itemTag}
              >
                {item.name}
                {item.added === '2023' && <span style={styles.newBadge}>新</span>}
              </span>
            ))}
          </div>
        </div>

        {/* 动物类 */}
        <div style={styles.categoryCard}>
          <div style={styles.categoryHeader}>
            <span style={styles.categoryName}>🐾 动物类</span>
            <span style={styles.categoryCount}>{stats.animalCount}种</span>
          </div>
          <div style={styles.itemList}>
            {yaoshiData.categories.animal.items.map((item: YaoshiItem) => (
              <span key={item.name} style={styles.itemTag}>
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* 其他类 */}
        <div style={styles.categoryCard}>
          <div style={styles.categoryHeader}>
            <span style={styles.categoryName}>🍶 其他类</span>
            <span style={styles.categoryCount}>{stats.otherCount}种</span>
          </div>
          <div style={styles.itemList}>
            {yaoshiData.categories.other.items.map((item: YaoshiItem) => (
              <span key={item.name} style={styles.itemTag}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 历史说明 */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
          📊 目录历史
        </h3>
        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8 }}>
          <strong>基础目录：</strong>87 种（2002-2022 年累计）<br/>
          <strong>2023 年新增：</strong>3 种（党参、黄芪、铁皮石斛）<br/>
          <strong>总计：</strong>106 种（截至 2023 年底官方数据）
        </p>
      </div>
    </div>
  )

  // 渲染食疗方
  const renderRecipes = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>
        🍲 古籍经典食疗方
        <span style={{ fontSize: '16px', fontWeight: 'normal', color: '#6b7280' }}>
          （{stats.recipeCount}首）
        </span>
      </h2>
      <p style={styles.sectionDesc}>
        来源：《黄帝内经》《伤寒论》《本草纲目》等 105 部中医古籍
      </p>

      {/* 按功效分类 */}
      <div style={styles.recipeSection}>
        <h3 style={styles.recipeGroupTitle}>💊 按功效分类</h3>
        <div style={styles.recipeGrid}>
          {recipesData.categories.byFunction.groups.map((group: RecipeGroup, idx: number) => (
            <div key={idx} style={styles.recipeCard}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryName}>{group.name}</span>
                <span style={styles.categoryCount}>{group.count}首</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.recipes.slice(0, 8).map((recipe: Recipe, recipeIdx: number) => (
                  <div key={recipeIdx}>
                    <div style={styles.recipeName}>{recipe.name}</div>
                    <div style={styles.recipeEffect}>{recipe.effect}</div>
                    <div style={styles.recipeIngredients}>
                      <strong>组成：</strong>{recipe.ingredients.join('、')}
                    </div>
                  </div>
                ))}
                {group.recipes.length > 8 && (
                  <p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>
                    还有{group.recipes.length - 8}首...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 按人群分类 */}
      <div style={styles.recipeSection}>
        <h3 style={styles.recipeGroupTitle}>👥 按人群分类</h3>
        <div style={styles.recipeGrid}>
          {recipesData.categories.byPeople.groups.map((group: RecipeGroup & { warnings?: string[] }, idx: number) => (
            <div key={idx} style={styles.recipeCard}>
              <div style={styles.categoryHeader}>
                <span style={styles.categoryName}>{group.name}</span>
                <span style={styles.categoryCount}>{group.count}首</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.recipes.slice(0, 6).map((recipe: Recipe, recipeIdx: number) => (
                  <div key={recipeIdx}>
                    <div style={styles.recipeName}>{recipe.name}</div>
                    <div style={styles.recipeEffect}>{recipe.effect}</div>
                    {recipe.note && (
                      <div style={styles.recipeNote}>💡 {recipe.note}</div>
                    )}
                  </div>
                ))}
              </div>
              {group.warnings && (
                <div style={styles.warningBox}>
                  <div style={styles.warningTitle}>⚠️ 禁忌食材</div>
                  <div style={styles.warningList}>
                    {group.warnings.map((item: string) => (
                      <span key={item} style={styles.warningTag}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // 渲染体质食疗
  const renderConstitution = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>🧬 体质食疗方案</h2>
      <p style={styles.sectionDesc}>
        根据中医九种体质类型，提供个性化食疗建议
      </p>

      <div style={styles.constitutionGrid}>
        {recipesData.categories.byConstitution.constitutions.map((constitution: any, idx: number) => (
          <div key={idx} style={styles.constitutionCard}>
            <div style={styles.constitutionName}>{constitution.name}</div>
            <div style={styles.constitutionDesc}>{constitution.description}</div>
            
            <div style={styles.constitutionSection}>
              <div style={styles.constitutionLabel}>✅ 推荐食疗</div>
              <div style={styles.constitutionItems}>
                {constitution.recommendations.map((item: string) => (
                  <span key={item} style={styles.constitutionItem}>{item}</span>
                ))}
              </div>
            </div>

            <div style={styles.constitutionSection}>
              <div style={styles.constitutionLabel}>❌ 饮食禁忌</div>
              <div style={styles.constitutionItems}>
                {constitution.avoid.map((item: string) => (
                  <span key={item} style={styles.constitutionItemAvoid}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // 渲染四季食疗
  const renderSeason = () => (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>📅 四季食疗</h2>
      <p style={styles.sectionDesc}>
        顺应四时变化，调整饮食养生
      </p>

      <div style={styles.recipeGrid}>
        {recipesData.categories.bySeason.seasons.map((season: any, idx: number) => (
          <div key={idx} style={styles.recipeCard}>
            <div style={styles.categoryHeader}>
              <span style={styles.categoryName}>
                {idx === 0 && '🌸'}
                {idx === 1 && '☀️'}
                {idx === 2 && '🍂'}
                {idx === 3 && '❄️'}
                {season.name}
              </span>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#059669' }}>养生原则：</strong>
              <span style={{ color: '#4b5563' }}>{season.principle}</span>
            </div>
            <div>
              <strong style={{ color: '#059669' }}>推荐食疗：</strong>
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {season.recipes.map((item: string) => (
                  <span key={item} style={styles.constitutionItem}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 使用指南 */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
          📖 使用指南
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recipesData.guidelines.notes.map((note: string, idx: number) => (
            <div key={idx} style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#059669', fontWeight: 'bold' }}>✓</span>
              <span>{note}</span>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginTop: '24px', marginBottom: '12px' }}>
          ⚠️ 特殊人群禁忌
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
          {recipesData.guidelines.warnings.map((warning: any, idx: number) => (
            <div key={idx} style={styles.warningBox}>
              <div style={styles.warningTitle}>🚫 {warning.group}</div>
              <div style={styles.warningList}>
                {warning.avoid.map((item: string) => (
                  <span key={item} style={styles.warningTag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div style={styles.container}>
      {/* 头部 */}
      <header style={styles.header}>
        <h1 style={styles.title}>🍲 药食同源知识库</h1>
        <p style={styles.subtitle}>
          国家药食同源目录（106 种）+ 古籍经典食疗方（150 首）<br/>
          中医为体，西医为用，中西互补，服务临床
        </p>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>{formatCount(stats.totalItems)}</span>
            <span style={styles.statLabel}>药食同源食材</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>{formatCount(stats.recipeCount)}</span>
            <span style={styles.statLabel}>古籍食疗方</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>9 种</span>
            <span style={styles.statLabel}>体质食疗方案</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>4 季</span>
            <span style={styles.statLabel}>时令养生</span>
          </div>
        </div>
      </header>

      {/* 导航 */}
      <nav style={styles.nav}>
        <button 
          style={styles.navButton(activeTab === 'catalog')}
          onClick={() => setActiveTab('catalog')}
        >
          📜 目录
        </button>
        <button 
          style={styles.navButton(activeTab === 'recipes')}
          onClick={() => setActiveTab('recipes')}
        >
          🍲 食疗方
        </button>
        <button 
          style={styles.navButton(activeTab === 'constitution')}
          onClick={() => setActiveTab('constitution')}
        >
          🧬 体质
        </button>
        <button 
          style={styles.navButton(activeTab === 'season')}
          onClick={() => setActiveTab('season')}
        >
          📅 四季
        </button>
      </nav>

      {/* 内容区域 */}
      {activeTab === 'catalog' && renderCatalog()}
      {activeTab === 'recipes' && renderRecipes()}
      {activeTab === 'constitution' && renderConstitution()}
      {activeTab === 'season' && renderSeason()}

      {/* 返回首页按钮 */}
      <button 
        style={styles.backToHome}
        onClick={() => window.location.href = '/'}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.5)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(217, 119, 6, 0.4)'
        }}
      >
        ← 返回首页
      </button>
    </div>
  )
}

// ============ 加载状态组件 ============
function LoadingState() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 50%, #f0f9ff 100%)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'pulse 2s ease-in-out infinite' }}>🍲</div>
        <div style={{ fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>正在加载药食同源数据...</div>
      </div>
    </div>
  )
}
