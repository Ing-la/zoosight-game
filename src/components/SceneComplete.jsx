import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logout } from '../utils/userStorage';
import '../styles/SceneComplete.css';

function SceneComplete() {
  const { locationId } = useParams();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/event-select/' + locationId);
  };

  const handleGoHome = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="scene-complete-container">
      <div className="scene-complete-content">
        <div className="complete-icon">🎉</div>
        <h1 className="complete-title">场景完成！</h1>
        <p className="complete-message">你做得很好！要继续玩其他场景吗？</p>
        <div className="complete-buttons">
          <button className="complete-button" onClick={handleContinue}>
            继续游戏
          </button>
          <button className="complete-button complete-button-secondary" onClick={handleGoHome}>
            返回主页
          </button>
        </div>
      </div>
    </div>
  );
}

export default SceneComplete;

