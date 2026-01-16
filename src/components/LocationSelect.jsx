import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, deleteCurrentUser } from '../utils/userStorage';
import sceneRegistry from '../scenes/core/SceneRegistry';
import '../styles/LocationSelect.css';

function LocationSelect() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // 检查登录状态
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.isParent) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLocationSelect = (locationId) => {
    navigate(`/event-select/${locationId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    const success = deleteCurrentUser();
    if (success) {
      alert('账号已成功注销');
      navigate('/');
    } else {
      alert('注销失败，请重试');
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className="location-select-container">
      <div className="location-select-content">
        <div className="location-select-header-buttons">
          <button className="location-select-logout-button" onClick={handleLogout}>
            退出登录
          </button>
          <button 
            className="location-select-delete-button" 
            onClick={() => setShowDeleteConfirm(true)}
          >
            注销账号
          </button>
        </div>
        
        {showDeleteConfirm && (
          <div className="delete-confirm-modal">
            <div className="delete-confirm-content">
              <h3>确认注销账号</h3>
              <p>注销后将删除您的账号和所有游戏数据，此操作不可恢复！</p>
              <div className="delete-confirm-buttons">
                <button 
                  className="delete-confirm-button delete-confirm-yes"
                  onClick={handleDeleteAccount}
                >
                  确认注销
                </button>
                <button 
                  className="delete-confirm-button delete-confirm-no"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
        
        <h1 className="location-select-title">🎮 选择场景</h1>
        <p className="location-select-subtitle">你想去哪里玩呢？</p>
        
        <div className="locations-grid">
          {sceneRegistry.getLocations().map((location) => (
            <div
              key={location.id}
              className="location-card"
              onClick={() => handleLocationSelect(location.id)}
            >
              <div className="location-icon">{location.icon}</div>
              <h2 className="location-name">{location.name}</h2>
              <p className="location-description">{location.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationSelect;
