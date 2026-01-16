# 应用图标目录

## 图标文件

请将以下图标文件放置在此目录：

- `icon.png` - Linux 图标（建议 512x512）
- `icon.ico` - Windows 图标（建议包含多种尺寸：16x16, 32x32, 48x48, 256x256）
- `icon.icns` - macOS 图标（建议包含多种尺寸）

## 图标要求

- **格式**: PNG (Linux), ICO (Windows), ICNS (macOS)
- **尺寸**: 建议至少 512x512 像素
- **背景**: 建议使用透明背景或与应用主题色匹配的背景

## 生成图标

可以使用在线工具或专业软件生成图标：
- [ICO Convert](https://icoconvert.com/) - 在线转换工具
- [Image2icon](https://www.img2icnsapp.com/) - macOS 图标生成工具
- [GIMP](https://www.gimp.org/) - 免费图像编辑器

## 注意事项

- 图标文件用于 Electron 应用打包，如果不存在会使用默认图标
- 图标路径在 `package.json` 和 `main.js` 中配置



