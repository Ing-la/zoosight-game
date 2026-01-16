/**
 * 场景加载器
 * 负责动态加载场景配置和资源
 */

import { getSceneConfig, getSceneConfigByLocationAndEvent } from '../scenes-index';

class SceneLoader {
  constructor() {
    this.sceneCache = new Map();
  }

  /**
   * 加载场景配置
   * @param {string} sceneId - 场景ID，格式：locationId-eventId (如: school-entrance)
   * @returns {Object} 场景配置对象
   */
  loadScene(sceneId) {
    // 检查缓存
    if (this.sceneCache.has(sceneId)) {
      return this.sceneCache.get(sceneId);
    }

    try {
      const config = getSceneConfig(sceneId);
      
      if (!config) {
        throw new Error(`场景 ${sceneId} 不存在`);
      }
      
      // 缓存配置
      this.sceneCache.set(sceneId, config);
      
      return config;
    } catch (error) {
      console.error(`加载场景失败: ${sceneId}`, error);
      throw new Error(`场景 ${sceneId} 不存在或配置错误`);
    }
  }

  /**
   * 根据地点和事件ID加载场景
   * @param {string} locationId - 地点ID
   * @param {string} eventId - 事件ID
   * @returns {Object} 场景配置对象
   */
  loadSceneByLocationAndEvent(locationId, eventId) {
    const sceneId = `${locationId}-${eventId}`;
    return this.loadScene(sceneId);
  }

  /**
   * 获取场景资源路径
   * @param {string} locationId - 地点ID
   * @param {string} eventId - 事件ID
   * @param {string} assetPath - 资源相对路径（相对于 assets 目录）
   * @returns {string} 完整的资源路径
   */
  getAssetPath(locationId, eventId, assetPath) {
    // 资源路径：/scenes/{locationId}/{eventId}/assets/{assetPath}
    // 例如：/scenes/school/entrance/assets/images/background.png
    return `/scenes/${locationId}/${eventId}/assets/${assetPath}`;
  }

  /**
   * 根据场景ID获取资源路径（兼容旧接口）
   * @param {string} sceneId - 场景ID，格式：locationId-eventId
   * @param {string} assetPath - 资源相对路径
   * @returns {string} 完整的资源路径
   */
  getAssetPathBySceneId(sceneId, assetPath) {
    const [locationId, eventId] = sceneId.split('-');
    return this.getAssetPath(locationId, eventId, assetPath);
  }

  /**
   * 清除缓存
   */
  clearCache() {
    this.sceneCache.clear();
  }
}

// 导出单例
export default new SceneLoader();

