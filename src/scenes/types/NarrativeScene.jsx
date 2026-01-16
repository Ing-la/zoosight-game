import React, { useState, useEffect } from 'react';
import '../../styles/NarrativeScene.css';
import sceneLoader from '../core/SceneLoader';

// 动态导入所有场景图片
const sceneImages = import.meta.glob('../../scenes/**/assets/images/*.png', { eager: true });

function NarrativeScene({ handler, onContinue, onBack, locationId, eventId }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (locationId && eventId) {
      const state = handler?.getCurrentState();
      const interaction = state?.interaction;
      
      // 优先使用 interaction 中指定的图片，否则使用默认图片
      const imageFileName = interaction?.image || 'Gemini_Generated_Image_zgr5x7zgr5x7zgr5.png';
      const searchPath = `${locationId}/${eventId}/assets/images/${imageFileName}`;
      
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
  }, [locationId, eventId, handler]);

  if (!handler) {
    return <div className="loading">加载中...</div>;
  }

  const state = handler.getCurrentState();

  if (!state || !state.interaction) {
    return <div className="loading">加载中...</div>;
  }

  const interaction = state.interaction;
  const continueText = interaction.continueText || '继续';
  const continueTextEn = interaction.continueTextEn || 'Continue';

  const handleImageError = () => {
    setImageError(true);
  };

  const handleContinueClick = () => {
    handler.handleContinue();
    onContinue();
  };

  return (
    <div className="narrative-scene-container">
      <div className="narrative-scene-background">
        <div className="narrative-scene-content">
          {/* 返回按钮 */}
          <button className="narrative-scene-back-button" onClick={onBack}>
            ← 返回
          </button>

          {/* 进度指示 */}
          <div className="narrative-scene-progress">
            <span>{state.interactionIndex + 1} / {state.totalInteractions}</span>
          </div>

          {/* 主要内容区域：左右分栏 */}
          <div className="narrative-scene-main-content">
            {/* 左侧：场景图片 */}
            {(imageSrc || imageError) && (
              <div className="narrative-scene-image-container">
                {imageError || !imageSrc ? (
                  <div className="narrative-scene-image-placeholder">
                    <div className="placeholder-icon">🖼️</div>
                    <div className="placeholder-text">图片加载失败</div>
                  </div>
                ) : (
                  <img
                    src={imageSrc}
                    alt="场景图片"
                    className="narrative-scene-image"
                    onError={handleImageError}
                  />
                )}
              </div>
            )}

            {/* 右侧：描述文字和继续按钮 */}
            <div className="narrative-scene-right-panel">
              {/* 描述文字 */}
              <div className="narrative-scene-description">
                {(() => {
                  // 支持多段描述（数组格式）或单段描述（字符串格式）
                  const descriptions = Array.isArray(interaction.description) 
                    ? interaction.description 
                    : [interaction.description];
                  const descriptionsEn = Array.isArray(interaction.descriptionEn)
                    ? interaction.descriptionEn
                    : interaction.descriptionEn ? [interaction.descriptionEn] : [];
                  
                  return descriptions.map((desc, index) => (
                    <div key={index} className="description-paragraph">
                      <div className="description-text-chinese">{desc}</div>
                      {descriptionsEn[index] && (
                        <div className="description-text-english">{descriptionsEn[index]}</div>
                      )}
                    </div>
                  ));
                })()}
              </div>

              {/* 继续按钮 */}
              <div className="narrative-scene-continue-section">
                <button
                  className="narrative-continue-button"
                  onClick={handleContinueClick}
                >
                  <div className="continue-text-chinese">{continueText}</div>
                  <div className="continue-text-english">{continueTextEn}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NarrativeScene;

