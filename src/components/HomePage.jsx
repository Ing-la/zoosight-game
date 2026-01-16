import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <h1 className="home-page-title">🎮 儿童情景游戏</h1>
        <p className="home-page-subtitle">通过选择来探索不同的情景吧！</p>
        
        <div className="home-page-buttons">
          <button 
            className="home-page-button home-page-button-child"
            onClick={() => navigate('/login')}
          >
            👦 小朋友登录
          </button>
          <button 
            className="home-page-button home-page-button-parent"
            onClick={() => navigate('/parent-login')}
          >
            👨‍👩‍👧 家长登录
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;





