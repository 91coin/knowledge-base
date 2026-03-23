'use client'

import { useState, useEffect, useCallback } from 'react'

// ============ 类型定义 ============
interface KnowledgeNode {
  id: string
  name: string
  icon: string
  color: string
  gradient: string
  description: string
  count?: number
  children?: KnowledgeNode[]
}

interface KnowledgeMapProps {
  onNodeClick?: (node: KnowledgeNode) => void
}

// ============ 知识地图数据 ============
const knowledgeData: KnowledgeNode[] = [
  {
    id: 'tcm',
    name: '中医学',
    icon: '🏥',
    color: '#c0392b',
    gradient: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 50%, #f39c12 100%)',
    description: '传承千年的中医智慧，101,401 首经典方剂',
    count: 101401,
    children: [
      { id: 'tcm-formulas', name: '方剂学', icon: '📚', color: '#e74c3c', gradient: '', description: '101,401 首经典方剂', count: 101401 },
      { id: 'tcm-theory', name: '基础理论', icon: '☯️', color: '#c0392b', gradient: '', description: '阴阳五行、藏象经络', count: 6 },
      { id: 'tcm-diagnosis', name: '诊断学', icon: '🩺', color: '#e67e22', gradient: '', description: '四诊合参、辨证论治', count: 6 },
      { id: 'tcm-herbs', name: '中药学', icon: '🌿', color: '#27ae60', gradient: '', description: '300 味常用中药', count: 300 },
      { id: 'tcm-classics', name: '经典著作', icon: '📖', color: '#8e44ad', gradient: '', description: '内经、伤寒、金匮、温病', count: 4 },
    ]
  },
  {
    id: 'western',
    name: '西医学',
    icon: '🔬',
    color: '#2980b9',
    gradient: 'linear-gradient(135deg, #2980b9 0%, #3498db 50%, #5dade2 100%)',
    description: '现代医学科学体系，解剖、生理、病理、药理',
    count: 8,
    children: [
      { id: 'west-basic', name: '基础医学', icon: '🧬', color: '#3498db', gradient: '', description: '解剖、生理、生化、病理', count: 5 },
      { id: 'west-clinical', name: '临床医学', icon: '🏥', color: '#2980b9', gradient: '', description: '诊断、内科、外科', count: 3 },
    ]
  },
  {
    id: 'integrative',
    name: '中西医结合',
    icon: '🤝',
    color: '#16a085',
    gradient: 'linear-gradient(135deg, #16a085 0%, #1abc9c 50%, #48c9b0 100%)',
    description: '中西互补，服务临床，病证结合诊疗',
    count: 7,
    children: [
      { id: 'int-theory', name: '基础理论', icon: '💡', color: '#1abc9c', gradient: '', description: '病证结合、分期结合', count: 4 },
      { id: 'int-diseases', name: '重点病种', icon: '🎯', color: '#16a085', gradient: '', description: '糖尿病、高血压、冠心病', count: 3 },
    ]
  },
]

// ============ 主组件 ============
export default function KnowledgeMap({ onNodeClick }: KnowledgeMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // 响应式检测
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // 处理点击
  const handleNodeClick = useCallback((node: KnowledgeNode) => {
    setSelectedNode(node.id)
    onNodeClick?.(node)
  }, [onNodeClick])
  
  return (
    <div style={{
      width: '100%',
      padding: isMobile ? '20px' : '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '24px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
    }}>
      {/* 背景装饰 - 流动粒子 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* 粒子 1 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '8px',
          height: '8px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(2px)',
        }} />
        {/* 粒子 2 */}
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '6px',
          height: '6px',
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s',
          filter: 'blur(1px)',
        }} />
        {/* 粒子 3 */}
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '10px',
          height: '10px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite 1s',
          filter: 'blur(3px)',
        }} />
      </div>
      
      {/* 标题 */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '24px' : '32px',
        position: 'relative',
        zIndex: 1,
      }}>
        <h2 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '8px',
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          letterSpacing: '2px',
        }}>
          📚 中医药知识地图
        </h2>
        <p style={{
          fontSize: isMobile ? '13px' : '15px',
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          点击节点探索知识的海洋 · 101,401 首方剂等您发现
        </p>
      </div>
      
      {/* 知识节点网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '20px' : '32px',
        position: 'relative',
        zIndex: 1,
      }}>
        {knowledgeData.map((node, index) => (
          <div
            key={node.id}
            onClick={() => handleNodeClick(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              background: node.gradient,
              borderRadius: '24px',
              padding: isMobile ? '24px' : '32px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: hoveredNode === node.id ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
              boxShadow: hoveredNode === node.id
                ? '0 24px 48px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.2)'
                : '0 12px 24px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '200px' : '240px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* 光泽效果 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              borderRadius: '24px 24px 0 0',
              pointerEvents: 'none',
            }} />
            
            {/* 内容 */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* 图标 */}
              <div style={{
                fontSize: isMobile ? '48px' : '64px',
                marginBottom: '16px',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transition: 'transform 0.3s ease',
                transform: hoveredNode === node.id ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)',
              }}>
                {node.icon}
              </div>
              
              {/* 名称 */}
              <div style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '8px',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>
                {node.name}
              </div>
              
              {/* 数量标签 */}
              {node.count && (
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '20px',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: '600',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  marginBottom: '12px',
                }}>
                  {node.count >= 1000 ? `${(node.count / 1000).toFixed(0)}K+` : node.count} 知识点
                </div>
              )}
            </div>
            
            {/* 描述 */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              fontSize: isMobile ? '13px' : '14px',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.6,
              marginTop: 'auto',
              opacity: hoveredNode === node.id ? 1 : 0.9,
              transition: 'opacity 0.3s ease',
            }}>
              {node.description}
            </div>
            
            {/* 悬停提示 */}
            {hoveredNode === node.id && (
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                color: node.color,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                animation: 'slideIn 0.3s ease',
              }}>
                点击查看 →
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* 底部提示 */}
      <div style={{
        textAlign: 'center',
        marginTop: isMobile ? '20px' : '32px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <span style={{ fontSize: '16px' }}>💡</span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.95)', fontWeight: '500' }}>
            悬停查看效果 · 点击展开子分类 · 流畅丝滑体验
          </span>
        </div>
      </div>
      
      {/* CSS 动画 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(20px, -30px); opacity: 0.6; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
