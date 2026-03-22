'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

// 知识分类数据
const categories = [
  {
    id: 'tcm',
    name: '中医学',
    icon: '🏥',
    description: '中医基础理论、诊断、方剂、中药',
    count: 84212 + 100 + 200,
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'western',
    name: '西医学',
    icon: '🩺',
    description: '西医基础、诊断、临床',
    count: 0,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'finance',
    name: '金融',
    icon: '💰',
    description: 'AIX、Polymarket、区块链',
    count: 4,
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'other',
    name: '其他',
    icon: '📚',
    description: '药食同源、学习笔记',
    count: 106,
    color: 'bg-orange-100 text-orange-700',
  },
]

// 示例数据
const sampleData = [
  { id: 1, title: '麻黄汤', category: 'tcm', type: '方剂', content: '发汗解表，宣肺平喘' },
  { id: 2, title: '桂枝汤', category: 'tcm', type: '方剂', content: '解肌发表，调和营卫' },
  { id: 3, title: 'AIX 白皮书', category: 'finance', type: '文档', content: 'AI 原生交易所' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const fuse = useMemo(() => {
    return new Fuse(sampleData, {
      keys: ['title', 'content'],
      threshold: 0.3,
    })
  }, [])

  const searchResults = useMemo(() => {
    if (!searchQuery) return []
    return fuse.search(searchQuery).map(result => result.item)
  }, [searchQuery, fuse])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">OpenClaw 知识库</h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="text-center mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索知识..."
            className="w-full max-w-md px-4 py-3 border rounded-lg"
          />
          
          {searchResults.length > 0 && (
            <div className="mt-4 bg-white rounded-lg shadow border">
              {searchResults.map((item) => (
                <div key={item.id} className="px-4 py-2 border-b last:border-0">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="bg-white p-6 rounded-lg shadow border cursor-pointer hover:shadow-md"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
              <p className="text-xs text-gray-500 mt-2">{cat.count} 条</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
