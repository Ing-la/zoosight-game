# 🎮 ZooSight Game

> 一个基于 Electron + React 开发的桌面端儿童情景游戏，通过情景互动帮助分析儿童性格特征，并提供专业的 MBTI 性格分析和职业发展建议。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

## ✨ 功能特点

- 🎮 **情景互动游戏** - 通过选择探索不同场景（学校、游乐场等）
- 👥 **多用户系统** - 支持儿童账号和家长账号分离管理
- 📊 **性格分析报告** - 基于用户选择数据生成详细的性格分析报告
- 🧠 **MBTI 性格类型分析** - 专业的 MBTI 性格类型推断
- 💼 **职业发展建议** - 结合当前经济背景的职业建议
- 🎨 **儿童友好的 UI 设计** - 简洁美观的界面设计
- 🔒 **数据隐私保护** - 所有数据存储在本地，不上传服务器
- 🤖 **多 AI 模型支持** - 支持 Google Gemini、智谱 AI、通义千问

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

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

这将构建 React 应用并启动 Electron 窗口。

### 构建应用

```bash
# 构建 React 应用
npm run build

# 打包 Electron 应用（生成可执行文件）
npm run build:electron
```

打包后的文件将输出到 `out/` 目录。

## 📖 使用说明

### 儿童用户

1. 启动应用后，点击"小朋友登录"
2. 注册或登录账号（昵称 + 密码）
3. 选择场景（学校、游乐场等）
4. 选择事件（进校门、午餐等）
5. 根据情景提示做出选择
6. 完成所有交互后，场景完成

### 家长用户

1. 启动应用后，点击"家长登录"
2. 登录家长账号
3. 在家长面板中：
   - 查看所有儿童账号
   - 选择要分析的账号
   - 点击"生成报告"查看 AI 分析结果
   - 配置 API Key（首次使用需要）

## ⚙️ API 配置

应用支持三种 AI 模型：

1. **Google Gemini** - 默认推荐（免费）
2. **智谱 AI (GLM)** - 国产大语言模型
3. **通义千问 (Qwen)** - 阿里云的大语言模型

在应用内通过"家长面板" -> "API 配置"进行设置，输入对应的 API Key。

**注意**：
- API Key 存储在本地，不会上传到任何服务器
- 如果不配置 API Key，将使用模拟数据生成报告
- 详细配置说明请参考 [API 配置文档](docs/api-configuration.md)

## 📁 项目结构

```
zoosight-game/
├── src/                    # 源代码
│   ├── api/               # API 调用
│   ├── components/        # React 组件
│   ├── scenes/            # 场景系统（核心）
│   ├── store/             # 状态管理
│   └── utils/             # 工具函数
├── docs/                  # 详细文档
└── README.md              # 本文件
```

## 📚 文档

详细的文档请查看 [docs](./docs/) 目录：

- [📖 文档索引](./docs/README.md) - 文档导航
- [🎯 项目介绍](./docs/project-introduction.md) - 项目架构和设计理念
- [🎮 游戏内容介绍](./docs/game-content.md) - 游戏场景和机制
- [🛠️ 开发指南](./docs/development-guide.md) - 开发环境搭建和代码结构
- [🎬 开发新场景指南](./docs/scene-development-guide.md) - 详细的新场景开发步骤
- [⚙️ API 配置说明](./docs/api-configuration.md) - API 配置和使用

## 🛠️ 技术栈

- **Electron** - 桌面应用框架
- **React 18** - UI 框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **Zustand** - 状态管理
- **Google Gemini API** / **智谱 AI** / **通义千问** - AI 分析

## 🔒 数据隐私

- ✅ 所有用户数据存储在本地（使用 localStorage）
- ✅ 不会上传任何数据到服务器
- ✅ API Key 仅用于调用 AI 服务生成报告
- ✅ 建议定期备份用户数据

## 🐛 问题排查

### 应用无法启动

1. 确保已安装 Node.js 16+
2. 删除 `node_modules` 和 `package-lock.json`，重新运行 `npm install`
3. 检查控制台错误信息

### 报告生成失败

1. 确保已配置有效的 API Key
2. 检查网络连接
3. 查看控制台错误信息
4. 如果 API Key 无效，可以使用"模拟报告"功能测试

### 场景资源不显示

- 确保场景资源文件存在于 `src/scenes/{locationId}/{eventId}/assets/` 目录
- 检查资源路径是否正确

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Google Gemini](https://ai.google.dev/)

## 📧 联系方式

如有问题或建议，请提交 [Issue](https://github.com/Ing-la/zoosight-game/issues)。

---

**注意**：本项目仅供学习和研究使用。使用 AI 生成的分析报告仅供参考，不应作为专业心理评估的依据。
