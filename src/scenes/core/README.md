# 场景系统核心模块

## 场景接口规范

每个场景必须遵循以下结构：

```
src/scenes/
  {locationId}/              # 场景（地点）目录，如 school
    {eventId}/              # 事件目录，如 entrance
      config.json           # 场景配置文件（必需）
      assets/               # 资源目录（可选）
        images/             # 图片资源
        sounds/             # 音效资源
```

## config.json 格式

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
          "text": "大声说'老师早上好！我今天很开心！'",
          "traits": {
            "外向": 3,
            "礼貌": 2,
            "表达": 2
          },
          "next": "i2"
        }
      ]
    }
  ]
}
```

## SceneLoader API

### loadScene(sceneId)
加载场景配置
- `sceneId`: 场景ID，格式：`locationId-eventId`（如：`school-entrance`）

### loadSceneByLocationAndEvent(locationId, eventId)
根据地点和事件ID加载场景
- `locationId`: 地点ID
- `eventId`: 事件ID

### getAssetPath(locationId, eventId, assetPath)
获取场景资源路径
- `locationId`: 地点ID
- `eventId`: 事件ID
- `assetPath`: 资源相对路径（相对于 assets 目录）

示例：
```javascript
sceneLoader.getAssetPath('school', 'entrance', 'images/background.png');
// 返回：/scenes/school/entrance/assets/images/background.png
```

## SceneRegistry API

### getLocations()
获取所有地点列表（包含事件）

### getLocation(locationId)
获取指定地点

### getEventsByLocation(locationId)
获取指定地点的所有事件

## 开发新场景步骤

1. 在 `src/scenes/` 下创建场景目录：`{locationId}/{eventId}`
2. 创建 `config.json` 文件，按照规范填写配置
3. 如需资源，在事件目录下创建 `assets/` 目录
4. 在 `scenes-index.js` 中注册场景
5. 完成！
