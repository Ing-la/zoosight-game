# 进校门场景

## 场景信息
- **地点**: 学校
- **事件**: 进校门
- **场景ID**: school-entrance

## 资源
如需添加图片或音效，请放入 `assets/` 目录下：
- `assets/images/` - 图片资源
- `assets/sounds/` - 音效资源

## 资源路径示例

```javascript
import sceneLoader from '../../core/SceneLoader';

// 获取图片路径
const bgImage = sceneLoader.getAssetPath('school', 'entrance', 'images/background.png');

// 获取音效路径
const bgm = sceneLoader.getAssetPath('school', 'entrance', 'sounds/bgm.mp3');
```


