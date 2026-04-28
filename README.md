# Hydra GitHub Pages 部署指南

## 📁 文件结构

```
docs/
├── index.html       # 中文主页
├── index_en.html    # English Homepage
├── privacy.html     # 中文隐私政策
├── privacy_en.html  # English Privacy Policy
├── terms.html       # 中文用户协议
├── terms_en.html    # English Terms of Service
└── README.md        # 部署说明（本文件）
```

## 🚀 部署步骤

### 方式一：通过 GitHub Pages（推荐）

1. **创建 gh-pages 分支**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r docs/* .
   git add .
   git commit -m "Deploy GitHub Pages"
   git push origin gh-pages
   ```

2. **启用 GitHub Pages**
   - 进入 GitHub 仓库 → Settings
   - 滚动到 "GitHub Pages" 部分
   - Source 选择：`gh-pages` branch
   - 点击 Save

3. **访问网站**
   - 地址：`https://sipra-ai-lab.github.io/Sipra-index/`

### 方式二：通过 docs/ 文件夹

1. **在 main 分支创建 docs 文件夹**（已完成）
   ```bash
   # docs 文件夹已创建
   ```

2. **启用 GitHub Pages**
   - 进入 GitHub 仓库 → Settings
   - GitHub Pages → Source 选择：`/ (root)` 或 `/docs`
   - 点击 Save

## 📝 自定义修改

### 更改品牌信息

**index.html** 中搜索并替换：
- `support@sipra.vip` → 您的邮箱
- `@sipraapp` → 您的社交媒体账号
- App Store 链接（上架后添加）

### 更新法律声明

**privacy.html** 和 **terms.html** 中的联系信息：
```html
<a href="mailto:support@sipra.vip">support@sipra.vip</a>
```

## 🎨 自定义样式

所有页面使用内联 CSS，可直接修改：

### 主色调
```css
background: linear-gradient(135deg, #4A90E2, #00D4AA);
```

### 替换为 App 图标
```html
<div class="app-icon">💧</div>
```
替换为：
```html
<div class="app-icon">
  <img src="app-icon.png" width="120" height="120">
</div>
```

## 🌍 多语言支持

### 中文版
- 主页: `index.html`
- 隐私政策: `privacy.html`
- 用户协议: `terms.html`

### English Version
- Homepage: `index_en.html`
- Privacy Policy: `privacy_en.html`
- Terms of Service: `terms_en.html`

### 语言切换
每个页面顶部都有语言切换按钮，方便用户在中英文之间切换。

## 📱 App Store Connect 配置

上架国际版本时，在 App Store Connect 中添加以下链接：

### 中国区 (中文)
```
Privacy Policy URL: https://sipra-ai-lab.github.io/Sipra-index/privacy.html
Terms of Use URL: https://sipra-ai-lab.github.io/Sipra-index/terms.html
Support URL: https://sipra-ai-lab.github.io/Sipra-index/index.html
```

### 国际区 (English)
```
Privacy Policy URL: https://sipra-ai-lab.github.io/Sipra-index/privacy_en.html
Terms of Use URL: https://sipra-ai-lab.github.io/Sipra-index/terms_en.html
Support URL: https://sipra-ai-lab.github.io/Sipra-index/index_en.html
```

### 其他地区
可根据目标市场选择中文或英文版本，或添加更多语言版本。

## ✅ 部署检查清单

- [ ] 替换所有邮箱地址
- [ ] 添加 App Store 下载链接
- [ ] 更新社交媒体链接
- [ ] 确认隐私政策符合当地法律
- [ ] 测试所有页面链接正常
- [ ] 验证移动端显示效果

## 🔗 常用链接

部署后，在 App Store Connect 中添加：
- 隐私政策：`https://sipra-ai-lab.github.io/Sipra-index/privacy.html`
- 用户协议：`https://sipra-ai-lab.github.io/Sipra-index/terms.html`
- 支持页面：`https://sipra-ai-lab.github.io/Sipra-index/index.html`
