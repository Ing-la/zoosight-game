import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateReport } from '../api/ai';
import useGameStore from '../store/gameStore';
import '../styles/Report.css';

function Report() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
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
      })
      .catch(error => {
        console.error('生成报告失败:', error);
        setError('报告生成失败：' + (error.message || '未知错误'));
        setLoading(false);
      });
  }, [getAllChoices, calculateTraits]);

  const handleRestart = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="report-container">
        <div className="loading">正在生成分析报告...</div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <div className="report-content">
        <h1 className="report-title">🎉 游戏完成！</h1>
        {report ? (
          <div className="report-body">
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

