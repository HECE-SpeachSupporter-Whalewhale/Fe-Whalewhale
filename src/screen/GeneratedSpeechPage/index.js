/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import whaleGif from '../../images/whale.gif';

const GeneratedSpeechPage = ({ speechData, hideModal }) => {
  const navigate = useNavigate();
  const { title, body, speed_minute, speed_second, speed_check } = speechData;

  const handleNavigateToPractice = () => {
    hideModal();
    navigate('/practice', { 
      state: { 
        title, 
        body, 
        speed_minute, 
        speed_second, 
        speed_check,
        estimatedDuration: calculateEstimatedDuration(body, speed_check, speed_minute, speed_second)
      } 
    });
  };

  const handleNavigateToGeneration = () => {
    hideModal();
    navigate('/generation', { 
      state: { 
        title, 
        body, 
        speed_minute, 
        speed_second, 
        speed_check,
        estimatedDuration: calculateEstimatedDuration(body, speed_check, speed_minute, speed_second)
      } 
    });
  };

  const calculateEstimatedDuration = (body, speed_check, speed_minute, speed_second) => {
    if (speed_check && speed_minute && speed_second) {
      return parseInt(speed_minute, 10) * 60 + parseInt(speed_second, 10);
    } else {
      const wordsPerMinute = 100;
      const wordCount = body.trim().split(/\s+/).length;
      return Math.ceil((wordCount / wordsPerMinute) * 60);
    }
  };

  return (
    <div className="modal-overlay-ge">
      <div className="modal-content-ge">
        <button className="modal-close-ge" onClick={hideModal}>&#x2715;</button>
        <h2 className="modal-title-ge">{title ? `제목: ${title}` : ''}</h2>
        <div className="gif-box-ge">
          <img src={whaleGif} alt="Whale" className="whale-gif-ge" />
        </div>
        <p className="generated-title-ge">대본이 생성되었어요!</p>
        <p className="confirmation-text-ge">대본을 확인하시겠어요?</p>
        <button className="modal-button-ge" onClick={handleNavigateToGeneration}>확인하기</button>
        <button className="modal-button-ge modal-button-secondary-ge" onClick={handleNavigateToPractice}>발표하기</button>
      </div>
    </div>
  );
};

export default GeneratedSpeechPage;