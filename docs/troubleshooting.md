# 🔧 故障排查指南

## 📋 目录

- [安装和运行问题](#安装和运行问题)
- [构建和打包问题](#构建和打包问题)
- [API 相关问题](#api-相关问题)
- [场景和资源问题](#场景和资源问题)
- [其他问题](#其他问题)

## 🚀 安装和运行问题

### 问题：npm install 失败

**症状**：
```
npm ERR! code ENOTFOUND
npm ERR! errno ENOTFOUND
npm ERR! network request to https://registry.npmjs.org/...
```

**原因**：
- 网络连接问题
- npm 镜像源问题

**解决方案**：

1. **使用国内镜像源**

```bash
# 临时使用
npm install --registry=https://registry.npmmirror.com

# 永久设置
npm config set registry https://registry.npmmirror.com
```

2. **检查网络连接**

确保网络连接正常，可以访问 npm 仓库。

### 问题：应用无法启动

**症状**：
- 运行 `npm run dev` 后没有反应
- 出现错误信息

**解决方案**：

1. **检查 Node.js 版本**

```bash
node --version
```

确保 Node.js >= 16.0.0

2. **清理并重新安装**

```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

3. **检查端口占用**

确保端口 5173（Vite 开发服务器）未被占用。

### 问题：Electron 窗口无法打开

**症状**：
- 构建成功但窗口不显示
- 窗口显示但内容空白

**解决方案**：

1. **检查控制台错误**

按 `Ctrl+Shift+I` (Windows/Linux) 或 `Cmd+Option+I` (Mac) 打开开发者工具，查看错误信息。

2. **检查 dist 目录**

确保 `npm run build` 成功生成了 `dist/` 目录。

3. **检查 main.js**

确保 `main.js` 中的路径正确。

## 📦 构建和打包问题

### 问题：electron-builder 网络超时

**症状**：
```
⨯ Get "https://github.com/electron/electron/releases/download/...": read tcp ...: wsarecv: A connection attempt failed
```

**原因**：
- 网络连接问题
- GitHub 访问受限

**解决方案**：

1. **使用国内镜像**

```powershell
# Windows PowerShell
$env:ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm run build:electron
```

```bash
# Linux/macOS
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm run build:electron
```

2. **使用代理**

如果使用代理，确保代理配置正确。

3. **使用 VPN**

如果网络受限，可以使用 VPN。

### 问题：符号链接权限错误

**症状**：
```
⨯ Cannot create symbolic link: A required privilege is not held by the client
```

**原因**：
- Windows 权限不足
- 需要管理员权限

**解决方案**：

1. **以管理员身份运行 PowerShell**

- 右键点击 PowerShell
- 选择"以管理员身份运行"
- 然后执行打包命令

2. **启用开发者模式**（Windows 10/11）

- 打开"设置" → "更新和安全" → "开发者选项"
- 启用"开发人员模式"
- 这样普通用户也可以创建符号链接

3. **使用 `--dir` 选项**（仅打包目录，不创建安装程序）

```bash
npm run pack
```

这会跳过一些需要符号链接的步骤。

### 问题：图标文件不存在或图标未生效

**症状**：
```
⨯ default Electron icon is used  reason=application icon is not set
```

或者打包成功，但 exe 文件仍显示默认图标。

**原因**：
1. 图标文件路径不正确或文件不存在
2. ICO 文件格式不正确（不是真正的 ICO 格式，或缺少多尺寸）
3. `signAndEditExecutable` 未启用，导致 exe 图标未被修改
4. Windows 图标缓存问题

**解决方案**：

1. **检查图标文件是否存在**

- Windows: `src/scenes/assets/icons/icon.ico`
- macOS: `src/scenes/assets/icons/icon.icns`
- Linux: `src/scenes/assets/icons/icon.png`

2. **确保 ICO 文件格式正确**

- ICO 文件必须包含多个尺寸：16x16, 32x32, 48x48, 256x256
- 不能只是重命名的 PNG 文件
- 可以使用在线工具（如 [ICO Convert](https://icoconvert.com/)）生成正确的 ICO 文件

3. **启用 `signAndEditExecutable`**

在 `package.json` 的 `build.win` 中添加：

```json
"win": {
  "target": "nsis",
  "icon": "src/scenes/assets/icons/icon.ico",
  "signAndEditExecutable": true
}
```

4. **清除 Windows 图标缓存**

```powershell
# 方法 1：重启资源管理器
taskkill /f /im explorer.exe && start explorer.exe

# 方法 2：使用系统工具
ie4uinit.exe -show

# 方法 3：重启电脑
```

5. **重新打包**

删除 `out/` 和 `dist/` 目录，然后重新打包：

```bash
npm run build
npm run build:electron
```

### 问题：打包后的应用无法运行

**症状**：
- 打包成功但 exe 无法启动
- 启动后立即崩溃

**解决方案**：

1. **检查控制台错误**

运行打包后的 exe，查看是否有错误信息。

2. **检查依赖**

确保所有依赖都已正确打包。

3. **检查文件完整性**

确保 `out/win-unpacked/` 目录中的文件完整。

## 🤖 API 相关问题

### 问题：API Key 配置后无法生成报告

**症状**：
- 配置 API Key 后点击"生成报告"没有反应
- 显示"API 调用失败"

**解决方案**：

1. **检查 API Key**

- 确保 API Key 正确，没有多余空格
- 确保 API Key 还有可用额度

2. **检查网络连接**

- 确保网络连接正常
- 检查防火墙设置

3. **检查控制台错误**

打开开发者工具，查看控制台错误信息。

4. **尝试切换模型**

如果某个模型无法使用，尝试切换到其他模型。

### 问题：报告生成很慢

**症状**：
- 点击"生成报告"后等待时间很长

**原因**：
- API 响应慢
- 网络延迟

**解决方案**：

1. **检查网络连接**

确保网络连接稳定。

2. **使用模拟数据**

如果没有配置 API Key，系统会自动使用模拟数据，速度会更快。

3. **检查 API 服务状态**

检查 AI 服务商的服务状态。

## 🎮 场景和资源问题

### 问题：场景无法加载

**症状**：
- 选择场景后没有反应
- 显示"场景加载失败"

**解决方案**：

1. **检查配置文件**

- 确保 `config.json` 格式正确
- 检查 `locationId` 和 `eventId` 是否与目录名一致

2. **检查场景注册**

- 确保场景已在 `scenes-index.js` 中注册
- 检查导入路径是否正确

3. **查看控制台错误**

打开开发者工具，查看控制台错误信息。

### 问题：资源文件无法显示

**症状**：
- 场景图片不显示
- 显示图片加载失败

**解决方案**：

1. **检查资源文件**

- 确保资源文件存在于 `assets/images/` 目录
- 检查文件名是否正确

2. **检查资源路径**

- 确保 `config.json` 中的路径正确
- 使用相对路径，如 `"image": "teacher_greeting.png"`

3. **检查文件格式**

- 确保图片格式正确（PNG、JPG）
- 确保文件没有损坏

## 🔧 其他问题

### 问题：用户数据丢失

**症状**：
- 之前注册的用户不见了
- 游戏进度丢失

**原因**：
- localStorage 被清除
- 浏览器数据被清除

**解决方案**：

1. **检查 localStorage**

打开开发者工具，查看 Application → Local Storage。

2. **备份数据**

建议定期备份用户数据。

3. **恢复数据**

如果有备份，可以手动恢复数据。

### 问题：应用占用内存过大

**症状**：
- 应用运行缓慢
- 内存占用高

**解决方案**：

1. **关闭不必要的窗口**

确保只打开一个应用窗口。

2. **清理缓存**

定期清理应用缓存。

3. **重启应用**

如果内存占用过高，重启应用。

## 📞 获取帮助

如果以上解决方案都无法解决问题，可以：

1. **查看 GitHub Issues**

在 [GitHub Issues](https://github.com/Ing-la/zoosight-game/issues) 中搜索类似问题。

2. **提交新 Issue**

如果问题仍未解决，可以提交新的 Issue，包含：
- 问题描述
- 错误信息
- 复现步骤
- 系统环境信息

3. **查看文档**

查看其他文档获取更多信息。

---

**希望这些解决方案能帮助你解决问题！** 🛠️

