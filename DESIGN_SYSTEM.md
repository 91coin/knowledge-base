# 🎨 中医药知识库设计系统

**版本**: 2.0  
**更新时间**: 2026-03-23 12:00

---

## 一、设计原则

### 1.1 核心理念
- **清晰** - 信息层次分明，一目了然
- **优雅** - 现代简约，不失中医韵味
- **流畅** - 交互丝滑，反馈及时
- **专业** - 学术严谨，可信赖

### 1.2 设计价值观
- 用户至上 - 以使用者为中心
- 内容为王 - 突出知识内容
- 细节制胜 - 精益求精
- 持续优化 - 迭代改进

---

## 二、配色方案

### 2.1 主色调

**中医红**（传承、专业）:
```
Primary-50:  #fef2f2
Primary-100: #fee2e2
Primary-200: #fecaca
Primary-300: #fca5a5
Primary-400: #f87171
Primary-500: #ef4444  ← 主色
Primary-600: #dc2626
Primary-700: #b91c1c
Primary-800: #991b1b
Primary-900: #7f1d1d
```

### 2.2 辅助色

**草木绿**（自然、健康）:
```
Green-500: #10b981
Green-600: #059669
Green-700: #047857
```

**智慧蓝**（专业、科技）:
```
Blue-500: #3b82f6
Blue-600: #2563eb
Blue-700: #1d4ed8
```

**温暖橙**（活力、亲和）:
```
Orange-500: #f59e0b
Orange-600: #d97706
Orange-700: #b45309
```

### 2.3 中性色

**文字色**:
```
Text-Primary:   #1f2937 (深灰黑)
Text-Secondary: #6b7280 (中灰)
Text-Tertiary:  #9ca3af (浅灰)
Text-Disabled:  #d1d5db (禁用)
```

**背景色**:
```
Bg-Primary:   #ffffff (纯白)
Bg-Secondary: #f9fafb (浅灰白)
Bg-Tertiary:  #f3f4f6 (灰白)
Bg-Dark:      #1f2937 (深色模式)
```

**边框色**:
```
Border-Light:  #e5e7eb
Border-Medium: #d1d5db
Border-Dark:   #9ca3af
```

---

## 三、字体系统

### 3.1 字体家族

```css
font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
font-family-serif: 'Noto Serif SC', Georgia, 'Times New Roman', serif;
```

### 3.2 字号阶梯（基于 1.25 比例）

```
text-xs:    12px (0.75rem)   - 辅助文字
text-sm:    14px (0.875rem)  - 次要文字
text-base:  16px (1rem)      - 正文
text-lg:    20px (1.25rem)   - 小标题
text-xl:    24px (1.5rem)    - 中标题
text-2xl:   30px (1.875rem)  - 大标题
text-3xl:   38px (2.375rem)  - 超大标题
text-4xl:   48px (3rem)      - 展示标题
```

### 3.3 字重

```
font-light:   300
font-normal:  400
font-medium:  500
font-semibold: 600
font-bold:    700
```

### 3.4 行高

```
leading-tight:   1.25
leading-normal:  1.5
leading-relaxed: 1.625
leading-loose:   2
```

---

## 四、间距系统（4px 基准）

```
space-1:  4px    (0.25rem)
space-2:  8px    (0.5rem)
space-3:  12px   (0.75rem)
space-4:  16px   (1rem)
space-5:  20px   (1.25rem)
space-6:  24px   (1.5rem)
space-8:  32px   (2rem)
space-10: 40px   (2.5rem)
space-12: 48px   (3rem)
space-16: 64px   (4rem)
space-20: 80px   (5rem)
space-24: 96px   (6rem)
```

**使用原则**:
- 组件内边距：space-4 / space-6
- 组件外边距：space-6 / space-8
- 区块间距：space-12 / space-16
- 页面边距：space-8 / space-12

---

## 五、圆角系统

```
rounded-sm:   2px    - 微小圆角
rounded-md:   6px    - 默认圆角
rounded-lg:   8px    - 中等圆角
rounded-xl:   12px   - 大圆角
rounded-2xl:  16px   - 超大圆角
rounded-3xl:  24px   - 展示圆角
rounded-full: 9999px - 完全圆形
```

**使用场景**:
- 按钮：rounded-lg (8px)
- 卡片：rounded-xl (12px)
- 输入框：rounded-lg (8px)
- 标签：rounded-full (完全圆形)
- 头像：rounded-full (完全圆形)

---

## 六、阴影系统

### 6.1 层级阴影

```
shadow-sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
shadow-2xl:  0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### 6.2 彩色阴影

```
shadow-primary: 0 4px 14px 0 rgba(239, 68, 68, 0.39)
shadow-success: 0 4px 14px 0 rgba(16, 185, 129, 0.39)
shadow-warning: 0 4px 14px 0 rgba(245, 158, 11, 0.39)
shadow-error:   0 4px 14px 0 rgba(220, 38, 38, 0.39)
```

### 6.3 使用场景

- 卡片悬停：shadow-lg → shadow-xl
- 按钮按下：shadow-md → shadow-sm
- 模态框：shadow-2xl
- 下拉菜单：shadow-lg
- 浮动元素：shadow-md

---

## 七、动效系统

### 7.1 缓动函数

```css
/* 标准缓动 */
ease-default: cubic-bezier(0.4, 0, 0.2, 1)

/* 入口缓动（弹性） */
ease-in-out: cubic-bezier(0.34, 1.56, 0.64, 1)

/* 出口缓动 */
ease-out: cubic-bezier(0, 0, 0.2, 1)

/* 线性 */
ease-linear: linear
```

### 7.2 动画时长

```
duration-75:   75ms    - 微交互
duration-100:  100ms   - 快速反馈
duration-200:  200ms   - 标准交互
duration-300:  300ms   - 平滑过渡
duration-500:  500ms   - 强调动画
duration-700:  700ms   - 展示动画
duration-1000: 1000ms  - 复杂动画
```

### 7.3 标准动画

**淡入**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**上浮**:
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**缩放**:
```css
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
```

**脉冲**:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 八、组件设计规范

### 8.1 按钮

**主要按钮**:
```css
background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
box-shadow: 0 4px 14px rgba(239, 68, 68, 0.39);
transition: all 0.2s ease;
```

**悬停状态**:
```css
transform: translateY(-2px);
box-shadow: 0 6px 20px rgba(239, 68, 68, 0.45);
```

**按下状态**:
```css
transform: translateY(0);
box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
```

### 8.2 卡片

**标准卡片**:
```css
background: white;
border-radius: 12px;
padding: 24px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
transition: all 0.3s ease;
```

**悬停效果**:
```css
transform: translateY(-4px);
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
```

### 8.3 输入框

**默认状态**:
```css
border: 2px solid #e5e7eb;
border-radius: 8px;
padding: 12px 16px;
transition: all 0.2s ease;
```

**聚焦状态**:
```css
border-color: #ef4444;
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
outline: none;
```

### 8.4 标签

**默认标签**:
```css
background: #f3f4f6;
color: #374151;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 500;
```

**彩色标签**:
```css
/* 成功 */
background: #d1fae5;
color: #065f46;

/* 警告 */
background: #fef3c7;
color: #92400e;

/* 错误 */
background: #fee2e2;
color: #991b1b;
```

---

## 九、响应式断点

```
sm:  640px   - 手机横屏
md:  768px   - 平板
lg:  1024px  - 小屏电脑
xl:  1280px  - 标准桌面
2xl: 1536px  - 大屏桌面
```

**布局策略**:
- < 640px: 单列布局
- 640-768px: 单列 + 抽屉导航
- 768-1024px: 双列布局
- > 1024px: 三列布局

---

## 十、无障碍设计

### 10.1 颜色对比度

- 正常文字：≥ 4.5:1
- 大文字：≥ 3:1
- UI 组件：≥ 3:1

### 10.2 焦点状态

```css
:focus-visible {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}
```

### 10.3 键盘导航

- Tab 键顺序合理
- Enter/Space 激活按钮
- Esc 关闭模态框
- 箭头键导航列表

---

## 十一、暗色模式

### 11.1 配色调整

```css
/* 背景 */
--bg-primary: #111827;
--bg-secondary: #1f2937;
--bg-tertiary: #374151;

/* 文字 */
--text-primary: #f9fafb;
--text-secondary: #d1d5db;
--text-tertiary: #9ca3af;

/* 边框 */
--border: #374151;
```

### 11.2 阴影调整

```css
/* 暗色模式阴影更柔和 */
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
```

---

## 十二、性能优化

### 12.1 图片优化

- 使用 WebP 格式
- 响应式图片（srcset）
- 懒加载（loading="lazy"）
- 适当压缩（质量 80%）

### 12.2 字体优化

- 字体子集化
- font-display: swap
- 预加载关键字体

### 12.3 代码优化

- 代码分割
- 树摇优化
- 按需加载

---

**设计系统版本**: 2.0  
**最后更新**: 2026-03-23  
**维护者**: 小满 🐾
