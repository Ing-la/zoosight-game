import { create } from 'zustand';
import { saveUserChoices, getUserChoices, clearUserData } from '../utils/storage';

const useGameStore = create((set, get) => ({
  // 当前关卡 ID
  currentStageId: null,
  
  // 用户选择记录
  choices: [],
  
  // 初始化：从本地存储加载数据
  init: () => {
    const savedData = getUserChoices();
    if (savedData) {
      set({ choices: savedData.choices || [] });
    }
  },
  
  // 添加选择记录
  addChoice: (stageId, option) => {
    const choice = {
      stageId,
      optionId: option.id,
      optionText: option.text,
      traits: option.traits || {},
      timestamp: new Date().toISOString(),
      timeSpent: option.timeSpent || 0 // 使用传入的时间，如果没有则默认为0
    };
    
    const newChoices = [...get().choices, choice];
    set({ choices: newChoices });
    
    // 自动保存到本地存储
    saveUserChoices(newChoices);
  },
  
  // 获取所有选择
  getAllChoices: () => {
    return get().choices;
  },
  
  // 计算性格特征得分
  calculateTraits: () => {
    const choices = get().choices;
    const traits = {};
    
    choices.forEach(choice => {
      Object.keys(choice.traits || {}).forEach(trait => {
        traits[trait] = (traits[trait] || 0) + choice.traits[trait];
      });
    });
    
    return traits;
  },
  
  // 重置游戏数据
  reset: () => {
    set({ choices: [], currentStageId: null });
    clearUserData();
  },
  
  // 设置当前关卡
  setCurrentStage: (stageId) => {
    set({ currentStageId: stageId });
  }
}));

export default useGameStore;

