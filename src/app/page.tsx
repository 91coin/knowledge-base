'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import type { Recipe } from '../data/recipes-data'
import { loadAllRecipes, getRecipeStats } from '../data/recipes-data'
import KnowledgeMap from '../components/KnowledgeMap'

// ============ 类型定义 ============
interface KnowledgeItem {
  id: string
  title: string
  content: string
  source?: string
  effects?: string
  usage?: string
  cautions?: string
  preparation?: string
  tags?: string[]
  category?: string
  dataset?: string
}

interface Subcategory {
  name: string
  special?: string | null
  items?: KnowledgeItem[]
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
  children: Record<string, Subcategory>
}

// ============ 常量配置 ============
const ITEMS_PER_PAGE = 12

// ============ 知识图谱数据 ============
const knowledgeBase: Record<string, Category> = {
  tcm: {
    id: 'tcm',
    name: '中医学',
    icon: '🏥',
    color: '#ef4444',
    children: {
      formulas: { name: '方剂学', special: 'formulas', items: [] },
      theory: { name: '基础理论', special: 'tcm_theory', items: [] },
      diagnosis: { name: '诊断学', special: 'tcm_diagnosis', items: [] },
      herbs: { name: '中药学', special: 'tcm_herbs', items: [] },
      classics: { name: '经典著作', special: 'tcm_classics', items: [] },
    }
  },
  western: {
    id: 'western',
    name: '西医学',
    icon: '🔬',
    color: '#3b82f6',
    children: {
      basics: { name: '基础医学', special: 'western_basics', items: [] },
      clinical: { name: '临床医学', special: 'western_clinical', items: [] },
    }
  },
  integrative: {
    id: 'integrative',
    name: '中西医结合',
    icon: '🤝',
    color: '#10b981',
    children: {
      theory: { name: '基础理论', special: 'integrative_theory', items: [] },
      diseases: { name: '重点病种', special: 'integrative_diseases', items: [] },
    }
  },
}

// ============ 工具函数 ============
const formatNumber = (num: number): string => num.toLocaleString('zh-CN')

// ============ 分页组件 ============
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, totalItems }) => {
  if (totalPages <= 1) return null
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '24px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          background: currentPage === 1 ? '#f9fafb' : 'white',
          color: currentPage === 1 ? '#9ca3af' : '#374151',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background = '#ef4444'
            e.currentTarget.style.color = 'white'
            e.currentTarget.style.borderColor = '#ef4444'
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background = 'white'
            e.currentTarget.style.color = '#374151'
            e.currentTarget.style.borderColor = '#e5e7eb'
          }
        }}
      >
        ← 上一页
      </button>
      
      <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>
        第 {currentPage} / {totalPages} 页 · 共 {formatNumber(totalItems)} 条
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          background: currentPage === totalPages ? '#f9fafb' : 'white',
          color: currentPage === totalPages ? '#9ca3af' : '#374151',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.background = '#ef4444'
            e.currentTarget.style.color = 'white'
            e.currentTarget.style.borderColor = '#ef4444'
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.background = 'white'
            e.currentTarget.style.color = '#374151'
            e.currentTarget.style.borderColor = '#e5e7eb'
          }
        }}
      >
        下一页 →
      </button>
    </div>
  )
}

// ============ 主组件 ============
export default function KnowledgeBaseApp() {
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState<string>('tcm')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('formulas')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [knowledgeData, setKnowledgeData] = useState<Record<string, any[]>>({})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [stats, setStats] = useState<{ total: number; topSources: { name: string; count: number }[] } | null>(null)
  const [showMap, setShowMap] = useState<boolean>(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // 响应式检测
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // 加载完整数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/complete-data.json')
        const data = await response.json()
        setKnowledgeData(data)
        console.log('✅ 完整知识库数据加载成功')
      } catch (error) {
        console.error('❌ 加载知识库数据失败:', error)
      }
    }
    
    loadData()
  }, [])
  
  // 加载方剂数据
  useEffect(() => {
    if (selectedSubcategory === 'formulas') {
      setIsLoading(true)
      setLoadError(null)
      
      const loadData = async () => {
        try {
          const recipes = await loadAllRecipes()
          setAllRecipes(recipes)
          setStats(getRecipeStats(recipes))
          setIsLoading(false)
          console.log('✅ 方剂数据加载成功:', recipes.length, '首')
        } catch (error) {
          console.error('❌ 加载方剂数据失败:', error)
          setLoadError('加载方剂数据失败，请刷新页面重试')
          setIsLoading(false)
        }
      }
      
      loadData()
    }
  }, [selectedSubcategory])
  
  // 获取当前分类
  const currentCategory = knowledgeBase[selectedCategory]
  const currentSubcategory = currentCategory?.children?.[selectedSubcategory]
  
  // 获取显示的数据
  const displayItems = useMemo((): KnowledgeItem[] => {
    if (selectedSubcategory === 'formulas') {
      let recipes = allRecipes
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        recipes = recipes.filter(r => 
          r.name?.toLowerCase().includes(q) ||
          r.composition?.toLowerCase().includes(q) ||
          r.effects?.toLowerCase().includes(q) ||
          r.source?.toLowerCase().includes(q)
        )
      }
      return recipes.map(r => ({
        id: r.id.toString(),
        title: r.name || '',
        content: `【组成】${r.composition || ''}${r.effects ? `【功效】${r.effects}` : ''}`,
        source: r.source,
        effects: r.effects,
        usage: r.usage,
        preparation: r.preparation,
        cautions: r.cautions,
        tags: ['方剂', r.dataset || '经典'],
        category: r.category,
        dataset: r.dataset,
      }))
    } else {
      // 从加载的知识库数据中获取
      const subcat = currentCategory?.children?.[selectedSubcategory]
      const dataKey = subcat?.special
      let items: KnowledgeItem[] = []
      
      if (dataKey && knowledgeData[dataKey]) {
        items = knowledgeData[dataKey].map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          source: item.source,
          tags: item.tags,
        }))
      } else {
        items = currentSubcategory?.items || []
      }
      
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        items = items.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.tags?.some(tag => tag.toLowerCase().includes(q))
        )
      }
      return items
    }
  }, [selectedSubcategory, allRecipes, searchQuery, currentSubcategory, currentCategory, knowledgeData])
  
  // 分页
  const totalPages = Math.max(1, Math.ceil(displayItems.length / ITEMS_PER_PAGE))
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return displayItems.slice(start, start + ITEMS_PER_PAGE)
  }, [displayItems, currentPage])
  
  // 重置页码
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedSubcategory])
  
  // 处理分类切换
  const handleCategoryChange = useCallback((categoryKey: string, subcategoryKey: string) => {
    setSelectedCategory(categoryKey)
    setSelectedSubcategory(subcategoryKey)
    setShowMap(false)
    setSearchQuery('')
  }, [])
  
  // 渲染内容卡片
  const renderContentCard = useCallback((item: KnowledgeItem, index: number) => (
    <div
      key={`${item.id}-${index}`}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
        border: '1px solid #f3f4f6',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)'
        e.currentTarget.style.borderColor = '#ef4444'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)'
        e.currentTarget.style.borderColor = '#f3f4f6'
      }}
    >
      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
        {item.title}
      </div>
      {item.source && (
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', fontStyle: 'italic' }}>
          📜 {item.source}
        </div>
      )}
      <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, marginBottom: '12px' }}>
        {item.content.length > 200 ? item.content.slice(0, 200) + '...' : item.content}
      </div>
      {item.tags && item.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {item.tags.map((tag, tagIdx) => (
            <span
              key={tagIdx}
              style={{
                padding: '4px 12px',
                background: '#fef2f2',
                color: '#dc2626',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  ), [])
  
  // 渲染侧边栏
  const renderSidebar = () => (
    <div style={{
      width: isMobile ? '100%' : '260px',
      background: 'white',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
    }}>
      {/* 顶部标题 */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
          📚 中医药知识库
        </div>
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px', color: '#6b7280' }}
            aria-label="关闭菜单"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* 一级分类 */}
      <div style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          知识体系
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {Object.keys(knowledgeBase).map((catKey) => {
            const cat = knowledgeBase[catKey]
            const isActive = selectedCategory === catKey
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(catKey)
                  const firstSubcat = Object.keys(cat.children)[0]
                  if (firstSubcat) setSelectedSubcategory(firstSubcat)
                  if (isMobile) setSidebarOpen(false)
                  setShowMap(false)
                }}
                style={{
                  padding: '8px 16px',
                  background: isActive ? cat.color : '#f9fafb',
                  color: isActive ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? '600' : '500',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f3f4f6'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f9fafb'
                  }
                }}
              >
                {cat.icon} {cat.name}
              </button>
            )
          })}
        </div>
      </div>
      
      {/* 二级分类 */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '0 20px', fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {currentCategory.name} · 分类
        </div>
        {Object.values(currentCategory.children).map((subcat) => {
          const subcatKey = subcat.special || subcat.name
          const isActive = selectedSubcategory === subcatKey
          return (
            <button
              key={subcat.name}
              onClick={() => {
                setSelectedSubcategory(subcatKey)
                if (isMobile) setSidebarOpen(false)
                setShowMap(false)
              }}
              style={{
                width: 'calc(100% - 40px)',
                margin: '0 20px 4px',
                padding: '12px 16px',
                background: isActive ? '#fef2f2' : 'transparent',
                border: 'none',
                borderLeft: isActive ? `3px solid #ef4444` : '3px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: isActive ? '#dc2626' : '#374151',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.2s ease',
                borderRadius: '0 8px 8px 0',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = isActive ? '#fef2f2' : 'transparent'
                }
              }}
            >
              {subcat.name}
            </button>
          )
        })}
      </div>
      
      {/* 药食同源入口 */}
      <div style={{ padding: '20px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🍲 特色模块
        </div>
        <a
          href="/yaoshi-tongyuan"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            color: '#92400e',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.2)'
          }}
        >
          <span style={{ fontSize: '18px' }}>🌿</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>药食同源</div>
            <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: 'normal' }}>106 种食材 · 150 首食疗方</div>
          </div>
        </a>
      </div>
      
      {/* 底部信息 */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb',
      }}>
        <div style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
          © 2026 中医药知识库
        </div>
      </div>
    </div>
  )
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f9fafb',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif',
    }}>
      {/* 桌面端侧边栏 */}
      {!isMobile && renderSidebar()}
      
      {/* 移动端侧边栏遮罩 */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* 移动端侧边栏 */}
      {isMobile && sidebarOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '85%',
          maxWidth: '320px',
          zIndex: 1000,
          boxShadow: '4px 0 12px rgba(0,0,0,0.15)',
        }}>
          {renderSidebar()}
        </div>
      )}
      
      {/* 主内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* 知识地图 */}
        {showMap && (
          <div style={{ padding: isMobile ? '16px' : '24px', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
            <KnowledgeMap
              onNodeClick={(node) => {
                if (node.id === 'tcm-formulas' || node.name === '方剂学') {
                  handleCategoryChange('tcm', 'formulas')
                } else if (node.id === 'tcm-theory' || node.name === '基础理论') {
                  handleCategoryChange('tcm', 'theory')
                } else if (node.id === 'tcm-diagnosis' || node.name === '诊断学') {
                  handleCategoryChange('tcm', 'diagnosis')
                } else if (node.id === 'tcm-herbs' || node.name === '中药学') {
                  handleCategoryChange('tcm', 'herbs')
                } else if (node.id === 'tcm-classics' || node.name === '经典著作') {
                  handleCategoryChange('tcm', 'classics')
                }
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                onClick={() => setShowMap(false)}
                style={{
                  padding: '8px 20px',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#6b7280',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e5e7eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                }}
              >
                ✕ 收起地图
              </button>
            </div>
          </div>
        )}
        
        {/* 顶部工具栏 */}
        <div style={{
          padding: isMobile ? '12px 16px' : '16px 24px',
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '4px', color: '#6b7280' }}
              aria-label="打开菜单"
            >
              ☰
            </button>
          )}
          
          <input
            type="text"
            placeholder="搜索知识点、方剂、中药..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#ef4444'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                padding: '8px 12px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#6b7280',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
              }}
            >
              ✕
            </button>
          )}
          
          {/* 视图切换 */}
          <div style={{ display: 'flex', gap: '4px', background: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 12px',
                background: viewMode === 'grid' ? 'white' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                color: viewMode === 'grid' ? '#ef4444' : '#6b7280',
                transition: 'all 0.2s ease',
              }}
              title="网格视图"
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '6px 12px',
                background: viewMode === 'list' ? 'white' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                color: viewMode === 'list' ? '#ef4444' : '#6b7280',
                transition: 'all 0.2s ease',
              }}
              title="列表视图"
            >
              ☰
            </button>
          </div>
        </div>
        
        {/* 内容区 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'pulse 2s ease-in-out infinite' }}>⏳</div>
                <div style={{ fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>正在加载 10 万 + 方剂数据...</div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '8px' }}>首次加载可能需要 10-20 秒</div>
              </div>
            </div>
          ) : loadError ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>❌</div>
                <div style={{ fontSize: '16px', color: '#dc2626', fontWeight: '600', marginBottom: '24px' }}>{loadError}</div>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.39)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.45)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(239, 68, 68, 0.39)'
                  }}
                >
                  🔄 刷新页面
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* 特殊展示区（方剂库） */}
              {selectedSubcategory === 'formulas' && stats && (
                <div style={{ padding: isMobile ? '16px' : '24px', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', textAlign: 'center' }}>
                    🎉 {formatNumber(stats.total)} 首中医方剂库已上线！
                  </div>
                  <div style={{ fontSize: isMobile ? '13px' : '14px', color: '#6b7280', textAlign: 'center', marginBottom: '20px' }}>
                    84,212 首经典方剂 + 17,189 首药食同源食疗方
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '4px' }}>{formatNumber(stats.total)}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>总方剂数</div>
                    </div>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706', marginBottom: '4px' }}>84,212</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>经典方剂</div>
                    </div>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', marginBottom: '4px' }}>17,189</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>食疗方</div>
                    </div>
                    <div style={{ padding: '16px', background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed', marginBottom: '4px' }}>{stats.topSources.length}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>来源典籍</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 内容列表 */}
              <div style={{
                flex: 1,
                overflow: 'auto',
                padding: isMobile ? '16px' : '24px',
                background: '#f9fafb',
              }}>
                {paginatedItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9ca3af' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>暂无内容</div>
                    <div style={{ fontSize: '14px' }}>
                      {searchQuery ? `未找到与"${searchQuery}"相关的结果` : '该分类下暂无内容'}
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'grid'
                      ? (isMobile ? '1fr' : 'repeat(3, 1fr)')
                      : '1fr',
                    gap: '16px',
                  }}>
                    {paginatedItems.map(renderContentCard)}
                  </div>
                )}
              </div>
              
              {/* 分页 */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={displayItems.length} />
            </>
          )}
        </div>
      </div>
      
      {/* CSS 动画 */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.95); }
        }
      `}</style>
    </div>
  )
}
