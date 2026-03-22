import type { Metadata } from 'next'

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
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
