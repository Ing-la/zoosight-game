# 🎬 开发新场景指南

本指南将详细介绍如何为 ZooSight Game 添加新的游戏场景。

## 📋 前置知识

在开始之前，建议先了解：
- [项目介绍](./project-introduction.md) - 了解项目架构
- [游戏内容介绍](./game-content.md) - 了解游戏机制
- [开发指南](./development-guide.md) - 了解开发环境

## 🎯 场景系统架构

### 目录结构

每个场景遵循以下目录结构：

```
src/scenes/
  {locationId}/              # 场景（地点）目录，如 school
    {eventId}/              # 事件目录，如 entrance
      config.json           # 场景配置文件（必需）
      assets/               # 资源目录（可选）
        images/             # 图片资源
        sounds/             # 音效资源
      README.md            # 场景说明（可选）
```

### 命名规范

- **locationId**: 小写字母，使用连字符分隔（如：`school`, `playground`）
- **eventId**: 小写字母，使用连字符分隔（如：`entrance`, `lunch`）
- **场景ID**: 格式为 `{locationId}-{eventId}`（如：`school-entrance`）

## 🚀 开发步骤

### 步骤 1: 创建场景目录

#### 情况 A: 地点已存在

如果地点（如 `school`）已存在，直接在该目录下创建事件目录：

```bash
mkdir -p src/scenes/school/new-event
```

#### 情况 B: 地点不存在

如果地点不存在，先创建地点目录，再创建事件目录：

```bash
mkdir -p src/scenes/new-location/new-event
```

### 步骤 2: 创建配置文件

在事件目录下创建 `config.json` 文件：

```json
{
  "id": "new-event",
  "name": "新事件",
  "icon": "🎯",
  "description": "这是一个新事件的描述",
  "locationId": "school",
  "eventId": "new-event",
  "interactions": [
    {
      "id": "i0",
      "type": "narrative",
      "description": [
        "这是场景开始的描述文字。",
        "可以有多行描述。"
      ],
      "next": "i1"
    },
    {
      "id": "i1",
      "character": "teacher",
      "characterName": "老师",
      "dialogue": "老师：你好，小朋友！",
      "image": "teacher_greeting.png",
      "options": [
        {
          "id": "opt-1",
          "text": "大声说：老师好！",
          "traits": {
            "外向": 3,
            "礼貌": 2,
            "表达": 2
          },
          "next": "i2"
        },
        {
          "id": "opt-2",
          "text": "害羞地点头",
          "traits": {
            "内向": 2,
            "礼貌": 1
          },
          "next": "i2"
        }
      ]
    },
    {
      "id": "i2",
      "type": "narrative",
      "description": [
        "场景结束了。"
      ],
      "next": null
    }
  ]
}
```

### 步骤 3: 配置字段说明

#### 顶层字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 事件ID（与 eventId 相同） |
| `name` | string | ✅ | 场景显示名称 |
| `icon` | string | ✅ | 场景图标（emoji） |
| `description` | string | ✅ | 场景描述 |
| `locationId` | string | ✅ | 地点ID（必须与目录名一致） |
| `eventId` | string | ✅ | 事件ID（必须与目录名一致） |
| `interactions` | array | ✅ | 交互节点数组 |

#### interaction 字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 交互ID（唯一） |
| `type` | string | ❌ | 交互类型：`narrative`（叙述）或 `dialogue`（对话，默认） |
| `character` | string | ❌ | 角色类型：`teacher`、`classmate`、`security` 等 |
| `characterName` | string | ❌ | 角色显示名称 |
| `dialogue` | string | ❌ | 对话内容 |
| `description` | array | ❌ | 叙述内容（当 type 为 narrative 时） |
| `image` | string | ❌ | 图片文件名（相对于 assets/images/） |
| `options` | array | ❌ | 选项数组（对话类型必需） |
| `next` | string/null | ✅ | 下一个交互ID（null 表示结束） |

#### option 字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 选项ID（唯一） |
| `text` | string | ✅ | 选项文本 |
| `traits` | object | ✅ | 性格特征得分对象 |
| `next` | string/null | ✅ | 下一个交互ID |

#### traits 对象

性格特征得分，支持的特征：
- `外向` / `内向`
- `独立` / `依赖`
- `规则意识`
- `社交`
- `沟通`
- `礼貌`
- `友善`
- `创新`
- `耐心`
- `表达`

得分范围：建议 1-5 分

### 步骤 4: 添加资源（可选）

如果需要图片或音效：

1. **创建资源目录**
   ```bash
   mkdir -p src/scenes/school/new-event/assets/images
   mkdir -p src/scenes/school/new-event/assets/sounds
   ```

2. **添加资源文件**
   - 将图片放入 `assets/images/` 目录
   - 将音效放入 `assets/sounds/` 目录

3. **在配置中引用**
   ```json
   {
     "image": "character.png"
   }
   ```

### 步骤 5: 注册场景

在 `src/scenes/scenes-index.js` 中注册场景：

1. **导入场景配置**
   ```javascript
   import newEvent from './school/new-event/config.json';
   ```

2. **添加到场景配置映射**
   ```javascript
   const sceneConfigs = {
     'school-entrance': schoolEntrance,
     'school-lunch': schoolLunch,
     'school-new-event': newEvent,  // 新增
     // ...
   };
   ```

3. **如果地点是新的，添加地点元数据**
   ```javascript
   const locationMetadata = {
     school: {
       id: 'school',
       name: '学校',
       icon: '🏫',
       description: '在学校里会发生什么有趣的事情呢？'
     },
     'new-location': {  // 新增
       id: 'new-location',
       name: '新地点',
       icon: '📍',
       description: '新地点的描述'
     }
   };
   ```

### 步骤 6: 测试场景

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **测试场景**
   - 选择新场景
   - 测试所有交互节点
   - 检查选项是否正确
   - 验证性格特征得分

3. **检查资源**
   - 确保图片正常显示
   - 确保音效正常播放（如果添加了）

## 📝 完整示例

### 示例：添加"图书馆"场景

#### 1. 创建目录结构

```bash
mkdir -p src/scenes/library/reading/assets/images
```

#### 2. 创建配置文件

`src/scenes/library/reading/config.json`:

```json
{
  "id": "reading",
  "name": "图书馆阅读",
  "icon": "📚",
  "description": "在图书馆里安静地阅读",
  "locationId": "library",
  "eventId": "reading",
  "interactions": [
    {
      "id": "i0",
      "type": "narrative",
      "description": [
        "你走进了安静的图书馆，",
        "书架上摆满了各种各样的书籍。"
      ],
      "next": "i1"
    },
    {
      "id": "i1",
      "character": "librarian",
      "characterName": "图书管理员",
      "dialogue": "管理员：小朋友，你想看什么书呢？",
      "image": "librarian.png",
      "options": [
        {
          "id": "opt-1",
          "text": "大声说：我想看故事书！",
          "traits": {
            "外向": 3,
            "表达": 2
          },
          "next": "i2"
        },
        {
          "id": "opt-2",
          "text": "小声说：故事书...",
          "traits": {
            "内向": 2,
            "礼貌": 2
          },
          "next": "i2"
        }
      ]
    },
    {
      "id": "i2",
      "type": "narrative",
      "description": [
        "你找到了一本有趣的故事书，",
        "开始安静地阅读起来。"
      ],
      "next": null
    }
  ]
}
```

#### 3. 注册场景

在 `src/scenes/scenes-index.js` 中：

```javascript
import libraryReading from './library/reading/config.json';

const sceneConfigs = {
  // ... 其他场景
  'library-reading': libraryReading,
};

const locationMetadata = {
  // ... 其他地点
  library: {
    id: 'library',
    name: '图书馆',
    icon: '📚',
    description: '在图书馆里安静地阅读'
  }
};
```

## ✅ 检查清单

开发新场景时，请确保：

- [ ] 目录结构正确
- [ ] `config.json` 格式正确
- [ ] 所有必需字段都已填写
- [ ] 交互节点 ID 唯一且连续
- [ ] 选项的 `next` 字段指向正确的交互节点
- [ ] 最后一个交互节点的 `next` 为 `null`
- [ ] 性格特征得分合理（1-5 分）
- [ ] 场景已在 `scenes-index.js` 中注册
- [ ] 资源文件（如果有）路径正确
- [ ] 测试通过，场景可以正常游玩

## 🐛 常见问题

### 场景不显示

- 检查是否在 `scenes-index.js` 中正确注册
- 检查 `locationId` 和 `eventId` 是否正确
- 检查场景 ID 格式是否为 `{locationId}-{eventId}`

### 交互节点不连续

- 确保每个交互节点的 `next` 字段指向存在的节点
- 确保最后一个节点的 `next` 为 `null`

### 图片不显示

- 检查图片路径是否正确
- 确保图片文件存在于 `assets/images/` 目录
- 检查图片文件名是否与配置中的一致

### 性格特征不生效

- 检查 `traits` 对象格式是否正确
- 确保特征名称使用中文
- 检查得分是否为数字

## 📚 相关文档

- [项目介绍](./project-introduction.md)
- [开发指南](./development-guide.md)
- [游戏内容介绍](./game-content.md)

---

**返回**: [文档索引](./README.md)

