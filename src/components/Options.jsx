import React from 'react';
import '../styles/Options.css';

function Options({ options, onSelect }) {
  return (
    <div className="options-container">
      {options.map((option) => (
        <button
          key={option.id}
          className="option-button"
          onClick={() => onSelect(option)}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}

export default Options;

