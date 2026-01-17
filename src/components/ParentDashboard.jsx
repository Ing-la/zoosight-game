import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsersList, logout, getCurrentUser, deleteUser, deleteCurrentUser } from '../utils/userStorage';
import { generateReport } from '../api/ai';
import { getApiConfig } from '../utils/storage';
import ConfigModal from './ConfigModal';
import '../styles/ParentDashboard.css';

function ParentDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingModel, setLoadingModel] = useState(null);
  const [error, setError] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetUser, setDeleteTargetUser] = useState(null);
  const [showDeleteParentConfirm, setShowDeleteParentConfirm] = useState(false);

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

    // 获取当前使用的模型名称
    const config = getApiConfig();
    let modelName = null;
    if (config && config.apiKey) {
      switch (config.model) {
        case 'gemini':
          modelName = 'Google Gemini';
          break;
        case 'zhipu':
          modelName = '智谱 AI (GLM)';
          break;
        case 'tongyi':
          modelName = '通义千问 (Qwen)';
          break;
        default:
          modelName = 'AI 模型';
      }
    }
    setLoadingModel(modelName);

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
      setLoadingModel(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteUser = (nickname) => {
    setDeleteTargetUser(nickname);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteUser = () => {
    if (deleteTargetUser) {
      const success = deleteUser(deleteTargetUser);
      if (success) {
        loadUsers(); // 重新加载用户列表
        if (selectedUser === deleteTargetUser) {
          setSelectedUser(null);
          setReport(null);
        }
      }
      setShowDeleteConfirm(false);
      setDeleteTargetUser(null);
    }
  };

  const handleDeleteParentAccount = () => {
    setShowDeleteParentConfirm(true);
  };

  const confirmDeleteParentAccount = () => {
    const success = deleteCurrentUser();
    if (success) {
      navigate('/');
    }
    setShowDeleteParentConfirm(false);
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
            <button className="parent-delete-button" onClick={handleDeleteParentAccount}>
              注销账号
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
                    <div className="user-card-buttons">
                      <button
                        className="generate-report-button"
                        onClick={() => handleGenerateReport(user.nickname)}
                        disabled={loading}
                      >
                        {loading && selectedUser === user.nickname 
                          ? (loadingModel ? `正在调用 ${loadingModel} 分析...` : '正在使用模拟数据生成报告...')
                          : '生成报告'}
                      </button>
                      <button
                        className="delete-user-button"
                        onClick={() => handleDeleteUser(user.nickname)}
                        title="删除账号"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {report && selectedUser && (
            <div className="report-section">
              <h2>📊 {selectedUser} 的分析报告</h2>
              {report.modelDisplayName && (
                <div className="report-model-info">
                  <span className="model-badge">
                    {report.modelDisplayName.includes('模拟数据') 
                      ? `📝 ${report.modelDisplayName}` 
                      : `🤖 使用 ${report.modelDisplayName} 生成`}
                  </span>
                </div>
              )}
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
      
      {/* 删除用户确认对话框 */}
      {showDeleteConfirm && (
        <div className="delete-confirm-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-confirm-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-confirm-modal-header">
              <h2>⚠️ 确认删除账号</h2>
              <button className="delete-confirm-modal-close" onClick={() => setShowDeleteConfirm(false)}>×</button>
            </div>
            <div className="delete-confirm-modal-body">
              <p>确定要删除账号 <strong>"{deleteTargetUser}"</strong> 吗？</p>
              <p className="delete-warning">此操作将删除该账号的所有游戏数据，且不可恢复！</p>
            </div>
            <div className="delete-confirm-modal-footer">
              <button className="delete-confirm-button delete-confirm-cancel" onClick={() => setShowDeleteConfirm(false)}>
                取消
              </button>
              <button className="delete-confirm-button delete-confirm-yes" onClick={confirmDeleteUser}>
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 删除家长账号确认对话框 */}
      {showDeleteParentConfirm && (
        <div className="delete-confirm-modal-overlay" onClick={() => setShowDeleteParentConfirm(false)}>
          <div className="delete-confirm-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-confirm-modal-header">
              <h2>⚠️ 确认注销账号</h2>
              <button className="delete-confirm-modal-close" onClick={() => setShowDeleteParentConfirm(false)}>×</button>
            </div>
            <div className="delete-confirm-modal-body">
              <p>确定要注销当前家长账号吗？</p>
              <p className="delete-warning">此操作将删除您的账号和所有数据，且不可恢复！</p>
            </div>
            <div className="delete-confirm-modal-footer">
              <button className="delete-confirm-button delete-confirm-cancel" onClick={() => setShowDeleteParentConfirm(false)}>
                取消
              </button>
              <button className="delete-confirm-button delete-confirm-yes" onClick={confirmDeleteParentAccount}>
                确认注销
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentDashboard;

