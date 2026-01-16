/**
 * 场景注册表
 * 管理所有可用场景的元数据
 */

import { getLocations } from '../scenes-index';

class SceneRegistry {
  /**
   * 获取所有地点
   * @returns {Array}
   */
  getLocations() {
    return getLocations();
  }

  /**
   * 获取指定地点
   * @param {string} locationId - 地点ID
   * @returns {Object|null}
   */
  getLocation(locationId) {
    const locations = this.getLocations();
    return locations.find(loc => loc.id === locationId) || null;
  }

  /**
   * 获取指定地点的所有事件
   * @param {string} locationId - 地点ID
   * @returns {Array}
   */
  getEventsByLocation(locationId) {
    const location = this.getLocation(locationId);
    return location ? location.events : [];
  }
}

// 导出单例
export default new SceneRegistry();

