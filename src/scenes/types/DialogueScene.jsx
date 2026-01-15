import React from 'react';
import '../../styles/DialogueScene.css';

function DialogueScene({ handler, onOptionSelect, onComplete, onBack }) {
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
  );
}

export default DialogueScene;

