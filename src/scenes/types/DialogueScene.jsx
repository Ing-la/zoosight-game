import React, { useState, useEffect } from 'react';
import '../../styles/DialogueScene.css';
import sceneLoader from '../core/SceneLoader';

// 动态导入所有场景图片
const sceneImages = import.meta.glob('../../scenes/**/assets/images/*.png', { eager: true });

function DialogueScene({ handler, onOptionSelect, onComplete, onBack, locationId, eventId }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  
  useEffect(() => {
    if (locationId && eventId) {
      // 查找匹配的图片路径
      const searchPath = `${locationId}/${eventId}/assets/images/Gemini_Generated_Image_zgr5x7zgr5x7zgr5.png`;
      
      // 查找匹配的图片
      const imageModuleKey = Object.keys(sceneImages).find(key => 
        key.includes(searchPath.replace(/\\/g, '/'))
      );
      
      if (imageModuleKey && sceneImages[imageModuleKey]) {
        const imageModule = sceneImages[imageModuleKey];
        // Vite 导入的图片可能是 default 导出或直接导出
        setImageSrc(imageModule.default || imageModule);
        setImageError(false);
      } else {
        console.warn(`图片未找到: ${searchPath}`);
        setImageError(true);
      }
    }
  }, [locationId, eventId]);
  
  if (!handler) {
    return <div className="loading">加载中...</div>;
  }

  const state = handler.getCurrentState();

  if (!state || !state.interaction) {
    return <div className="loading">加载中...</div>;
  }

  const getCharacterIcon = (character) => {
    switch (character) {
      case 'teacher':
        return '👩‍🏫';
      case 'classmate':
        return '👦';
      default:
        return '👤';
    }
  };

  const handleOptionClick = (option) => {
    handler.handleInteraction(state.interaction.id, option.id);
    
    if (handler.isComplete()) {
      onComplete(handler.getChoices());
    } else {
      onOptionSelect();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="dialogue-scene-container">
      <div className="dialogue-scene-background">
        <div className="dialogue-scene-content">
          {/* 返回按钮 */}
          <button className="dialogue-scene-back-button" onClick={onBack}>
            ← 返回
          </button>

          {/* 进度指示 */}
          <div className="dialogue-scene-progress">
            <span>{state.interactionIndex + 1} / {state.totalInteractions}</span>
          </div>

          {/* 主要内容区域：左右分栏 */}
          <div className="dialogue-scene-main-content">
            {/* 左侧：场景图片 */}
            {(imageSrc || imageError) && (
              <div className="dialogue-scene-image-container">
                {imageError || !imageSrc ? (
                  <div className="dialogue-scene-image-placeholder">
                    <div className="placeholder-icon">🖼️</div>
                    <div className="placeholder-text">图片加载失败</div>
                  </div>
                ) : (
                  <img
                    src={imageSrc}
                    alt="场景图片"
                    className="dialogue-scene-image"
                    onError={handleImageError}
                  />
                )}
              </div>
            )}

            {/* 右侧：对话和选项 */}
            <div className="dialogue-scene-right-panel">
              {/* 角色对话 */}
              <div className="dialogue-scene-dialogue">
                <div className="character-avatar">
                  {getCharacterIcon(state.interaction.character)}
                </div>
                <div className="dialogue-bubble">
                  <div className="character-name">{state.interaction.characterName}</div>
                  <div className="dialogue-text">{state.interaction.dialogue}</div>
                </div>
              </div>

              {/* 选项 */}
              <div className="dialogue-scene-options">
                {state.interaction.options.map((option) => (
                  <button
                    key={option.id}
                    className="dialogue-option-button"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogueScene;

