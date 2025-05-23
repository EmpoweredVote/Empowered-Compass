import { useState, useEffect } from "react";

function TopicSelector({ topics, onSelect, selectedTopics, onContinue }) {
  const isAtLimit = selectedTopics.length >= 8;

  return (
    <div>
      {Object.keys(topics).map((topic) => {
        const isSelected = selectedTopics.includes(topic);
        const isDisabled = selectedTopics.length >= 8;

        return (
          <button
            key={topic}
            onClick={() => onSelect(topic)}
            disabled={isSelected ? false : isDisabled}
            style={{
              backgroundColor: isSelected ? "green" : "white",
              color: isSelected ? "white" : "black",
              border: "1px solid #ccc",
              margin: "4px",
              padding: "8px 12px",
            }}
          >
            {topic}
          </button>
        );
      })}
      {isAtLimit && <button onClick={onContinue}>Continue to Survey</button>}
    </div>
  );
}

export default TopicSelector;
