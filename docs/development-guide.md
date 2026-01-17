# 🛠️ 开发指南

## 📋 环境要求

- **Node.js** >= 16.0.0
- **npm** >= 7.0.0
- **Git** (可选，用于版本控制)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/Ing-la/zoosight-game.git
cd zoosight-game
```

### 2. 安装依赖

```bash
npm install
```

### 3. 开发运行

```bash
npm run dev
```

这将构建 React 应用并启动 Electron 窗口。

### 4. 构建应用

```bash
# 构建 React 应用
npm run build

# 打包 Electron 应用（生成可执行文件）
npm run build:electron
```

打包后的文件将输出到 `out/` 目录。

## 📁 代码结构

### 核心目录

```
src/
├── api/              # API 调用
│   └── ai.js         # AI 接口封装
│
├── components/       # React 组件
│   ├── HomePage.jsx  # 主页
│   ├── Login.jsx     # 登录页面
│   └── ...
│
├── scenes/           # 场景系统（核心）
│   ├── core/         # 核心系统
│   ├── school/       # 学校场景
│   └── playground/   # 游乐场场景
│
├── store/            # 状态管理
│   └── gameStore.js  # 游戏状态
│
├── utils/             # 工具函数
│   ├── userStorage.js # 用户数据存储
│   └── storage.js    # 通用存储工具
│
└── styles/            # 样式文件
```

### 关键文件说明

#### `src/api/ai.js`
- AI 接口封装
- 支持 Gemini、智谱、通义千问
- 包含模拟数据生成（用于测试）

#### `src/scenes/core/SceneLoader.js`
- 场景加载器
- 负责加载场景配置和资源

#### `src/scenes/core/SceneRegistry.js`
- 场景注册表
- 管理所有场景的注册和查询

#### `src/store/gameStore.js`
- 游戏状态管理（使用 Zustand）
- 管理用户选择、性格特征等

#### `src/utils/userStorage.js`
- 用户数据存储
- 管理用户账号、游戏数据等

## 🔧 开发流程

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

场景修改请参考 [开发新场景指南](./scene-development-guide.md)

### 修改样式

样式文件位于 `src/styles/` 目录：
- 每个组件有对应的 CSS 文件
- 全局样式在 `global.css`
- 使用 CSS 变量管理主题色

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

```bash
npm run build:electron
```

打包产物在 `out/` 目录，包含：
- Windows: `.exe` 安装包
- macOS: `.dmg` 安装包
- Linux: `.AppImage` 文件

### 打包配置

打包配置在 `package.json` 的 `build` 字段中：
- `appId` - 应用 ID
- `productName` - 产品名称
- `directories.output` - 输出目录
- `files` - 包含的文件

### 图标文件

确保以下图标文件存在（如果不存在，打包时可能会失败）：
- `src/scenes/assets/icons/icon.png` - Linux 图标
- `src/scenes/assets/icons/icon.ico` - Windows 图标
- `src/scenes/assets/icons/icon.icns` - macOS 图标

### 分发

#### 直接分发

将 `out/` 目录中的安装包分发给用户。

#### GitHub Releases

1. 在 GitHub 上创建新的 Release
2. 上传对应平台的安装包
3. 添加版本说明

#### 注意事项

1. **文件大小**：Electron 应用通常较大（100MB+），因为包含了 Chromium 和 Node.js
2. **代码签名**：生产环境建议对应用进行代码签名
3. **自动更新**：可以考虑集成 `electron-updater` 实现自动更新功能
4. **隐私政策**：如果应用收集用户数据，需要提供隐私政策

## 🔍 常见问题

### 应用无法启动

1. 确保已安装 Node.js 16+
2. 删除 `node_modules` 和 `package-lock.json`
3. 重新运行 `npm install`
4. 检查控制台错误信息

### 场景资源不显示

1. 确保资源文件存在于正确路径
2. 检查资源路径是否正确
3. 使用 `sceneLoader.getAssetPath()` 获取正确的资源路径

### API 调用失败

1. 确保已配置有效的 API Key
2. 检查网络连接
3. 查看控制台错误信息
4. 如果 API Key 无效，可以使用模拟数据测试

### 构建失败

1. 检查 Node.js 版本
2. 清理 `node_modules` 和 `dist/` 目录
3. 重新安装依赖
4. 检查 `vite.config.js` 配置

## 📚 相关文档

- [开发新场景指南](./scene-development-guide.md) - 详细的新场景开发步骤
- [API 配置说明](./api-configuration.md) - API 配置和使用
- [项目介绍](./project-introduction.md) - 项目架构和设计理念

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

**返回**: [文档索引](./README.md)

