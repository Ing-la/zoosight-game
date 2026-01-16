# 滑滑梯场景

## 场景信息
- **地点**: 游乐场
- **事件**: 滑滑梯
- **场景ID**: playground-slide

## 资源
如需添加图片或音效，请放入 `assets/` 目录下：
- `assets/images/` - 图片资源
- `assets/sounds/` - 音效资源

## 资源路径示例

```javascript
import sceneLoader from '../../core/SceneLoader';

// 获取图片路径
const bgImage = sceneLoader.getAssetPath('playground', 'slide', 'images/background.png');

// 获取音效路径
const bgm = sceneLoader.getAssetPath('playground', 'slide', 'sounds/bgm.mp3');
```



