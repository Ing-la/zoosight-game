/**
 * 本地存储工具函数
 * 使用 localStorage 存储用户数据
 */

const STORAGE_KEY = 'child_game_data';

/**
 * 保存用户选择数据
 */
export function saveUserChoices(choices) {
  try {
    const data = {
      choices,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('保存数据失败:', error);
    return false;
  }
}

/**
 * 获取用户选择数据
 */
export function getUserChoices() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('读取数据失败:', error);
    return null;
  }
}

/**
 * 清除用户数据
 */
export function clearUserData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('清除数据失败:', error);
    return false;
  }
}

/**
 * 生成会话 ID
 */
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * API 配置存储
 */
const API_CONFIG_KEY = 'child_game_api_config';

/**
 * 保存 API 配置
 */
export function saveApiConfig(config) {
  try {
    localStorage.setItem(API_CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('保存 API 配置失败:', error);
    return false;
  }
}

/**
 * 获取 API 配置
 */
export function getApiConfig() {
  try {
    const config = localStorage.getItem(API_CONFIG_KEY);
    return config ? JSON.parse(config) : null;
  } catch (error) {
    console.error('读取 API 配置失败:', error);
    return null;
  }
}

/**
 * 清除 API 配置
 */
export function clearApiConfig() {
  try {
    localStorage.removeItem(API_CONFIG_KEY);
    return true;
  } catch (error) {
    console.error('清除 API 配置失败:', error);
    return false;
  }
}

