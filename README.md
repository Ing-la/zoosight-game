# 🎮 儿童情景游戏

一个基于 Electron + React 开发的桌面端儿童情景游戏，通过情景选择帮助分析儿童性格特征，并提供 MBTI 性格分析和职业发展建议。

## ✨ 功能特点

- 🎮 **情景互动游戏** - 通过选择探索不同场景（学校、游乐场等）
- 👥 **多用户系统** - 支持儿童账号和家长账号分离
- 📊 **性格分析报告** - 基于用户选择数据生成详细的性格分析报告
- 🧠 **MBTI 性格类型分析** - 专业的 MBTI 性格类型推断
- 💼 **职业发展建议** - 结合当前经济背景的职业建议
- 🎨 **儿童友好的 UI 设计** - 简洁美观的界面设计
- 🔒 **数据隐私保护** - 所有数据存储在本地，不上传服务器
- 🤖 **多 AI 模型支持** - 支持 Google Gemini、智谱 AI、通义千问

## 🛠️ 技术栈

- **Electron** - 桌面应用框架
- **React 18** - UI 框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **Zustand** - 状态管理
- **Google Gemini API** / **智谱 AI** / **通义千问** - AI 分析

## 📁 项目结构

```
my-child-game/
├── main.js                 # Electron 主进程
├── preload.js              # 预加载脚本
├── index.html              # HTML 入口文件
├── vite.config.js          # Vite 配置
├── package.json            # 项目配置
├── .gitignore             # Git 忽略文件
├── README.md               # 项目说明文档
├── LICENSE                 # 许可证
│
├── public/                 # 静态资源
│   └── assets/
│       ├── images/         # 图片资源
│       └── sounds/         # 音效资源
│
├── src/                    # 源代码
│   ├── api/                # API 调用
│   │   ├── ai.js           # AI 接口封装
│   │   └── gemini.js       # Gemini API（已废弃）
│   │
│   ├── components/         # React 组件
│   │   ├── HomePage.jsx    # 主页
│   │   ├── Login.jsx        # 登录页面
│   │   ├── LocationSelect.jsx  # 场景选择
│   │   ├── EventSelect.jsx     # 事件选择
│   │   ├── GameScene.jsx       # 游戏场景
│   │   ├── SceneComplete.jsx  # 场景完成
│   │   ├── ParentDashboard.jsx # 家长面板
│   │   └── ...
│   │
│   ├── scenes/             # 场景相关
│   │   ├── handlers/       # 场景处理器
│   │   │   └── DialogueHandler.js
│   │   └── types/          # 场景类型组件
│   │       └── DialogueScene.jsx
│   │
│   ├── data/               # 数据文件
│   │   ├── locations.json  # 场景数据
│   │   └── stages.json     # 关卡数据（旧版）
│   │
│   ├── styles/             # 样式文件
│   │   ├── global.css      # 全局样式
│   │   └── ...
│   │
│   ├── utils/              # 工具函数
│   │   ├── userStorage.js  # 用户数据存储
│   │   └── storage.js      # 通用存储工具
│   │
│   ├── store/              # 状态管理
│   │   └── gameStore.js    # 游戏状态
│   │
│   ├── App.jsx             # 主组件
│   └── index.jsx           # 入口文件
│
└── dist/                   # 构建输出（不提交到 Git）
└── out/                    # 打包输出（不提交到 Git）
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发运行

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

## ⚙️ 配置

### API 配置

应用支持三种 AI 模型：

1. **Google Gemini** - 默认推荐
2. **智谱 AI** (Zhipu)
3. **通义千问** (Tongyi Qianwen)

在应用内通过"家长面板" -> "API 配置"进行设置，输入对应的 API Key。

**注意**：API Key 存储在本地，不会上传到任何服务器。

### 环境变量（可选）

如果需要通过环境变量配置，可以创建 `.env` 文件：

```env
# Google Gemini API Key（可选，也可以在应用内配置）
VITE_GEMINI_API_KEY=your_api_key_here
```

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

## 🔒 数据隐私

- 所有用户数据存储在本地（使用 localStorage）
- 不会上传任何数据到服务器
- API Key 仅用于调用 AI 服务生成报告
- 建议定期备份用户数据

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

### 图片不显示

- 确保 `public/assets/images/` 目录存在
- 检查图片路径是否正确

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

仓库地址：https://github.com/Ing-la/zoosight-game

## 📝 开发计划

- [ ] 添加更多场景和事件
- [ ] 支持自定义场景配置
- [ ] 添加数据导出功能
- [ ] 优化 UI/UX
- [ ] 添加多语言支持
- [ ] 添加音效和背景音乐

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Google Gemini](https://ai.google.dev/)

## 📧 联系方式

如有问题或建议，请提交 Issue。

---

**注意**：本项目仅供学习和研究使用。使用 AI 生成的分析报告仅供参考，不应作为专业心理评估的依据。
