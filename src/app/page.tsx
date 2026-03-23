'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'

// 懒加载数据 - 只在需要时导入
let RECIPES_INDEX: any = null
let YAOSHI_CATALOG: any = null

const lazyLoadRecipes = async () => {
  if (!RECIPES_INDEX) {
    const mod = await import('../data/recipes-index')
    RECIPES_INDEX = mod
  }
  return RECIPES_INDEX
}

const lazyLoadYaoshi = async () => {
  if (!YAOSHI_CATALOG) {
    const mod = await import('../data/yaoshi-tongyuan-catalog')
    YAOSHI_CATALOG = mod
  }
  return YAOSHI_CATALOG
}

// 知识图谱数据（静态，立即加载）
const knowledgeBase: any = {
  tcm: {
    id: 'tcm',
    name: '中医学',
    icon: '🏥',
    color: '#c0392b',
    children: {
      theory: {
        name: '基础理论',
        items: [
          { id: 'tcm-theory-1', title: '阴阳学说', content: '阴阳者，天地之道也，万物之纲纪，变化之父母。', tags: ['哲学基础', '核心理论'] },
          { id: 'tcm-theory-2', title: '五行学说', content: '木火土金水，相生相克，制约平衡。', tags: ['哲学基础', '系统论'] },
          { id: 'tcm-theory-3', title: '藏象学说', content: '心主血脉、肺主气、脾主运化、肝主疏泄、肾主藏精。', tags: ['脏腑', '生理'] },
          { id: 'tcm-theory-4', title: '经络学说', content: '经脉者，所以决死生，处百病，调虚实，不可不通。', tags: ['经络', '气血'] },
          { id: 'tcm-theory-5', title: '气血津液', content: '气为血之帅，血为气之母，津液濡养全身。', tags: ['基础物质', '生理'] },
        ]
      },
      diagnosis: {
        name: '诊断学',
        items: [
          { id: 'tcm-diag-1', title: '四诊合参', content: '望闻问切，四诊合参，全面了解病情。望神色形态，闻声音气味，问病史症状，切脉象。', tags: ['诊断方法', '基础'] },
          { id: 'tcm-diag-2', title: '八纲辨证', content: '阴阳、表里、寒热、虚实，为辨证之总纲。', tags: ['辨证', '纲领'] },
          { id: 'tcm-diag-3', title: '脏腑辨证', content: '根据脏腑生理功能、病理变化进行辨证论治。', tags: ['辨证', '脏腑'] },
        ]
      },
      formulas: {
        name: '方剂学',
        special: null, // 懒加载
        items: [
          { 
            id: 'formula-1', 
            title: '麻黄汤', 
            source: '《伤寒论》', 
            content: '【组成】麻黄 9g、桂枝 6g、杏仁 9g、甘草 3g。【功效】发汗解表，宣肺平喘。【主治】外感风寒表实证。', 
            tags: ['解表剂', '伤寒论', '发汗'] 
          },
          { 
            id: 'formula-2', 
            title: '桂枝汤', 
            source: '《伤寒论》', 
            content: '【组成】桂枝 9g、芍药 9g、生姜 9g、大枣 12 枚、甘草 6g。【功效】解肌发表，调和营卫。', 
            tags: ['解表剂', '伤寒论', '调和'] 
          },
          { 
            id: 'formula-3', 
            title: '小柴胡汤', 
            source: '《伤寒论》', 
            content: '【组成】柴胡 12g、黄芩 9g、人参 6g、半夏 9g、甘草 6g、生姜 9g、大枣 12 枚。【功效】和解少阳。', 
            tags: ['和解剂', '伤寒论', '少阳'] 
          },
        ]
      },
    }
  },
  western: {
    id: 'western',
    name: '西医学',
    icon: '🔬',
    color: '#2980b9',
    children: {
      basics: {
        name: '基础医学',
        items: [
          { id: 'west-basic-1', title: '解剖学', content: '研究人体正常形态结构的科学。', tags: ['形态学', '基础'] },
          { id: 'west-basic-2', title: '生理学', content: '研究人体正常生命活动规律的科学。', tags: ['功能学', '基础'] },
          { id: 'west-basic-3', title: '生物化学', content: '研究生命现象的化学本质的科学。', tags: ['化学', '分子'] },
        ]
      },
      clinical: {
        name: '临床医学',
        items: [
          { id: 'west-clin-1', title: '内科学', content: '研究内科疾病发生、发展规律及诊疗方法的科学。', tags: ['临床', '内科'] },
          { id: 'west-clin-2', title: '外科学', content: '研究外科疾病诊疗方法的科学。', tags: ['临床', '外科'] },
        ]
      },
    }
  },
  integrative: {
    id: 'integrative',
    name: '中西医结合',
    icon: '🤝',
    color: '#27ae60',
    children: {
      theory: {
        name: '基础理论',
        items: [
          { id: 'int-theory-1', title: '病证结合', content: '西医诊断与中医辨证相结合。', tags: ['诊疗模式', '核心'] },
          { id: 'int-theory-2', title: '分期结合', content: '急性期西医为主，缓解期中医为主。', tags: ['治疗策略'] },
        ]
      },
    }
  },
}

// 虚拟滚动组件 - 只渲染可见区域
const VirtualList = ({ items, renderItem, itemHeight = 200, overscan = 5 }: any) => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(600)
  
  useEffect(() => {
    const updateContainer = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight)
      }
    }
    updateContainer()
    window.addEventListener('resize', updateContainer)
    return () => window.removeEventListener('resize', updateContainer)
  }, [])
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2)
  
  const visibleItems = items.slice(startIndex, endIndex)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight
  
  return (
    <div ref={containerRef} style={{ flex: 1, overflow: 'auto' }} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: offsetY }}>
          {visibleItems.map((item: any, idx: number) => (
            <div key={item.id} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + idx)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 分页组件
const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  if (totalPages <= 1) return null
  
  const pages = []
  const showPages = 5
  let start = Math.max(1, currentPage - Math.floor(showPages / 2))
  let end = Math.min(totalPages, start + showPages - 1)
  
  if (end - start < showPages - 1) {
    start = Math.max(1, end - showPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '15px' }}>
      {start > 1 && (
        <button onClick={() => onPageChange(1)} style={btnStyle}>1</button>
      )}
      {start > 2 && <span style={{ padding: '8px' }}>...</span>}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...btnStyle,
            background: page === currentPage ? '#3498db' : 'white',
            color: page === currentPage ? 'white' : '#333',
          }}
        >
          {page}
        </button>
      ))}
      {end < totalPages - 1 && <span style={{ padding: '8px' }}>...</span>}
      {end < totalPages && (
        <button onClick={() => onPageChange(totalPages)} style={btnStyle}>{totalPages}</button>
      )}
    </div>
  )
}

const btnStyle = {
  minWidth: '36px',
  height: '36px',
  padding: '0 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  background: 'white',
  cursor: 'pointer',
  fontSize: '13px',
}

export default function KnowledgeBase() {
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState('tcm')
  const [selectedSubcategory, setSelectedSubcategory] = useState('theory')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recipesData, setRecipesData] = useState<any>(null)
  const [yaoshiData, setYaoshiData] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const ITEMS_PER_PAGE = 20
  
  // 响应式检测
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // 懒加载数据
  useEffect(() => {
    if (selectedSubcategory === 'formulas') {
      setIsLoading(true)
      Promise.all([lazyLoadRecipes(), lazyLoadYaoshi()]).then(([recipes, yaoshi]) => {
        setRecipesData(recipes)
        setYaoshiData(yaoshi)
        setIsLoading(false)
      })
    }
  }, [selectedSubcategory])
  
  // 获取当前分类
  const currentCategory = knowledgeBase[selectedCategory]
  const currentSubcategory = currentCategory?.children?.[selectedSubcategory]
  
  // 过滤内容
  const filteredItems = useMemo(() => {
    if (!currentSubcategory?.items) return []
    if (!searchQuery) return currentSubcategory.items
    
    const query = searchQuery.toLowerCase()
    return currentSubcategory.items.filter((item: any) =>
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }, [currentSubcategory, searchQuery])
  
  // 分页
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  
  // 渲染内容卡片
  const renderContentCard = useCallback((item: any, idx: number) => (
    <div
      key={item.id}
      style={{
        padding: isMobile ? '12px' : '15px',
        background: 'white',
        borderRadius: isMobile ? '10px' : '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: isMobile ? '10px' : '15px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
        {item.title}
      </div>
      {item.source && (
        <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#666', marginBottom: '8px', fontStyle: 'italic' }}>
          📜 {item.source}
        </div>
      )}
      <div style={{ fontSize: isMobile ? '13px' : '14px', color: '#555', lineHeight: 1.6, marginBottom: '10px' }}>
        {item.content.length > 200 ? item.content.slice(0, 200) + '...' : item.content}
      </div>
      {item.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {item.tags.map((tag: string, tagIdx: number) => (
            <span
              key={tagIdx}
              style={{
                padding: '4px 10px',
                background: '#e8f4fd',
                color: '#3498db',
                borderRadius: '12px',
                fontSize: isMobile ? '10px' : '11px',
                fontWeight: '500',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  ), [isMobile])
  
  // 渲染侧边栏
  const renderSidebar = () => (
    <div style={{
      width: isMobile ? '100%' : '220px',
      background: 'white',
      borderRight: '1px solid #e8e8e8',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* 顶部标题 */}
      <div style={{
        padding: isMobile ? '15px' : '20px',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 'bold', color: '#333' }}>
          📚 知识库
        </div>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)} style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '5px',
          }}>✕</button>
        )}
      </div>
      
      {/* 一级分类 */}
      <div style={{ flex: 1, overflow: 'auto', padding: '10px 0' }}>
        {Object.values(currentCategory.children).map((subcat: any, idx: number) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedSubcategory(subcat.name === '方剂学' ? 'formulas' : subcat.name)
              if (isMobile) setSidebarOpen(false)
              setCurrentPage(1)
            }}
            style={{
              width: '100%',
              padding: isMobile ? '12px 15px' : '12px 20px',
              background: selectedSubcategory === subcat.name ? '#f0f7ff' : 'transparent',
              border: 'none',
              borderLeft: selectedSubcategory === subcat.name ? `3px solid #3498db` : '3px solid transparent',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: isMobile ? '14px' : '15px',
              color: selectedSubcategory === subcat.name ? '#3498db' : '#555',
              fontWeight: selectedSubcategory === subcat.name ? '600' : '400',
              transition: 'all 0.2s',
            }}
          >
            {subcat.name}
          </button>
        ))}
      </div>
    </div>
  )
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f5f6fa',
      overflow: 'hidden',
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
        />
      )}
      
      {/* 移动端侧边栏 */}
      {isMobile && sidebarOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '80%',
          maxWidth: '300px',
          zIndex: 1000,
          transform: 'translateX(0)',
          transition: 'transform 0.3s',
        }}>
          {renderSidebar()}
        </div>
      )}
      
      {/* 主内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* 顶部搜索栏 */}
        <div style={{
          padding: isMobile ? '12px 15px' : '15px 20px',
          background: 'white',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(true)} style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px',
            }}>☰</button>
          )}
          <input
            type="text"
            placeholder="搜索知识点..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
            style={{
              flex: 1,
              padding: isMobile ? '10px 12px' : '10px 15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '15px',
              outline: 'none',
            }}
          />
        </div>
        
        {/* 内容区 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>⏳</div>
                <div style={{ fontSize: '16px', color: '#666' }}>正在加载 10 万 + 方剂数据...</div>
              </div>
            </div>
          ) : (
            <>
              {/* 特殊展示区（方剂库） */}
              {selectedSubcategory === 'formulas' && recipesData && (
                <div style={{ padding: isMobile ? '15px' : '20px', background: 'white', borderBottom: '1px solid #e8e8e8' }}>
                  <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 'bold', color: '#333', marginBottom: '10px', textAlign: 'center' }}>
                    🎉 101,401 首中医方剂库已上线！
                  </div>
                  <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666', textAlign: 'center', marginBottom: '15px' }}>
                    84,212 首经典方剂 + 17,189 首药食同源食疗方
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
                    <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>101,401</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>总方剂数</div>
                    </div>
                    <div style={{ padding: '12px', background: '#fff3e0', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f39c12' }}>84,212</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>经典方剂</div>
                    </div>
                    <div style={{ padding: '12px', background: '#e3f2fd', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3498db' }}>17,189</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>食疗方</div>
                    </div>
                    <div style={{ padding: '12px', background: '#f3e5f5', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#9b59b6' }}>6</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>数据集</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 内容列表 */}
              <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? '15px' : '20px' }}>
                {paginatedItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>暂无内容</div>
                  </div>
                ) : (
                  paginatedItems.map(renderContentCard)
                )}
              </div>
              
              {/* 分页 */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
