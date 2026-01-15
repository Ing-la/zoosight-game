import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, createParentAccount } from '../utils/userStorage';
import '../styles/Login.css';

function Login({ onLogin, isParent = false }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nickname.trim() || !password.trim()) {
      setError('请输入昵称和密码');
      return;
    }

    try {
      if (isRegister) {
        // 注册
        let success;
        if (isParent) {
          // 注册家长账号
          success = createParentAccount(nickname.trim(), password);
        } else {
          // 注册普通账号
          success = registerUser(nickname.trim(), password);
        }
        
        if (success) {
          // 注册成功后自动登录
          onLogin(nickname.trim(), isParent);
          if (isParent) {
            navigate('/parent-dashboard');
          } else {
            navigate('/location-select');
          }
        } else {
          setError('注册失败，昵称可能已存在');
        }
      } else {
        // 登录
        const success = loginUser(nickname.trim(), password, isParent);
        if (success) {
          onLogin(nickname.trim(), isParent);
          if (isParent) {
            navigate('/parent-dashboard');
          } else {
            navigate('/location-select');
          }
        } else {
          setError('登录失败，昵称或密码错误');
        }
      }
    } catch (err) {
      setError('操作失败：' + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <button 
          className="login-back-button"
          onClick={() => navigate('/')}
          title="返回主页"
        >
          ← 返回主页
        </button>
        
        <h1 className="login-title">
          {isParent ? '👨‍👩‍👧 家长登录' : '🎮 儿童情景游戏'}
        </h1>
        <p className="login-subtitle">
          {isRegister ? '创建新账号' : '登录游戏'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>昵称：</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入昵称"
              className="login-input"
              autoFocus
            />
          </div>

          <div className="login-field">
            <label>密码：</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="login-input"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            {isRegister ? '注册' : '登录'}
          </button>
        </form>

        <div className="login-switch">
          <button
            type="button"
            className="login-switch-button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? '已有账号？点击登录' : '没有账号？点击注册'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;

