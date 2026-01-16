# 部署说明

本文档说明如何构建和分发应用。

## 构建步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 构建 React 应用

```bash
npm run build
```

这会在 `dist/` 目录生成构建后的文件。

### 3. 打包 Electron 应用

#### Windows

```bash
npm run build:electron
```

生成的文件位于 `out/` 目录：
- `out/儿童情景游戏 Setup x.x.x.exe` - Windows 安装程序

#### macOS

```bash
npm run build:electron
```

生成的文件：
- `out/儿童情景游戏-x.x.x.dmg` - macOS 安装包

#### Linux

```bash
npm run build:electron
```

生成的文件：
- `out/儿童情景游戏-x.x.x.AppImage` - Linux 可执行文件

## 配置说明

### 图标文件

确保以下图标文件存在：
- `src/scenes/assets/icons/icon.png` - Linux 图标
- `src/scenes/assets/icons/icon.ico` - Windows 图标
- `src/scenes/assets/icons/icon.icns` - macOS 图标

如果图标文件不存在，打包过程可能会失败或使用默认图标。

### 应用信息

在 `package.json` 的 `build` 部分可以配置：
- `appId` - 应用唯一标识符
- `productName` - 应用显示名称
- `directories.output` - 输出目录

## 分发

### 直接分发

将 `out/` 目录中的安装包分发给用户。

### GitHub Releases

1. 在 GitHub 上创建新的 Release
2. 上传对应平台的安装包
3. 添加版本说明

### 自动构建（CI/CD）

可以使用 GitHub Actions 自动构建：

```yaml
name: Build

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run build:electron
      - uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}
          path: out/
```

## 注意事项

1. **文件大小**：Electron 应用通常较大（100MB+），因为包含了 Chromium 和 Node.js
2. **代码签名**：生产环境建议对应用进行代码签名
3. **自动更新**：可以考虑集成 `electron-updater` 实现自动更新功能
4. **隐私政策**：如果应用收集用户数据，需要提供隐私政策

## 故障排查

### 构建失败

1. 检查 Node.js 版本（需要 16+）
2. 清理并重新安装依赖：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. 检查 `package.json` 中的配置是否正确

### 应用无法启动

1. 确保已正确构建 React 应用（`dist/` 目录存在）
2. 检查 `main.js` 中的路径是否正确
3. 查看 Electron 控制台错误信息



