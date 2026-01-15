import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserGameData } from '../utils/userStorage';
import locationsData from '../data/locations.json';
import '../styles/EventSelect.css';

function EventSelect() {
  const { locationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 检查登录状态
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.isParent) {
      navigate('/login');
    }
  }, [navigate]);

  const location = locationsData.locations.find(loc => loc.id === locationId);

  if (!location) {
    return <div className="error">场景不存在</div>;
  }

  const handleEventSelect = (eventId) => {
    navigate(`/game/${locationId}/${eventId}`);
  };

  const handleBack = () => {
    navigate('/location-select');
  };

  return (
    <div className="event-select-container">
      <div className="event-select-content">
        <button className="back-button" onClick={handleBack}>
          ← 返回
        </button>
        
        <h1 className="event-select-title">{location.name}</h1>
        <p className="event-select-subtitle">选择你想体验的事件</p>
        
        <div className="events-grid">
          {location.events.map((event) => {
            const currentUser = getCurrentUser();
            const userGameData = currentUser ? getUserGameData(currentUser.nickname) : {};
            const isCompleted = userGameData[locationId] && userGameData[locationId][event.id];
            
            return (
              <div
                key={event.id}
                className={`event-card ${isCompleted ? 'event-completed' : ''}`}
                onClick={() => handleEventSelect(event.id)}
              >
                <div className="event-icon">{event.icon}</div>
                <h2 className="event-name">{event.name}</h2>
                <p className="event-description">{event.description}</p>
                {isCompleted && <div className="event-badge">✓ 已完成</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EventSelect;
