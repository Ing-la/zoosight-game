import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateReport } from '../api/ai';
import { getApiConfig } from '../utils/storage';
import useGameStore from '../store/gameStore';
import '../styles/Report.css';

function Report() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingModel, setLoadingModel] = useState(null);
  const [error, setError] = useState(null);
  
  const getAllChoices = useGameStore((state) => state.getAllChoices);
  const calculateTraits = useGameStore((state) => state.calculateTraits);

  useEffect(() => {
    // 从 store 获取用户选择数据
    const userChoices = getAllChoices();
    const traits = calculateTraits();
    
    // 如果没有选择数据，显示错误
    if (userChoices.length === 0) {
      setError('没有找到游戏数据，请重新开始游戏');
      setLoading(false);
      return;
    }
    
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
    
    // 准备发送给 API 的数据（包含选择和特征）
    const dataForAPI = {
      choices: userChoices,
      traits: traits,
      totalStages: userChoices.length
    };
    
    generateReport(dataForAPI)
      .then(data => {
        setReport(data);
        setLoading(false);
        setLoadingModel(null);
      })
      .catch(error => {
        console.error('生成报告失败:', error);
        setError('报告生成失败：' + (error.message || '未知错误'));
        setLoading(false);
        setLoadingModel(null);
      });
  }, [getAllChoices, calculateTraits]);

  const handleRestart = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="report-container">
        <div className="loading">
          {loadingModel 
            ? `正在调用 ${loadingModel} 分析...` 
            : '正在使用模拟数据生成报告...'}
        </div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <div className="report-content">
        <h1 className="report-title">🎉 游戏完成！</h1>
        {report ? (
          <div className="report-body">
            {report.modelDisplayName && (
              <div className="report-model-info">
                <span className="model-badge">
                  {report.modelDisplayName.includes('模拟数据') 
                    ? `📝 ${report.modelDisplayName}` 
                    : `🤖 使用 ${report.modelDisplayName} 生成`}
                </span>
              </div>
            )}
            <div className="report-section">
              <h2>性格分析</h2>
              <p>{report.personality}</p>
            </div>
            <div className="report-section">
              <h2>MBTI 类型</h2>
              <p>{report.mbti}</p>
            </div>
            <div className="report-section">
              <h2>职业建议</h2>
              <p>{report.career}</p>
            </div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="error-message">报告生成失败，请稍后重试</div>
        )}
        <button className="restart-button" onClick={handleRestart}>
          重新开始
        </button>
      </div>
    </div>
  );
}

export default Report;

