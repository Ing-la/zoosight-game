import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Options from './Options';
import stagesData from '../data/stages.json';
import useGameStore from '../store/gameStore';
import '../styles/Scene.css';

function Scene() {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(null);
  const startTimeRef = useRef(Date.now());
  
  const addChoice = useGameStore((state) => state.addChoice);
  const setCurrentStageId = useGameStore((state) => state.setCurrentStage);

  useEffect(() => {
    const stage = stagesData.stages.find(s => s.id === stageId);
    if (stage) {
      setCurrentStage(stage);
      setCurrentStageId(stageId);
      // 重置开始时间
      startTimeRef.current = Date.now();
    } else {
      // 如果没有找到关卡，跳转到报告页
      navigate('/report');
    }
  }, [stageId, navigate, setCurrentStageId]);

  const handleOptionSelect = (option) => {
    // 计算耗时
    const timeSpent = Date.now() - startTimeRef.current;
    
    // 保存选择数据到 store
    addChoice(stageId, {
      ...option,
      timeSpent: Math.round(timeSpent / 1000) // 转换为秒
    });
    
    if (option.nextStage) {
      navigate(`/scene/${option.nextStage}`);
    } else {
      // 没有下一关，跳转到报告页
      navigate('/report');
    }
  };

  if (!currentStage) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="scene">
      <div 
        className="scene-background"
        style={{
          backgroundImage: `url(/assets/images/${currentStage.background})`
        }}
      >
        <div className="scene-content">
          <h2 className="scene-title">{currentStage.title}</h2>
          <div className="scene-question">{currentStage.question}</div>
          <Options 
            options={currentStage.options}
            onSelect={handleOptionSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default Scene;

