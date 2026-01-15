import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/gameStore';
import ConfigModal from './ConfigModal';
import '../styles/StartScreen.css';

function StartScreen() {
  const navigate = useNavigate();
  const reset = useGameStore((state) => state.reset);
  const [showConfig, setShowConfig] = useState(false);

  const handleStart = () => {
    // 重置游戏数据，开始新游戏
    reset();
    navigate('/scene/stage-1');
  };

  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="game-title">🎮 儿童情景游戏</h1>
        <p className="game-subtitle">通过选择来探索不同的情景吧！</p>
        <div className="start-buttons">
          <button className="start-button" onClick={handleStart}>
            开始游戏
          </button>
          <button className="config-button-start" onClick={() => setShowConfig(true)}>
            ⚙️ API 配置
          </button>
        </div>
      </div>
      <ConfigModal isOpen={showConfig} onClose={() => setShowConfig(false)} />
    </div>
  );
}

export default StartScreen;

