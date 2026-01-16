/**
 * 用户数据存储管理
 * 支持多用户账号系统
 */

const USERS_KEY = 'child_game_users';
const CURRENT_USER_KEY = 'child_game_current_user';

/**
 * 简单的密码哈希（实际项目中应使用更安全的方法）
 */
function hashPassword(password) {
  // 简单的哈希函数，实际应使用 bcrypt 等
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

/**
 * 获取所有用户
 */
function getAllUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
  } catch (error) {
    console.error('读取用户数据失败:', error);
    return {};
  }
}

/**
 * 保存所有用户
 */
function saveAllUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('保存用户数据失败:', error);
    return false;
  }
}

/**
 * 注册新用户
 */
export function registerUser(nickname, password) {
  const users = getAllUsers();
  
  // 检查昵称是否已存在
  if (users[nickname]) {
    return false;
  }

  // 创建新用户
  users[nickname] = {
    nickname,
    passwordHash: hashPassword(password),
    isParent: false,
    gameData: {},
    createdAt: new Date().toISOString(),
    lastPlayed: null
  };

  return saveAllUsers(users);
}

/**
 * 用户登录
 */
export function loginUser(nickname, password, isParent = false) {
  const users = getAllUsers();
  const user = users[nickname];

  if (!user) {
    return false;
  }

  // 检查密码
  if (user.passwordHash !== hashPassword(password)) {
    return false;
  }

  // 检查是否为家长模式
  if (isParent) {
    // 家长登录：必须是家长账号
    if (!user.isParent) {
      return false;
    }
  } else {
    // 普通登录：不能是家长账号
    if (user.isParent) {
      return false;
    }
  }

  // 保存当前登录用户
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
    nickname,
    isParent,
    loginTime: new Date().toISOString()
  }));

  // 更新最后登录时间（仅普通用户）
  if (!isParent) {
    user.lastPlayed = new Date().toISOString();
    saveAllUsers(users);
  }

  return true;
}

/**
 * 获取当前登录用户
 */
export function getCurrentUser() {
  try {
    const current = localStorage.getItem(CURRENT_USER_KEY);
    return current ? JSON.parse(current) : null;
  } catch (error) {
    console.error('读取当前用户失败:', error);
    return null;
  }
}

/**
 * 登出
 */
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * 获取用户游戏数据
 */
export function getUserGameData(nickname) {
  const users = getAllUsers();
  const user = users[nickname];
  return user ? user.gameData : {};
}

/**
 * 保存用户游戏数据（场景完成后保存）
 */
export function saveUserGameData(nickname, location, event, choices) {
  const users = getAllUsers();
  const user = users[nickname];

  if (!user) {
    return false;
  }

  // 初始化数据结构
  if (!user.gameData[location]) {
    user.gameData[location] = {};
  }

  // 保存场景数据（覆盖之前的）
  user.gameData[location][event] = {
    choices,
    completedAt: new Date().toISOString(),
    traits: calculateTraits(choices)
  };

  user.lastPlayed = new Date().toISOString();

  return saveAllUsers(users);
}

/**
 * 计算性格特征得分
 */
function calculateTraits(choices) {
  const traits = {};
  choices.forEach(choice => {
    Object.keys(choice.traits || {}).forEach(trait => {
      traits[trait] = (traits[trait] || 0) + choice.traits[trait];
    });
  });
  return traits;
}

/**
 * 获取所有用户列表（用于家长查看）
 */
export function getAllUsersList() {
  const users = getAllUsers();
  return Object.keys(users)
    .filter(nickname => !users[nickname].isParent)
    .map(nickname => ({
      nickname,
      createdAt: users[nickname].createdAt,
      lastPlayed: users[nickname].lastPlayed,
      gameData: users[nickname].gameData
    }));
}

/**
 * 创建家长账号（特殊账号）
 */
export function createParentAccount(nickname, password) {
  const users = getAllUsers();
  
  if (users[nickname]) {
    return false;
  }

  users[nickname] = {
    nickname,
    passwordHash: hashPassword(password),
    isParent: true,
    createdAt: new Date().toISOString()
  };

  return saveAllUsers(users);
}

/**
 * 删除用户账号
 * @param {string} nickname - 要删除的用户昵称
 * @returns {boolean} 是否删除成功
 */
export function deleteUser(nickname) {
  const users = getAllUsers();
  
  if (!users[nickname]) {
    return false;
  }

  // 删除用户
  delete users[nickname];
  
  // 如果删除的是当前登录用户，同时清除登录状态
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.nickname === nickname) {
    logout();
  }

  return saveAllUsers(users);
}

/**
 * 注销当前登录的账号
 * @returns {boolean} 是否注销成功
 */
export function deleteCurrentUser() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return false;
  }

  return deleteUser(currentUser.nickname);
}
