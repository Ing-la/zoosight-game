# Picture 目录说明

这个目录用于存放待处理的图片文件。脚本会自动将图片复制到对应的场景目录。

## 📋 命名规则

### 格式
```
{locationId}-{eventId}-{description}.png
```

### 示例
- `school-entrance-teacher_greeting.png` → 复制到 `src/scenes/school/entrance/assets/images/teacher_greeting.png`
- `school-lunch-eating.png` → 复制到 `src/scenes/school/lunch/assets/images/eating.png`
- `playground-slide-playing.png` → 复制到 `src/scenes/playground/slide/assets/images/playing.png`

### 中文命名支持
也可以使用中文命名，脚本会自动映射：
- `学校-进校门-长颈鹿老师打招呼.png` → `teacher_greeting.png`
- `学校-午餐-吃饭.png` → `eating.png`

## 🚀 使用方法

### 方法1：使用 npm 脚本（推荐）
```bash
npm run copy-images
```

### 方法2：直接运行脚本
```bash
node scripts/copy-images.js
```

## 📝 当前支持的场景

- **school** (学校)
  - entrance (进校门)
  - lunch (午餐)

- **playground** (游乐场)
  - slide (滑滑梯)
  - swing (荡秋千)

## ⚙️ 添加新的命名映射

如果需要添加新的中文到英文的映射，请编辑 `scripts/copy-images.js` 文件中的 `imageNameMapping` 对象。

## 📌 注意事项

1. 图片文件名必须包含场景ID和事件ID（用 `-` 分隔）
2. 图片会被重命名为英文名（小写，用下划线分隔）
3. 如果目标目录不存在，脚本会自动创建
4. 同名文件会被覆盖

## 🖼️ 头像文件

头像文件（如 `长颈鹿老师头像.png`）需要手动复制到对应的场景目录，因为它们不遵循场景-事件的命名规则。

头像文件应该放在：
```
src/scenes/{locationId}/{eventId}/assets/images/{character}_avatar.png
```

例如：
- `长颈鹿老师头像.png` → `src/scenes/school/entrance/assets/images/teacher_avatar.png`
- `狐狸同学头像.png` → `src/scenes/school/entrance/assets/images/classmate_avatar.png`

