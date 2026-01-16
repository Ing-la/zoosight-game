import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser, saveUserGameData } from '../utils/userStorage';
import DialogueScene from '../scenes/types/DialogueScene';
import { DialogueHandler } from '../scenes/handlers/DialogueHandler';
import sceneLoader from '../scenes/core/SceneLoader';
import '../styles/GameScene.css';

function GameScene() {
  const { locationId, eventId } = useParams();
  const navigate = useNavigate();
  const [handler, setHandler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    // 加载场景配置
    try {
      const sceneConfig = sceneLoader.loadSceneByLocationAndEvent(locationId, eventId);
      
      if (!sceneConfig) {
        setError('场景不存在');
        navigate('/location-select');
        return;
      }

      // 创建对话处理器（使用场景配置中的 interactions）
      const eventData = {
        id: sceneConfig.eventId,
        interactions: sceneConfig.interactions
      };
      
      const sceneHandler = new DialogueHandler(eventData);
      sceneHandler.init();
      setHandler(sceneHandler);
      setLoading(false);
    } catch (err) {
      console.error('加载场景失败:', err);
      setError(err.message);
      navigate('/location-select');
    }
  }, [locationId, eventId, navigate]);

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return <div className="error">错误: {error}</div>;
  }

  if (!handler) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <DialogueScene
      handler={handler}
      locationId={locationId}
      eventId={eventId}
      onOptionSelect={handleOptionSelect}
      onComplete={handleComplete}
      onBack={handleBack}
    />
  );
}

export default GameScene;
