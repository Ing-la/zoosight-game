import React, { useState, useEffect } from 'react';
import '../../styles/DialogueScene.css';
import sceneLoader from '../core/SceneLoader';

// 动态导入所有场景图片
const sceneImages = import.meta.glob('../../scenes/**/assets/images/*.png', { eager: true });

// 动态导入所有角色头像图片
const characterAvatars = import.meta.glob('../../scenes/**/assets/images/*头像.png', { eager: true });

function DialogueScene({ handler, onOptionSelect, onComplete, onBack, locationId, eventId }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [avatarError, setAvatarError] = useState({});
  
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

  // 获取角色头像图片路径
  const getCharacterAvatar = (character) => {
    if (!locationId || !eventId) return null;
    
    let avatarFileName = '';
    switch (character) {
      case 'teacher':
        avatarFileName = '长颈鹿老师头像.png';
        break;
      case 'classmate':
        avatarFileName = '狐狸同学头像.png';
        break;
      case 'guard':
        avatarFileName = '大象保安头像.png';
        break;
      default:
        return null;
    }
    
    // 查找匹配的头像图片
    const searchPath = `${locationId}/${eventId}/assets/images/${avatarFileName}`;
    const avatarKey = Object.keys(characterAvatars).find(key => 
      key.includes(searchPath.replace(/\\/g, '/'))
    );
    
    if (avatarKey && characterAvatars[avatarKey]) {
      const avatarModule = characterAvatars[avatarKey];
      return avatarModule.default || avatarModule;
    }
    
    return null;
  };

  const handleAvatarError = (character) => {
    setAvatarError(prev => ({ ...prev, [character]: true }));
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
                  {(() => {
                    const avatarSrc = getCharacterAvatar(state.interaction.character);
                    const hasError = avatarError[state.interaction.character];
                    
                    if (avatarSrc && !hasError) {
                      return (
                        <img
                          src={avatarSrc}
                          alt={state.interaction.characterName}
                          className="character-avatar-image"
                          onError={() => handleAvatarError(state.interaction.character)}
                        />
                      );
                    } else {
                      // 如果图片加载失败，显示默认 emoji
                      const defaultIcon = state.interaction.character === 'teacher' ? '👩‍🏫' 
                        : state.interaction.character === 'classmate' ? '👦'
                        : state.interaction.character === 'guard' ? '🦁'
                        : '👤';
                      return <span className="character-avatar-fallback">{defaultIcon}</span>;
                    }
                  })()}
                </div>
                <div className="dialogue-bubble">
                  <div className="character-name">{state.interaction.characterName}</div>
                  <div className="dialogue-text">
                    <div className="dialogue-text-chinese">{state.interaction.dialogue}</div>
                    {state.interaction.dialogueEn && (
                      <div className="dialogue-text-english">{state.interaction.dialogueEn}</div>
                    )}
                  </div>
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
                    <div className="option-text-chinese">{option.text}</div>
                    {option.textEn && (
                      <div className="option-text-english">{option.textEn}</div>
                    )}
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

