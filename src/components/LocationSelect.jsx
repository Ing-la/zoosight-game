import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/userStorage';
import locationsData from '../data/locations.json';
import '../styles/LocationSelect.css';

function LocationSelect() {
  const navigate = useNavigate();

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

  return (
    <div className="location-select-container">
      <div className="location-select-content">
        <button className="location-select-logout-button" onClick={handleLogout}>
          退出登录
        </button>
        <h1 className="location-select-title">🎮 选择场景</h1>
        <p className="location-select-subtitle">你想去哪里玩呢？</p>
        
        <div className="locations-grid">
          {locationsData.locations.map((location) => (
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
