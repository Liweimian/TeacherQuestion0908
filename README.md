# 飞象老师 · 新任务组题 Demo

面向教师的新任务对话 Demo，包含：

- **新任务主页**（`new-task/`）：AI 组题、互动课件、配套练习双成果流程
- **题库选题器**（`detail-ai.html?picker=1`）：从新任务内嵌打开，支持选题加入对话

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173/`，会自动进入 `new-task/index.html`。

## 生产构建

```bash
npm run build
```

## 发布到 GitHub Pages

仓库已配置 GitHub Actions（`.github/workflows/`）：

1. **Settings → Pages → Source** 选 **GitHub Actions**
2. 推送 `main` 分支，或手动运行 **Deploy to GitHub Pages** / **Sync gh-pages branch**

也可使用 Netlify：Publish directory 填 **`.`**（根目录静态托管）。

## 目录结构

```
index.html              # 跳转到 new-task
new-task/               # 新任务 Demo（今日主要改动）
detail-ai.html/js/css   # 题库工作台 & 选题器 iframe
detail.css              # 题库基础样式
feixiang-c-library.css
theme-workspace-v50.css
```
