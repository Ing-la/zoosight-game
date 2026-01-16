/**
 * 场景索引文件
 * 集中导入所有场景配置，用于注册和加载
 */

// 导入所有场景配置
import schoolEntrance from './school/entrance/config.json';
import schoolLunch from './school/lunch/config.json';
import playgroundSlide from './playground/slide/config.json';
import playgroundSwing from './playground/swing/config.json';

// 场景配置映射
const sceneConfigs = {
  'school-entrance': schoolEntrance,
  'school-lunch': schoolLunch,
  'playground-slide': playgroundSlide,
  'playground-swing': playgroundSwing
};

// 地点元数据（用于导航）
const locationMetadata = {
  school: {
    id: 'school',
    name: '学校',
    icon: '🏫',
    description: '在学校里会发生什么有趣的事情呢？'
  },
  playground: {
    id: 'playground',
    name: '游乐场',
    icon: '🎠',
    description: '在游乐场里尽情玩耍'
  }
};

/**
 * 获取所有地点列表（包含事件）
 */
export function getLocations() {
  const locations = {};
  
  // 遍历所有场景配置，按地点分组
  Object.values(sceneConfigs).forEach(scene => {
    const { locationId, eventId, name, icon, description } = scene;
    
    if (!locations[locationId]) {
      locations[locationId] = {
        ...locationMetadata[locationId],
        events: []
      };
    }
    
    locations[locationId].events.push({
      id: eventId,
      name,
      icon,
      description
    });
  });
  
  return Object.values(locations);
}

/**
 * 根据场景ID获取场景配置
 * @param {string} sceneId - 场景ID，格式：locationId-eventId
 */
export function getSceneConfig(sceneId) {
  return sceneConfigs[sceneId] || null;
}

/**
 * 根据地点和事件ID获取场景配置
 */
export function getSceneConfigByLocationAndEvent(locationId, eventId) {
  const sceneId = `${locationId}-${eventId}`;
  return getSceneConfig(sceneId);
}

export default sceneConfigs;

