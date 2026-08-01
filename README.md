# 💕 我们的恋爱纪念册

一个浪漫的恋爱纪念网站，用于记录和女朋友在一起的每一个甜蜜瞬间。

## 🌐 特性

- 💖 **纪念日倒计时** — 首页自动计算在一起的天数
- 📖 **故事时间线** — 记录恋爱中的重要时刻
- 📸 **照片墙** — 分类展示照片，支持灯箱浏览
- 💌 **恋爱笔记** — 写给你的每一封信
- 🌙 **暗色模式** — 支持明暗主题切换
- 📱 **响应式设计** — 手机和电脑都好看
- 🇨🇳 **国内可访问** — 无 Google 资源，系统字体，Cloudflare Pages 托管

## 🚀 快速开始

### 1. 修改纪念日

打开 `js/main.js`，修改第 8 行的日期：

```javascript
const ANNIVERSARY_DATE = new Date('2024-02-14T00:00:00');
//                                  ↑ 改成你们在一起的第一天
```

### 2. 添加照片

1. 把照片放到 `images/` 文件夹
2. 打开 `gallery.html`，参考模板添加照片：

```html
<div class="gallery-item" data-category="date">
  <img src="images/photo1.jpg" alt="照片描述" loading="lazy">
  <div class="gallery-caption">📸 照片描述文字</div>
</div>
```

分类可选：`date`（约会）、`travel`（旅行）、`daily`（日常）、`special`（特别日子）

### 3. 添加故事时刻

打开 `story.html`，复制 `.timeline-item` 块：

```html
<div class="timeline-item">
  <div class="timeline-dot"></div>
  <div class="timeline-content">
    <div class="timeline-date">日期</div>
    <h3>标题</h3>
    <p>描述</p>
  </div>
</div>
```

### 4. 写恋爱笔记

1. 在 `notes/` 文件夹创建新 HTML 文件（参考 `first-letter.html`）
2. 在 `notes.html` 中添加卡片链接

### 5. 本地预览

用任意方式启动本地服务器：

```bash
# Python 方式
cd love-story
python3 -m http.server 8080

# 然后浏览器打开 http://localhost:8080
```

## 📦 部署上线

### Cloudflare Pages（免费，国内可访问）

1. 把代码推送到 GitHub 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Pages → 创建项目 → 连接 GitHub
4. 构建设置：无需构建命令，输出目录留空
5. 部署！获得 `xxx.pages.dev` 域名

### 绑定自定义域名（可选）

1. 在 [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) 购买域名（~$10/年）
2. 在 Cloudflare Pages 中添加自定义域名
3. 自动配置 SSL 证书

## 📁 文件结构

```
love-story/
├── index.html          # 首页（倒计时 + 入口）
├── story.html          # 故事时间线
├── gallery.html        # 照片墙
├── notes.html          # 恋爱笔记列表
├── css/
│   └── style.css       # 所有样式
├── js/
│   └── main.js         # 倒计时、主题、特效
├── images/             # 📸 照片放这里
├── notes/              # 💌 笔记文章放这里
│   ├── first-letter.html
│   └── spring.html
└── README.md
```

## 🎨 自定义

- **颜色**：编辑 `css/style.css` 中的 `:root` 变量
- **字体**：默认使用系统字体（苹方/微软雅黑），无需修改
- **特效**：在 `js/main.js` 中调整爱心飘落频率

---

Made with 💕 for the one I love
