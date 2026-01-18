# 🎬 新场景开发指南

## 📋 目录

- [场景系统概述](#场景系统概述)
- [开发新场景步骤](#开发新场景步骤)
- [配置文件格式](#配置文件格式)
- [资源管理](#资源管理)
- [场景注册](#场景注册)
- [最佳实践](#最佳实践)

## 🎯 场景系统概述

ZooSight Game 采用**模块化场景架构**，每个场景（地点）都有独立的目录，包含：

- **场景配置** (`config.json`) - 定义场景的对话、选项等
- **资源文件** (`assets/`) - 场景的图片、音效等资源

### 场景结构

```
src/scenes/
├── school/              # 学校场景（地点）
│   ├── entrance/        # 进校门事件
│   │   ├── config.json  # 场景配置
│   │   └── assets/      # 资源目录
│   │       ├── images/  # 图片资源
│   │       └── sounds/  # 音效资源
│   └── lunch/           # 午餐时间事件
│
└── playground/          # 游乐场场景（地点）
    ├── slide/          # 滑滑梯事件
    └── swing/           # 荡秋千事件
```

## 🚀 开发新场景步骤

### 步骤 1：创建场景目录

如果场景（地点）已存在，直接在该目录下创建事件目录：

```bash
src/scenes/school/new-event/
```

如果场景（地点）不存在，先创建场景目录：

```bash
src/scenes/new-location/
  new-event/
    config.json
    assets/
      images/
      sounds/
```

### 步骤 2：创建配置文件

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
      "characterName": "长颈鹿老师",
      "dialogue": "老师：早上好呀，小同学～今天看起来精神不错呀！",
      "dialogueEn": "Teacher: Good morning, little student! You look energetic today!",
      "image": "teacher_greeting.png",
      "options": [
        {
          "id": "opt-1",
          "text": "大声说：「老师早上好！」",
          "textEn": "Say loudly: 'Good morning, teacher!'",
          "traits": {
            "外向": 3,
            "礼貌": 2,
            "表达": 2
          },
          "next": "i1a"
        },
        {
          "id": "opt-2",
          "text": "挥手微笑回应",
          "textEn": "Wave and smile in response",
          "traits": {
            "外向": 2,
            "礼貌": 2,
            "友善": 2
          },
          "next": "i1c"
        }
      ]
    }
  ]
}
```

### 步骤 3：添加资源（可选）

如果需要图片或音效：

1. 在事件目录下创建 `assets/images/` 或 `assets/sounds/`
2. 将资源文件放入对应目录
3. 在 `config.json` 中使用相对路径引用（如 `"image": "teacher_greeting.png"`）

### 步骤 4：注册场景

在 `src/scenes/scenes-index.js` 中：

1. 导入场景配置：
```javascript
import newEvent from './new-location/new-event/config.json';
```

2. 添加到 `sceneConfigs` 对象：
```javascript
const sceneConfigs = {
  // ... 其他场景
  'new-location-new-event': newEvent
};
```

3. 如果地点是新的，在 `locationMetadata` 中添加地点信息：
```javascript
const locationMetadata = {
  // ... 其他地点
  'new-location': {
    id: 'new-location',
    name: '新地点',
    icon: '🏠',
    description: '新地点的描述'
  }
};
```

### 步骤 5：完成！

无需修改其他代码，系统会自动识别新场景。

## 📝 配置文件格式

### 必需字段

- `id`: 事件ID（与 eventId 相同）
- `name`: 场景名称（中文）
- `icon`: 场景图标（emoji）
- `description`: 场景描述（中文）
- `locationId`: 地点ID（必须与目录名一致）
- `eventId`: 事件ID（必须与目录名一致）
- `interactions`: 对话交互数组

### interactions 字段

#### 对话类型（dialogue）

```json
{
  "id": "i1",
  "character": "teacher",
  "characterName": "长颈鹿老师",
  "dialogue": "老师：早上好呀，小同学～",
  "dialogueEn": "Teacher: Good morning, little student!",
  "image": "teacher_greeting.png",
  "options": [...]
}
```

字段说明：
- `id`: 交互ID（唯一）
- `character`: 角色类型（teacher/classmate/security等）
- `characterName`: 角色显示名称
- `dialogue`: 对话内容（中文）
- `dialogueEn`: 对话内容（英文，可选）
- `image`: 图片文件名（相对于 assets/images/）
- `options`: 选项数组

#### 叙述类型（narrative）

```json
{
  "id": "i1a",
  "type": "narrative",
  "image": "loud_greeting.png",
  "description": [
    "你大声向老师打招呼：「老师早上好」，声音像早晨的阳光一样明亮。",
    "长颈鹿老师笑着回应：「早上好，你的声音真有力量」"
  ],
  "descriptionEn": [
    "You greet the teacher loudly: \"Good morning, teacher!\"",
    "The giraffe teacher smiles and responds: \"Good morning!\""
  ],
  "next": "i1b"
}
```

字段说明：
- `type`: 必须为 `"narrative"`
- `description`: 叙述内容数组（中文）
- `descriptionEn`: 叙述内容数组（英文，可选）
- `image`: 图片文件名（可选）
- `next`: 下一个交互ID

### options 字段

```json
{
  "id": "opt-1",
  "text": "大声说：「老师早上好！」",
  "textEn": "Say loudly: 'Good morning, teacher!'",
  "traits": {
    "外向": 3,
    "礼貌": 2,
    "表达": 2
  },
  "next": "i1a"
}
```

字段说明：
- `id`: 选项ID（唯一）
- `text`: 选项文本（中文）
- `textEn`: 选项文本（英文，可选）
- `traits`: 性格特征对象（键为特征名，值为权重 1-5）
- `next`: 选择后跳转的交互ID

### 性格特征（traits）

可用的性格特征包括：

- **外向/内向**：社交倾向
- **理性/感性**：决策方式
- **计划/灵活**：生活方式
- **判断/感知**：信息处理
- **礼貌**：礼貌程度
- **表达**：表达能力
- **友善**：友善程度
- **害羞**：害羞程度
- **勇敢**：勇敢程度
- **谨慎**：谨慎程度

权重范围：1-5（1=轻微，5=强烈）

## 🎨 资源管理

### 图片资源

- **位置**：`{eventDir}/assets/images/`
- **格式**：PNG、JPG（推荐 PNG）
- **命名**：使用英文和下划线，如 `teacher_greeting.png`
- **尺寸**：建议 800x600 或更高分辨率

### 音效资源（计划中）

- **位置**：`{eventDir}/assets/sounds/`
- **格式**：MP3、OGG
- **命名**：使用英文和下划线

### 资源路径

在代码中使用 `sceneLoader.getAssetPath()` 获取资源路径：

```javascript
const imagePath = sceneLoader.getAssetPath(
  'school',      // locationId
  'entrance',    // eventId
  'images/teacher_greeting.png'  // 资源路径
);
```

## 📚 场景注册

### scenes-index.js 结构

```javascript
// 导入场景配置
import schoolEntrance from './school/entrance/config.json';
import schoolLunch from './school/lunch/config.json';
// ... 其他场景

// 场景配置对象
const sceneConfigs = {
  'school-entrance': schoolEntrance,
  'school-lunch': schoolLunch,
  // ... 其他场景
};

// 地点元数据
const locationMetadata = {
  school: {
    id: 'school',
    name: '学校',
    icon: '🏫',
    description: '在学校里会发生什么有趣的事情呢？'
  },
  // ... 其他地点
};

// 导出函数
export function getSceneConfig(locationId, eventId) {
  const key = `${locationId}-${eventId}`;
  return sceneConfigs[key];
}

export function getLocations() {
  return Object.values(locationMetadata);
}
```

## ✨ 最佳实践

### 1. 场景设计

- **清晰的流程**：确保交互流程清晰，不会让用户困惑
- **合理的选项**：提供 2-4 个选项，避免过多或过少
- **有趣的描述**：使用生动的描述，符合"疯狂动物城"主题

### 2. 角色设计

- **一致性**：保持角色性格的一致性
- **多样性**：使用不同的动物角色，增加趣味性
- **符合主题**：角色设计符合"疯狂动物城"风格

### 3. 性格特征

- **平衡性**：确保选项能够反映不同的性格特征
- **权重合理**：权重值应该合理（1-5）
- **覆盖全面**：尽量覆盖主要的性格维度

### 4. 资源管理

- **命名规范**：使用英文和下划线命名资源文件
- **文件大小**：控制图片文件大小，避免过大
- **格式统一**：使用统一的图片格式（推荐 PNG）

### 5. 测试

- **功能测试**：确保场景能够正常加载和运行
- **流程测试**：测试所有选项路径
- **资源测试**：确保所有资源能够正确加载

## 🐛 常见问题

### 场景无法加载

- 检查 `config.json` 格式是否正确
- 检查 `locationId` 和 `eventId` 是否与目录名一致
- 检查场景是否已正确注册

### 资源无法显示

- 检查资源文件是否存在
- 检查资源路径是否正确
- 检查资源文件名是否与配置一致

### 选项无法跳转

- 检查 `next` 字段是否指向正确的交互ID
- 检查交互ID是否存在
- 检查交互流程是否有循环或死路

## 📖 参考示例

参考现有场景：

- `src/scenes/school/entrance/` - 进校门场景（完整示例）
- `src/scenes/school/lunch/` - 午餐时间场景
- `src/scenes/playground/slide/` - 滑滑梯场景

---

**开始创建你的第一个场景吧！** 🎬


