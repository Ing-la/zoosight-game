# 场景系统说明

## 📁 目录结构

```
src/scenes/
  core/                    # 核心系统
    SceneLoader.js         # 场景加载器
    SceneRegistry.js       # 场景注册表
    README.md             # 接口规范文档
  
  school/                  # 学校场景
    entrance/             # 进校门事件
      config.json         # 场景配置文件
      assets/            # 资源目录
        images/          # 图片资源
        sounds/          # 音效资源
    
    lunch/                # 午餐时间事件
      config.json
      assets/
        images/
        sounds/
  
  playground/             # 游乐场场景
    slide/               # 滑滑梯事件
      config.json
      assets/
        images/
        sounds/
    
    swing/               # 荡秋千事件
      config.json
      assets/
        images/
        sounds/
  
  scenes-index.js         # 场景索引文件（自动生成）
```

## 🎯 架构设计

### 按场景（地点）封装
- 每个场景（地点）是一个顶级目录，如 `school/`、`playground/`
- 每个场景下包含多个事件（event），如 `school/entrance/`、`school/lunch/`
- 每个事件目录包含：
  - `config.json` - 场景配置文件（必需）
  - `assets/` - 资源目录（可选）
    - `images/` - 图片资源
    - `sounds/` - 音效资源

### 资源管理
- **完全移除了 `public/` 目录**
- 应用图标位于 `src/scenes/assets/icons/` 目录
- 所有场景资源都封装在对应的场景目录下
- 资源路径：`/scenes/{locationId}/{eventId}/assets/{type}/{filename}`

## 🚀 开发新场景步骤

### 1. 创建场景目录

如果场景（地点）已存在，直接在该目录下创建事件目录：
```
src/scenes/school/new-event/
```

如果场景（地点）不存在，先创建场景目录：
```
src/scenes/new-location/
  new-event/
    config.json
    assets/
      images/
      sounds/
```

### 2. 创建配置文件

在事件目录下创建 `config.json`，格式如下：

```json
{
  "id": "entrance",
  "name": "进校门",
  "icon": "🚪",
  "description": "早上来到学校门口",
  "locationId": "school",
  "eventId": "entrance",
  "interactions": [
    {
      "id": "i1",
      "character": "teacher",
      "characterName": "老师",
      "dialogue": "老师：早上好！今天心情怎么样？",
      "options": [
        {
          "id": "opt-1",
          "text": "大声说'老师早上好！'",
          "traits": {
            "外向": 3,
            "礼貌": 2
          },
          "next": "i2"
        }
      ]
    }
  ]
}
```

### 3. 添加资源（可选）

如果需要图片或音效：
1. 在事件目录下创建 `assets/images/` 或 `assets/sounds/`
2. 将资源文件放入对应目录
3. 在代码中使用 `sceneLoader.getAssetPath(locationId, eventId, 'images/xxx.png')` 获取路径

### 4. 注册场景

在 `src/scenes/scenes-index.js` 中：
1. 导入场景配置：`import newEvent from './new-location/new-event/config.json';`
2. 添加到 `sceneConfigs` 对象：`'new-location-new-event': newEvent`
3. 如果地点是新的，在 `locationMetadata` 中添加地点信息

### 5. 完成！

无需修改其他代码，系统会自动识别新场景。

## 📝 配置字段说明

### 必需字段
- `id`: 事件ID（与 eventId 相同）
- `name`: 场景名称
- `icon`: 场景图标（emoji）
- `description`: 场景描述
- `locationId`: 地点ID（必须与目录名一致）
- `eventId`: 事件ID（必须与目录名一致）
- `interactions`: 对话交互数组

### interactions 字段
- `id`: 交互ID
- `character`: 角色类型（teacher/classmate）
- `characterName`: 角色显示名称
- `dialogue`: 对话内容
- `options`: 选项数组

### options 字段
- `id`: 选项ID
- `text`: 选项文本
- `traits`: 性格特征得分对象
- `next`: 下一个交互ID（null 表示结束）

## 🔧 资源路径

### 获取资源路径

```javascript
import sceneLoader from '../scenes/core/SceneLoader';

// 方式1：使用地点ID和事件ID
const imagePath = sceneLoader.getAssetPath('school', 'entrance', 'images/background.png');
// 结果：/scenes/school/entrance/assets/images/background.png

// 方式2：使用场景ID（兼容旧接口）
const soundPath = sceneLoader.getAssetPathBySceneId('school-entrance', 'sounds/bgm.mp3');
// 结果：/scenes/school/entrance/assets/sounds/bgm.mp3
```

### 在组件中使用

```jsx
<img src={sceneLoader.getAssetPath('school', 'entrance', 'images/character.png')} />
```

## ✅ 优势

1. **模块化**: 每个场景独立，互不干扰
2. **易扩展**: 添加新场景只需创建目录和配置文件
3. **资源集中**: 场景资源集中管理，完全封装在场景目录下
4. **维护性**: 修改场景不影响其他场景
5. **规范性**: 统一的接口规范，降低开发成本
6. **清晰结构**: 按场景分类，结构清晰明了
7. **无依赖**: 不再依赖 public 目录，所有资源都在 src 目录下

## 📚 相关文档

- `src/scenes/core/README.md` - 接口规范文档
- `REFACTORING_SUMMARY.md` - 重构总结文档
