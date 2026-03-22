'use client'

import { useState, useMemo } from 'react'

// 完整的中医知识数据
const knowledgeData = {
  formulas: {
    id: 'formulas',
    name: '方剂学',
    icon: '💊',
    items: [
      { id: 1, title: '麻黄汤', source: '伤寒论', content: '发汗解表，宣肺平喘。主治外感风寒表实证。', tags: ['解表', '发汗'] },
      { id: 2, title: '桂枝汤', source: '伤寒论', content: '解肌发表，调和营卫。主治外感风寒表虚证。', tags: ['解表', '调和'] },
      { id: 3, title: '小柴胡汤', source: '伤寒论', content: '和解少阳。主治伤寒少阳证。', tags: ['和解', '少阳'] },
    ]
  },
  herbs: {
    id: 'herbs',
    name: '中药学',
    icon: '🌿',
    items: [
      { id: 1, title: '人参', source: '五加科', content: '大补元气，复脉固脱，补脾益肺，生津养血，安神益智。', tags: ['补气', '上品'] },
      { id: 2, title: '黄芪', source: '豆科', content: '补气升阳，固表止汗，利水消肿，生津养血。', tags: ['补气', '固表'] },
      { id: 3, title: '当归', source: '伞形科', content: '补血活血，调经止痛，润肠通便。', tags: ['补血', '活血'] },
    ]
  },
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('formulas')
  const [searchQuery, setSearchQuery] = useState('')

  const currentCategory = knowledgeData[selectedCategory as keyof typeof knowledgeData]
  
  const filteredItems = useMemo(() => {
    if (!searchQuery) return currentCategory.items
    return currentCategory.items.filter(item => 
      item.title.includes(searchQuery) || 
      item.content.includes(searchQuery)
    )
  }, [currentCategory, searchQuery])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <h1 style={{ color: 'white', textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px' }}>
        🏥 宋宋的知识库
      </h1>
      
      <div style={{ display: 'flex', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* 左侧菜单 */}
        <div style={{ width: '250px', background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#333' }}>知识分类</h2>
          {Object.values(knowledgeData).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '8px',
                border: 'none',
                background: selectedCategory === category.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5f5f5',
                color: selectedCategory === category.id ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '1rem',
                textAlign: 'left',
              }}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* 右侧内容 */}
        <div style={{ flex: 1, background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          {/* 搜索 */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              marginBottom: '20px',
            }}
          />

          {/* 内容列表 */}
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
            {currentCategory.name}
          </h2>
          
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '15px',
                marginBottom: '10px',
                background: '#f8f9fa',
                borderRadius: '10px',
                borderLeft: '4px solid #667eea',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '5px' }}>
                {item.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.content}</p>
              <span style={{ color: '#999', fontSize: '0.8rem' }}>来源：{item.source}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
