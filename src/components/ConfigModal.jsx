import React, { useState, useEffect } from 'react';
import { saveApiConfig, getApiConfig } from '../utils/storage';
import '../styles/ConfigModal.css';

function ConfigModal({ isOpen, onClose }) {
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 加载已保存的配置
      const config = getApiConfig();
      if (config) {
        setSelectedModel(config.model || 'gemini');
        setApiKey(config.apiKey || '');
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('请输入 API Key');
      return;
    }

    saveApiConfig({
      model: selectedModel,
      apiKey: apiKey.trim()
    });

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="config-modal-overlay" onClick={handleCancel}>
      <div className="config-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="config-modal-header">
          <h2>⚙️ API 配置</h2>
          <button className="config-modal-close" onClick={handleCancel}>×</button>
        </div>
        
        <div className="config-modal-body">
          <div className="config-field">
            <label>选择大模型：</label>
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className="config-select"
            >
              <option value="gemini">Google Gemini</option>
              <option value="zhipu">智谱 AI (GLM)</option>
              <option value="tongyi">通义千问 (Qwen)</option>
            </select>
          </div>

          <div className="config-field">
            <label>API Key：</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`请输入 ${selectedModel === 'gemini' ? 'Gemini' : selectedModel === 'zhipu' ? '智谱' : '通义千问'} API Key`}
              className="config-input"
            />
          </div>

          <div className="config-hint">
            <p>💡 提示：</p>
            <ul>
              <li>API Key 将保存在本地，不会上传到服务器</li>
              <li>如果不配置 API Key，将使用模拟数据生成报告</li>
              <li>Gemini: <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer">获取 API Key</a></li>
              <li>智谱: <a href="https://open.bigmodel.cn/" target="_blank" rel="noopener noreferrer">获取 API Key</a></li>
              <li>通义千问: <a href="https://dashscope.aliyun.com/" target="_blank" rel="noopener noreferrer">获取 API Key</a></li>
            </ul>
          </div>
        </div>

        <div className="config-modal-footer">
          {saved && <span className="config-saved">✓ 保存成功！</span>}
          <button className="config-button config-button-cancel" onClick={handleCancel}>
            取消
          </button>
          <button className="config-button config-button-save" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfigModal;




