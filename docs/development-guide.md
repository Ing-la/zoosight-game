# 🔧 开发指南

## 📋 目录

- [环境搭建](#环境搭建)
- [项目结构](#项目结构)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [构建和打包](#构建和打包)
- [部署说明](#部署说明)

## 🚀 环境搭建

### 前置要求

- **Node.js** >= 16.0.0
- **npm** >= 7.0.0
- **Git**（用于版本控制）

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/Ing-la/zoosight-game.git
cd zoosight-game
```

2. **安装依赖**

```bash
npm install
```

3. **开发运行**

```bash
npm run dev
```

这将启动开发服务器，自动构建 React 应用并启动 Electron 窗口。

## 📁 项目结构

```
zoosight-game/
├── main.js                 # Electron 主进程入口
├── preload.js              # 预加载脚本（安全隔离）
├── index.html              # HTML 入口文件
├── vite.config.js          # Vite 构建配置
├── package.json            # 项目配置和依赖
├── .gitignore             # Git 忽略文件
│
├── src/                    # 源代码目录
│   ├── api/                # API 调用层
│   │   └── ai.js           # AI 模型接口封装
│   │
│   ├── components/         # React 组件
│   │   ├── HomePage.jsx    # 主页组件
│   │   ├── Login.jsx        # 登录组件
│   │   ├── LocationSelect.jsx  # 场景选择组件
│   │   ├── EventSelect.jsx     # 事件选择组件
│   │   ├── GameScene.jsx       # 游戏场景组件（核心）
│   │   ├── SceneComplete.jsx   # 场景完成组件
│   │   ├── ParentDashboard.jsx  # 家长面板组件
│   │   ├── Report.jsx          # 报告展示组件
│   │   └── ConfigModal.jsx     # API 配置弹窗
│   │
│   ├── scenes/             # 场景系统（核心）
│   │   ├── core/           # 核心系统
│   │   │   ├── SceneLoader.js      # 场景加载器
│   │   │   ├── SceneRegistry.js    # 场景注册表
│   │   │   └── README.md           # 接口规范
│   │   │
│   │   ├── school/         # 学校场景
│   │   │   ├── entrance/   # 进校门事件
│   │   │   │   ├── config.json     # 场景配置
│   │   │   │   └── assets/         # 资源目录
│   │   │   │       ├── images/     # 图片资源
│   │   │   │       └── sounds/     # 音效资源
│   │   │   └── lunch/      # 午餐时间事件
│   │   │
│   │   ├── playground/     # 游乐场场景
│   │   │   ├── slide/      # 滑滑梯事件
│   │   │   └── swing/      # 荡秋千事件
│   │   │
│   │   ├── assets/         # 应用资源
│   │   │   └── icons/      # 应用图标
│   │   │
│   │   ├── handlers/       # 场景处理器
│   │   ├── types/          # 场景类型组件
│   │   ├── scenes-index.js # 场景索引文件
│   │   └── README.md       # 场景系统说明
│   │
│   ├── store/              # 状态管理
│   │   └── gameStore.js    # 游戏状态（Zustand）
│   │
│   ├── utils/              # 工具函数
│   │   ├── storage.js      # 通用存储工具
│   │   └── userStorage.js  # 用户数据存储
│   │
│   ├── styles/             # 样式文件
│   │   ├── global.css      # 全局样式
│   │   └── *.css           # 组件样式
│   │
│   ├── App.jsx             # 主应用组件
│   └── index.jsx           # React 入口文件
│
├── docs/                   # 项目文档
│   ├── README.md           # 文档索引
│   ├── project-introduction.md  # 项目介绍
│   ├── game-content.md     # 游戏内容
│   ├── development-guide.md    # 开发指南（本文件）
│   ├── scene-development-guide.md  # 新场景开发指南
│   ├── api-configuration.md    # API 配置
│   └── troubleshooting.md      # 故障排查
│
└── build/                  # 构建资源（不提交到 Git）
    └── icon.ico            # 应用图标
```

## 🔄 开发流程

### 添加新功能

1. **创建功能分支**

```bash
git checkout -b feature/new-feature
```

2. **开发功能**

- 编写代码
- 添加样式
- 测试功能

3. **提交更改**

```bash
git add .
git commit -m "feat: 添加新功能"
```

4. **推送分支**

```bash
git push origin feature/new-feature
```

5. **创建 Pull Request**

### 修改场景

场景修改请参考 [新场景开发指南](./scene-development-guide.md)

**注意**：所有场景配置都在 `src/scenes/` 目录下，使用模块化的场景系统。旧的 `src/data/` 目录和相关的旧组件已被移除。

### 修改样式

样式文件位于 `src/styles/` 目录：

- 每个组件有对应的 CSS 文件
- 全局样式在 `global.css`
- 使用 CSS 变量管理主题色

## 📝 代码规范

### JavaScript/JSX

- 使用 ES6+ 语法
- 组件使用函数式组件和 Hooks
- 使用 `const` 和 `let`，避免 `var`
- 使用箭头函数
- 组件名使用 PascalCase
- 文件名使用 PascalCase（组件）或 camelCase（工具函数）

### CSS

- 使用语义化的类名
- 使用 CSS 变量管理主题色
- 避免使用 `!important`
- 使用 BEM 命名规范（可选）

### Git 提交信息

使用约定式提交格式：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具相关

## 🧪 测试

### 手动测试

1. **功能测试**
   - 测试用户注册/登录
   - 测试场景选择
   - 测试游戏流程
   - 测试报告生成

2. **API 测试**
   - 测试 API 配置
   - 测试报告生成（使用模拟数据）
   - 测试不同模型的调用

### 调试技巧

1. **使用开发者工具**
   - Electron 窗口：`Ctrl+Shift+I` (Windows/Linux) 或 `Cmd+Option+I` (Mac)
   - 查看控制台日志
   - 检查网络请求

2. **查看日志**
   - 控制台会输出详细的日志信息
   - API 调用失败会有警告信息
   - 使用模拟数据会有提示

## 📦 构建和打包

### 开发构建

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 生产打包

#### Windows

```powershell
# 设置国内镜像（推荐，避免网络问题）
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"

# 构建 React 应用
npm run build

# 打包 Electron 应用
npm run pack              # 只打包目录
npm run build:electron    # 创建安装程序
```

#### Linux/macOS

```bash
# 设置国内镜像（推荐）
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"

# 构建 React 应用
npm run build

# 打包 Electron 应用
npm run pack              # 只打包目录
npm run build:electron    # 创建安装程序
```

### 打包结果

- `npm run pack`：生成 `out/win-unpacked/` 目录，包含可直接运行的 `儿童情景游戏.exe`
- `npm run build:electron`：生成 `out/儿童情景游戏 Setup x.x.x.exe` 安装程序，**同时也会生成** `out/win-unpacked/` 目录

### 打包配置

打包配置在 `package.json` 的 `build` 字段中：

- `appId` - 应用 ID
- `productName` - 产品名称
- `directories.output` - 输出目录
- `files` - 包含的文件
- `win.icon` / `mac.icon` / `linux.icon` - 各平台图标

### 图标文件

确保以下图标文件存在：

- Windows: `src/scenes/assets/icons/icon.ico`
- macOS: `src/scenes/assets/icons/icon.icns`
- Linux: `src/scenes/assets/icons/icon.png`

## 🚀 部署说明

### 本地部署

1. **构建应用**

```bash
npm run build
npm run build:electron
```

2. **分发应用**

- Windows: 分发 `out/儿童情景游戏 Setup x.x.x.exe` 安装程序
- macOS: 分发 `out/儿童情景游戏-x.x.x.dmg` 安装包
- Linux: 分发 `out/儿童情景游戏-x.x.x.AppImage` 文件

### 注意事项

- 打包后的应用大小约 300MB+（包含 Electron 运行时）
- 确保目标系统满足运行要求
- 首次运行可能需要网络连接（下载 Electron 运行时）

## 🔍 常见问题

详细故障排查请参考 [故障排查文档](./troubleshooting.md)

---

**Happy Coding!** 🎉


