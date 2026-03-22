import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '宋宋的知识库',
  description: '整合中医、西医、方剂等医学知识的综合知识库',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
