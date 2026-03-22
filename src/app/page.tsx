'use client'

import { useState } from 'react'

// 菜单数据
const menuData = [
  {
    id: 'tcm',
    name: '中医学',
    icon: '🏥',
    children: [
      { id: 'tcm-theory', name: '基础理论' },
      { id: 'tcm-diagnosis', name: '诊断学' },
      { id: 'tcm-formulas', name: '方剂学' },
      { id: 'tcm-herbs', name: '中药学' },
      { id: 'tcm-classics', name: '经典古籍' },
    ]
  },
  {
    id: 'western',
    name: '西医学',
    icon: '🩺',
    children: [
      { id: 'western-basic', name: '基础医学' },
      { id: 'western-diagnosis', name: '诊断学' },
      { id: 'western-clinical', name: '临床医学' },
    ]
  },
  {
    id: 'integrated',
    name: '中西医结合',
    icon: '⚕️',
    children: [
      { id: 'integrated-theory', name: '病证结合' },
      { id: 'integrated-cases', name: '临床案例' },
    ]
  },
  {
    id: 'other',
    name: '其他',
    icon: '📚',
    children: [
      { id: 'other-food', name: '药食同源' },
      { id: 'other-notes', name: '学习笔记' },
    ]
  },
]

// 示例内容数据
const contentData: Record<string, any[]> = {
  'tcm-formulas': [
    { id: 1, title: '麻黄汤', source: '伤寒论', content: '发汗解表，宣肺平喘' },
    { id: 2, title: '桂枝汤', source: '伤寒论', content: '解肌发表，调和营卫' },
    { id: 3, title: '小柴胡汤', source: '伤寒论', content: '和解少阳' },
    { id: 4, title: '四君子汤', source: '太平惠民和剂局方', content: '益气健脾' },
    { id: 5, title: '六味地黄丸', source: '小儿药证直诀', content: '滋阴补肾' },
  ],
  'tcm-herbs': [
    { id: 1, title: '人参', nature: '微温', content: '大补元气，复脉固脱' },
    { id: 2, title: '黄芪', nature: '微温', content: '补气升阳，固表止汗' },
    { id: 3, title: '当归', nature: '温', content: '补血活血，调经止痛' },
  ],
  'other-food': [
    { id: 1, title: '山药', content: '补脾养胃，生津益肺' },
    { id: 2, title: '枸杞子', content: '滋补肝肾，益精明目' },
    { id: 3, title: '山楂', content: '消食健胃，行气散瘀' },
  ],
}

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState('tcm-formulas')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['tcm']))

  const toggleMenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus)
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId)
    } else {
      newExpanded.add(menuId)
    }
    setExpandedMenus(newExpanded)
  }

  const currentContent = contentData[selectedMenu] || []
  
  const filteredContent = searchQuery
    ? currentContent.filter(item => 
        item.title.includes(searchQuery) || 
        item.content.includes(searchQuery)
      )
    : currentContent

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 左侧菜单 */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">🏥 宋宋的知识库</h1>
          <p className="text-xs text-gray-500 mt-1">医学知识综合平台</p>
        </div>
        
        <nav className="p-2">
          {menuData.map((menu) => (
            <div key={menu.id} className="mb-2">
              <button
                onClick={() => toggleMenu(menu.id)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{menu.icon}</span>
                  <span className="font-medium text-gray-700">{menu.name}</span>
                </span>
                <span className="text-gray-400">
                  {expandedMenus.has(menu.id) ? '▼' : '▶'}
                </span>
              </button>
              
              {expandedMenus.has(menu.id) && (
                <div className="ml-4 mt-1 space-y-1">
                  {menu.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setSelectedMenu(child.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedMenu === child.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 p-6">
        {/* 搜索栏 */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索内容..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* 内容列表 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {menuData.flatMap(m => m.children).find(c => c.id === selectedMenu)?.name || '内容'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              共 {filteredContent.length} 条
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.content}</p>
                  </div>
                  {item.source && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {item.source}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredContent.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              暂无内容
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
