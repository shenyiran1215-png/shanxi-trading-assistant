# shanxi-trading-assistant

一个面向非技术人员的山西独立储能交易辅助网页（第一版）。

## 静态站点文件

项目已包含可直接发布的静态站点文件（仓库根目录）：

- `index.html`
- `styles.css`
- `script.js`

可选本地调试脚本：`run_preview.sh`（用于在云开发环境里启动静态服务并通过端口转发访问）。

## 使用 GitHub Pages 发布（推荐）

### 方式 A：从主分支根目录发布（当前结构可直接用）

1. 将当前仓库代码推送到 GitHub。
2. 打开 GitHub 仓库页面 → **Settings** → **Pages**。
3. 在 **Build and deployment** 中选择：
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`（或你的默认分支）
   - **Folder**: `/ (root)`
4. 点击 **Save**。
5. 等待 1~3 分钟，GitHub Pages 会生成公开地址（格式通常是 `https://<用户名>.github.io/<仓库名>/`）。

### 方式 B：从 `docs/` 目录发布（如果你更偏好 docs 结构）

1. 把 `index.html`、`styles.css`、`script.js` 移动到 `docs/` 目录。
2. 提交并推送后，在 Pages 设置中选择：
   - **Branch**: `main`
   - **Folder**: `/docs`
3. 保存后等待 GitHub Pages 构建完成。

## 发布后验证清单

1. 访问 GitHub Pages 提供的公开 URL（不是本地地址）。
2. 能看到中文页面和四个操作区块。
3. 上传文件后可看到检查提示与策略建议。
4. 点击“导出 recommendation.csv”可以下载文件。
