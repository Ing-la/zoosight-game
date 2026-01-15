import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import LocationSelect from './components/LocationSelect';
import EventSelect from './components/EventSelect';
import GameScene from './components/GameScene';
import SceneComplete from './components/SceneComplete';
import ParentDashboard from './components/ParentDashboard';
import { getCurrentUser } from './utils/userStorage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 检查是否有已登录用户
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogin = (nickname, isParent) => {
    setCurrentUser({ nickname, isParent });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 主页 */}
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          
          {/* 登录页面 */}
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} isParent={false} />} 
          />
          
          {/* 家长登录 */}
          <Route 
            path="/parent-login" 
            element={<Login onLogin={handleLogin} isParent={true} />} 
          />
          
          {/* 场景选择 */}
          <Route 
            path="/location-select" 
            element={<LocationSelect />} 
          />
          
          {/* 事件选择 */}
          <Route 
            path="/event-select/:locationId" 
            element={<EventSelect />} 
          />
          
          {/* 游戏场景 */}
          <Route 
            path="/game/:locationId/:eventId" 
            element={<GameScene />} 
          />
          
          {/* 场景完成 */}
          <Route 
            path="/scene-complete/:locationId" 
            element={<SceneComplete />} 
          />
          
          {/* 家长面板 */}
          <Route 
            path="/parent-dashboard" 
            element={<ParentDashboard />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

