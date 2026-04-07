'use client'

import { useState, useMemo, useEffect } from 'react'
import { qnaDatabase, searchQna, getQnaByCategory, getRelatedQna, type QnaItem } from '../../data/qna-data'

// ============ 类型定义 ============
interface QnaCardProps {
  qna: QnaItem
  onExpand: (qna: QnaItem) => void
  index: number
}

// ============ 工具函数 ============
const formatTimestamp = (timestamp: string): string => {
  return timestamp
}

const getCategoryColor = (category: string): { bg: string; text: string; gradient: string } => {
  const colors: Record<string, { bg: string; text: string; gradient: string }> = {
    '中医辨证': { bg: '#fef2f2', text: '#dc2626', gradient: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' },
    '舌诊': { bg: '#fffbeb', text: '#d97706', gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' },
    '中西医结合': { bg: '#ecfdf5', text: '#059669', gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' },
    '方剂学': { bg: '#f5f3ff', text: '#7c3aed', gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' },
    '中药学': { bg: '#fdf2f8', text: '#db2777', gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' },
  }
  return colors[category] || { bg: '#f9fafb', text: '#6b7280', gradient: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)' }
}

// ============ Q&A 卡片组件 ============
const QnaCard: React.FC<QnaCardProps> = ({ qna, onExpand, index }) => {
  const categoryColors = getCategoryColor(qna.category)
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(102, 126, 234, 0.1)' 
          : '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
        border: `1px solid ${isHovered ? '#c7d2fe' : '#e5e7eb'}`,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        position: 'relative',
        overflow: 'hidden',
        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
      }}
      onClick={() => onExpand(qna)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 顶部装饰条 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: categoryColors.gradient,
        opacity: isHovered ? 1 : 0.7,
        transition: 'opacity 0.3s ease',
      }} />
      
      <div style={{ marginBottom: '16px', marginTop: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            background: categoryColors.bg,
            color: categoryColors.text,
            border: `1px solid ${categoryColors.text}20`,
            transition: 'all 0.2s ease',
          }}
        >
          {qna.category}
        </span>
        <span style={{ marginLeft: '10px', fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>
          {formatTimestamp(qna.timestamp)}
        </span>
      </div>
      
      <h3 style={{ 
        fontSize: '17px', 
        fontWeight: 600, 
        color: isHovered ? '#1f2937' : '#374151', 
        marginBottom: '16px', 
        lineHeight: '1.6',
        transition: 'color 0.3s ease',
      }}>
        {qna.question}
      </h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {qna.tags.slice(0, 4).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              background: isHovered ? '#f3f4f6' : '#f9fafb',
              color: '#6b7280',
              fontWeight: 500,
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s ease',
            }}
          >
            #{tag}
          </span>
        ))}
        {qna.tags.length > 4 && (
          <span style={{ 
            fontSize: '11px', 
            color: '#9ca3af', 
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
          }}>
            +{qna.tags.length - 4}
          </span>
        )}
      </div>
      
      {/* 悬停提示 */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        fontSize: '11px',
        color: '#667eea',
        fontWeight: 600,
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        查看详情
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  )
}

// ============ 展开详情组件 ============
interface QnaDetailProps {
  qna: QnaItem
  onClose: () => void
}

const QnaDetail: React.FC<QnaDetailProps> = ({ qna, onClose }) => {
  const categoryColors = getCategoryColor(qna.category)
  const [isClosing, setIsClosing] = useState(false)
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }
  
  // 简单的 markdown 渲染
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n')
    const elements = []
    let inCodeBlock = false
    let codeContent = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // 代码块
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={i} style={{
              background: '#1f2937',
              color: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '13px',
              lineHeight: '1.6',
              margin: '16px 0',
            }}>
              <code>{codeContent.join('\n')}</code>
            </pre>
          )
          codeContent = []
          inCodeBlock = false
        } else {
          inCodeBlock = true
        }
        continue
      }
      
      if (inCodeBlock) {
        codeContent.push(line)
        continue
      }
      
      // 标题
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} style={{ 
            fontSize: '22px', 
            fontWeight: 700, 
            color: '#1f2937', 
            marginTop: '32px', 
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid #e5e7eb',
          }}>
            {line.slice(3)}
          </h2>
        )
        continue
      }
      
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} style={{ 
            fontSize: '19px', 
            fontWeight: 600, 
            color: '#1f2937', 
            marginTop: '24px', 
            marginBottom: '12px',
          }}>
            {line.slice(4)}
          </h3>
        )
        continue
      }
      
      // 列表
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} style={{ 
            marginLeft: '24px', 
            color: '#4b5563', 
            marginBottom: '8px',
            lineHeight: '1.7',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute',
              left: '-16px',
              color: '#667eea',
              fontWeight: 600,
            }}>•</span>
            {line.slice(2)}
          </li>
        )
        continue
      }
      
      // 引用
      if (line.startsWith('> ')) {
        elements.push(
          <div key={i} style={{
            borderLeft: '4px solid #667eea',
            paddingLeft: '20px',
            margin: '20px 0',
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
            borderRadius: '0 8px 8px 0',
            color: '#4b5563',
            fontStyle: 'italic',
            lineHeight: '1.7',
          }}>
            {line.slice(2)}
          </div>
        )
        continue
      }
      
      // 表格行（简单处理）
      if (line.startsWith('|')) {
        continue
      }
      
      // 普通文本
      if (line.trim()) {
        elements.push(
          <p key={i} style={{ 
            color: '#4b5563', 
            marginBottom: '12px', 
            lineHeight: '1.8',
            fontSize: '15px',
          }}>
            {line}
          </p>
        )
      } else {
        elements.push(<br key={i} />)
      }
    }
    
    return elements
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 1000,
        padding: '20px',
        overflow: 'auto',
        animation: 'fadeIn 0.3s ease-out',
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          marginTop: '40px',
          marginBottom: '40px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: isClosing ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: 'slideIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ flex: 1 }}>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 18px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 600,
                background: categoryColors.bg,
                color: categoryColors.text,
                border: `1px solid ${categoryColors.text}25`,
                marginBottom: '16px',
              }}
            >
              {qna.category}
            </span>
            <h1 style={{ 
              fontSize: '26px', 
              fontWeight: 700, 
              color: '#1f2937', 
              lineHeight: '1.4',
              marginBottom: '12px',
            }}>
              {qna.question}
            </h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>
              {formatTimestamp(qna.timestamp)}
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              border: 'none',
              borderRadius: '12px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#6b7280',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)'
              e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)'
              e.currentTarget.style.color = '#ef4444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
              e.currentTarget.style.transform = 'rotate(0) scale(1)'
              e.currentTarget.style.color = '#6b7280'
            }}
          >
            ✕
          </button>
        </div>

        {/* 标签 */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #f3f4f6',
        }}>
          {qna.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                color: '#6b7280',
                fontWeight: 600,
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                e.currentTarget.style.color = 'white'
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
                e.currentTarget.style.color = '#6b7280'
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 答案 */}
        <div style={{ fontSize: '15px', lineHeight: 1.9 }}>
          {renderMarkdown(qna.answer)}
        </div>

        {/* 相关问题 */}
        {qna.relatedTopics && qna.relatedTopics.length > 0 && (
          <div style={{ 
            marginTop: '40px', 
            paddingTop: '32px', 
            borderTop: '2px solid #f3f4f6',
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            margin: '40px -40px -40px -40px',
            padding: '32px 40px',
            borderRadius: '0 0 20px 20px',
          }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 700, 
              color: '#1f2937', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ fontSize: '18px' }}>💡</span>
              相关问题
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {qna.relatedTopics.map((topic, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '24px',
                    fontSize: '13px',
                    background: categoryColors.bg,
                    color: categoryColors.text,
                    fontWeight: 600,
                    border: `1px solid ${categoryColors.text}20`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = categoryColors.gradient
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 4px 12px ${categoryColors.text}25`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = categoryColors.bg
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============ 主页面组件 ============
export default function QnaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [expandedQna, setExpandedQna] = useState<QnaItem | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = Array.from(new Set(qnaDatabase.map(q => q.category)))
    return ['全部', ...cats]
  }, [])

  // 过滤问答
  const filteredQna = useMemo(() => {
    let result = qnaDatabase

    // 分类过滤
    if (selectedCategory !== '全部') {
      result = result.filter(q => q.category === selectedCategory)
    }

    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(q =>
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return result
  }, [searchQuery, selectedCategory])

  // 统计信息
  const stats = useMemo(() => {
    return {
      total: qnaDatabase.length,
      todayCount: qnaDatabase.length,
      categories: categories.length - 1
    }
  }, [categories])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.5s ease-out',
    }}>
      {/* CSS 动画 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* 头部 */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '64px 24px 48px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse',
        }} />
        
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 800, 
            marginBottom: '16px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            letterSpacing: '-0.5px',
          }}>
            💬 宋宋的中医问答库
          </h1>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.95, 
            marginBottom: '32px',
            fontWeight: 400,
          }}>
            整理自深度学习对话 · 专业 · 系统 · 实用
          </p>
          
          {/* 统计卡片 */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '20px 28px',
              minWidth: '160px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '6px', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                {stats.total}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.95, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                总问答数
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '20px 28px',
              minWidth: '160px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '6px', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                {stats.todayCount}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.95, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                今日新增
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '20px 28px',
              minWidth: '160px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '6px', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                {stats.categories}
              </div>
              <div style={{ fontSize: '13px', opacity: 0.95, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                分类数量
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和过滤 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid #f3f4f6',
        }}>
          {/* 搜索框 */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'white',
              padding: '6px 6px 6px 20px',
              borderRadius: '16px',
              border: '2px solid #e5e7eb',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.03)',
            }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#9ca3af" 
                strokeWidth="2"
                style={{ flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="搜索问题、答案或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: '15px',
                  outline: 'none',
                  color: '#1f2937',
                  fontWeight: 500,
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    marginRight: '6px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 分类过滤 */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((category) => {
              const isActive = selectedCategory === category
              const colors = getCategoryColor(category)
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: isActive 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                    color: isActive ? 'white' : '#6b7280',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: isActive 
                      ? '0 4px 14px rgba(102, 126, 234, 0.4)' 
                      : '0 1px 2px rgba(0, 0, 0, 0.05)',
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
                    }
                  }}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* 结果统计 */}
        <div style={{ 
          marginBottom: '24px', 
          color: '#6b7280', 
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          找到 {filteredQna.length} 个相关问答
        </div>

        {/* 问答列表 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px',
        }}>
          {filteredQna.map((qna, index) => (
            <QnaCard
              key={qna.id}
              qna={qna}
              onExpand={setExpandedQna}
              index={index}
            />
          ))}
        </div>

        {/* 空状态 */}
        {filteredQna.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#9ca3af',
          }}>
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '24px',
              animation: 'float 3s ease-in-out infinite',
            }}>
              🔍
            </div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#4b5563', marginBottom: '12px' }}>
              没有找到相关问答
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              尝试其他搜索词或切换分类
            </div>
          </div>
        )}
      </div>

      {/* 详情弹窗 */}
      {expandedQna && (
        <QnaDetail
          qna={expandedQna}
          onClose={() => setExpandedQna(null)}
        />
      )}
    </div>
  )
}
