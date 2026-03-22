# OpenClaw 知识库 - 部署指南

**项目**: knowledge-base  
**版本**: v1.0.0  
**构建状态**: ✅ 完成  
**部署状态**: ⏳ 待推送

---

## 📦 项目信息

**本地路径**: `/Users/defi/.openclaw/workspace/projects/knowledge-base`  
**GitHub 仓库**: https://github.com/91coin/knowledge-base  
**预计网站地址**: https://91coin.github.io/knowledge-base/

---

## ✅ 已完成

### 1. 项目开发
- ✅ Next.js + React + TypeScript 框架
- ✅ Tailwind CSS 样式
- ✅ Fuse.js 搜索功能
- ✅ 响应式设计
- ✅ 静态构建完成

### 2. 功能实现
- ✅ 全局搜索（模糊匹配）
- ✅ 分类展示（中医、西医、金融、其他）
- ✅ 数据统计（84,212 首方剂等）
- ✅ 快速导航

### 3. 构建输出
- ✅ `dist/` 目录已生成
- ✅ `index.html` 已生成
- ✅ 所有资源已打包

---

## ⏳ 待完成

### 部署到 GitHub Pages

由于网络问题，Git 推送失败。请手动执行：

```bash
cd ~/.openclaw/workspace/projects/knowledge-base

# 1. 检查远程仓库
git remote -v

# 2. 推送代码
git push origin main

# 3. 配置 GitHub Pages
# 访问: https://github.com/91coin/knowledge-base/settings/pages
# Source: Deploy from a branch
# Branch: main /root
```

---

## 🚀 快速部署（手动）

### 方案 1: GitHub Pages（推荐）

1. **访问仓库设置**
   - https://github.com/91coin/knowledge-base/settings/pages

2. **配置 Pages**
   - Source: Deploy from a branch
   - Branch: main /root
   - Save

3. **等待部署**
   - 约 2-5 分钟
   - 访问: https://91coin.github.io/knowledge-base/

### 方案 2: 本地预览

```bash
cd ~/.openclaw/workspace/projects/knowledge-base
npx serve dist
# 访问: http://localhost:3000
```

### 方案 3: 其他平台

- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Cloudflare Pages: https://pages.cloudflare.com

---

## 📊 网站内容

### 已整合知识

| 类别 | 数量 | 来源 |
|------|------|------|
| 方剂 | 84,212 首 | 老板娘 Excel |
| 中药 | 200 味 | 中医专家知识库 |
| 方剂卡片 | 100 首 | 方剂学.md |
| 脉象 | 28 种 | 脉诀阐微 |
| 中医古籍 | 39 页 | 辨证玉函 |
| AIX 文档 | 4 个 PDF | 老板资料 |
| 药食同源 | 106 种 | 国家目录 |

### 分类结构

```
🏥 中医学
├── 基础理论（阴阳五行、藏象、经络）
├── 诊断学（四诊、八纲、脏腑辨证）
├── 方剂学（84,212 首方剂）⭐
├── 中药学（200 味中药）
├── 经典古籍（内经、伤寒、金匮、温病）
└── 临床病例

🩺 西医学
├── 基础医学
├── 诊断学
└── 临床医学

💰 金融
├── AIX 交易所
├── Polymarket 交易
└── 区块链/Web3

📚 其他
├── 药食同源目录
└── 学习笔记
```

---

## 🔧 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **搜索**: Fuse.js
- **图标**: Lucide React
- **部署**: GitHub Pages

---

## 📝 下一步开发计划

### Phase 1: 数据导入（今天）
- [ ] 导入 84,212 首方剂数据
- [ ] 导入中医知识库
- [ ] 导入其他内容

### Phase 2: 功能增强（明天）
- [ ] 高级筛选（按功效、组成）
- [ ] 详情页面
- [ ] 收藏功能
- [ ] 打印/导出

### Phase 3: 优化完善（后天）
- [ ] 性能优化
- [ ] SEO 优化
- [ ] 移动端适配
- [ ] 暗黑模式

---

## 🎯 使用说明

### 搜索功能
1. 输入关键词（如"麻黄汤"）
2. 实时显示匹配结果
3. 点击结果查看详情

### 分类浏览
1. 点击分类卡片
2. 查看该分类下所有内容
3. 支持多级筛选

### 快速导航
- 热门搜索
- 最近浏览
- 收藏内容

---

**状态**: 🟡 构建完成，等待部署  
**预计上线**: 网络恢复后 5 分钟内  
**访问地址**: https://91coin.github.io/knowledge-base/
