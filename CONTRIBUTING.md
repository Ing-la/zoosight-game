# 贡献指南

感谢您对本项目的关注！我们欢迎所有形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/Ing-la/zoosight-game/issues) 确认问题未被报告
2. 创建新的 Issue，包含：
   - 清晰的问题描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 环境信息（操作系统、Node.js 版本等）

### 提交代码

1. Fork 本项目
2. 创建特性分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. 进行更改并提交：
   ```bash
   git commit -m "Add: 描述你的更改"
   ```
4. 推送到你的 Fork：
   ```bash
   git push origin feature/your-feature-name
   ```
5. 创建 Pull Request

### 代码规范

- 使用 2 个空格缩进
- 使用单引号（JavaScript）
- 组件文件名使用 PascalCase（如 `GameScene.jsx`）
- 工具函数文件名使用 camelCase（如 `userStorage.js`）
- 提交信息使用中文，格式：`类型: 简短描述`
  - `Add:` 新功能
  - `Fix:` 修复 bug
  - `Update:` 更新功能
  - `Refactor:` 重构代码
  - `Docs:` 文档更新

### 开发流程

1. 克隆项目：
   ```bash
   git clone https://github.com/Ing-la/zoosight-game.git
   cd zoosight-game
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行开发环境：
   ```bash
   npm run dev
   ```

4. 进行更改并测试

5. 确保代码可以正常构建：
   ```bash
   npm run build
   ```

### 添加新场景

1. 编辑 `src/data/locations.json`
2. 添加新的 location 或 event
3. 确保 interactions 结构正确
4. 测试新场景是否正常工作

### 添加新的 AI 模型支持

1. 在 `src/api/ai.js` 中添加新的 API 调用函数
2. 在 `src/components/ConfigModal.jsx` 中添加模型选项
3. 更新 `generateReport` 函数以支持新模型
4. 更新文档

## 问题反馈

如有任何问题，请通过以下方式联系：

- 提交 [Issue](https://github.com/Ing-la/zoosight-game/issues)
- 发送邮件（如果有）

感谢您的贡献！🎉

