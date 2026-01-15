import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import locationsData from '../data/locations.json';
import { getCurrentUser, saveUserGameData } from '../utils/userStorage';
import DialogueScene from '../scenes/types/DialogueScene';
import { DialogueHandler } from '../scenes/handlers/DialogueHandler';
import '../styles/GameScene.css';

function GameScene() {
  const { locationId, eventId } = useParams();
  const navigate = useNavigate();
  const [handler, setHandler] = useState(null);

  const location = locationsData.locations.find(loc => loc.id === locationId);
  const event = location?.events.find(evt => evt.id === eventId);

  const handleComplete = useCallback((choices) => {
    // 保存场景数据
    const currentUser = getCurrentUser();
    if (currentUser) {
      saveUserGameData(currentUser.nickname, locationId, eventId, choices);
    }

    // 跳转到完成页面
    navigate('/scene-complete/' + locationId);
  }, [locationId, eventId, navigate]);

  const handleBack = useCallback(() => {
    navigate('/event-select/' + locationId);
  }, [locationId, navigate]);

  const handleOptionSelect = useCallback(() => {
    // 强制重新渲染 - 通过更新 handler 引用
    if (handler) {
      const newHandler = Object.create(Object.getPrototypeOf(handler));
      Object.assign(newHandler, handler);
      setHandler(newHandler);
    }
  }, [handler]);

  useEffect(() => {
    // 检查登录状态
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.isParent) {
      navigate('/login');
      return;
    }

    if (!location || !event) {
      navigate('/location-select');
      return;
    }

    // 创建对话处理器
    const sceneHandler = new DialogueHandler(event);
    sceneHandler.init();
    setHandler(sceneHandler);
  }, [locationId, eventId, navigate, location, event]);

  if (!handler) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <DialogueScene
      handler={handler}
      onOptionSelect={handleOptionSelect}
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}

export default GameScene;
