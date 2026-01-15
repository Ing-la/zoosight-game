import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsersList, logout, getCurrentUser } from '../utils/userStorage';
import { generateReport } from '../api/ai';
import ConfigModal from './ConfigModal';
import '../styles/ParentDashboard.css';

function ParentDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    // 检查登录状态
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.isParent) {
      navigate('/parent-login');
      return;
    }
    
    loadUsers();
  }, [navigate]);

  const loadUsers = () => {
    const usersList = getAllUsersList();
    setUsers(usersList);
  };

  const handleGenerateReport = async (nickname) => {
    setLoading(true);
    setError(null);
    setReport(null);
    setSelectedUser(nickname);

    try {
      // 获取用户的所有游戏数据
      const userData = users.find(u => u.nickname === nickname);
      if (!userData || !userData.gameData) {
        throw new Error('该用户没有游戏数据');
      }

      // 收集所有场景的选择数据
      const allChoices = [];
      const allTraits = {};

      Object.keys(userData.gameData).forEach(location => {
        Object.keys(userData.gameData[location]).forEach(event => {
          const eventData = userData.gameData[location][event];
          if (eventData.choices) {
            allChoices.push(...eventData.choices);
            // 合并特征
            Object.keys(eventData.traits || {}).forEach(trait => {
              allTraits[trait] = (allTraits[trait] || 0) + eventData.traits[trait];
            });
          }
        });
      });

      if (allChoices.length === 0) {
        throw new Error('该用户还没有完成任何游戏场景');
      }

      const dataForAPI = {
        choices: allChoices,
        traits: allTraits,
        totalStages: allChoices.length,
        nickname: nickname
      };

      const reportData = await generateReport(dataForAPI);
      setReport(reportData);
    } catch (err) {
      console.error('生成报告失败:', err);
      setError('报告生成失败：' + (err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="parent-dashboard-container">
      <div className="parent-dashboard-content">
        <div className="parent-dashboard-header">
          <h1>👨‍👩‍👧 家长管理面板</h1>
          <div className="parent-dashboard-header-buttons">
            <button className="parent-config-button" onClick={() => setShowConfig(true)}>
              ⚙️ API 配置
            </button>
            <button className="parent-logout-button" onClick={handleLogout}>
              退出登录
            </button>
          </div>
        </div>

        <div className="parent-dashboard-body">
          <div className="users-list-section">
            <h2>账号列表</h2>
            {users.length === 0 ? (
              <div className="no-users">暂无游戏账号</div>
            ) : (
              <div className="users-list">
                {users.map((user) => (
                  <div key={user.nickname} className="user-card">
                    <div className="user-info">
                      <h3>{user.nickname}</h3>
                      <p>创建时间：{new Date(user.createdAt).toLocaleDateString()}</p>
                      {user.lastPlayed && (
                        <p>最后游戏：{new Date(user.lastPlayed).toLocaleDateString()}</p>
                      )}
                      <p>已完成场景：{Object.keys(user.gameData || {}).length} 个</p>
                    </div>
                    <button
                      className="generate-report-button"
                      onClick={() => handleGenerateReport(user.nickname)}
                      disabled={loading}
                    >
                      {loading && selectedUser === user.nickname ? '生成中...' : '生成报告'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {report && selectedUser && (
            <div className="report-section">
              <h2>📊 {selectedUser} 的分析报告</h2>
              <div className="report-content">
                <div className="report-item">
                  <h3>性格分析</h3>
                  <p>{report.personality}</p>
                </div>
                <div className="report-item">
                  <h3>MBTI 类型</h3>
                  <p>{report.mbti}</p>
                </div>
                <div className="report-item">
                  <h3>职业建议</h3>
                  <p>{report.career}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">{error}</div>
          )}
        </div>
      </div>
      <ConfigModal isOpen={showConfig} onClose={() => setShowConfig(false)} />
    </div>
  );
}

export default ParentDashboard;

