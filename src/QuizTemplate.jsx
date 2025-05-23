import { useEffect, useState } from "react";

function QuizTemplate({ selectedTopics, data, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentTopic = selectedTopics[currentIndex];
  const stances = data[currentTopic];
  const selectedStance = answers[currentTopic];

  const handleNext = () => {
    const isLast = currentIndex === selectedTopics.length - 1;

    if (isLast) {
      console.log("✅ Quiz complete:", answers);
      localStorage.setItem("quizAnswers", JSON.stringify(answers));
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div>
      <h1>{currentTopic}</h1>

      {Object.entries(stances).map(([stanceNumber, stanceText]) => {
        const isSelected = selectedStance === stanceNumber;

        return (
          <button
            key={stanceNumber}
            onClick={() =>
              setAnswers((prev) => ({ ...prev, [currentTopic]: stanceNumber }))
            }
            style={{
              backgroundColor: isSelected ? "green" : "white",
              color: isSelected ? "white" : "black",
              border: "1px solid #ccc",
              margin: "4px",
              padding: "8px 12px",
            }}
          >
            {stanceNumber}. {stanceText}
          </button>
        );
      })}

      <button
        onClick={() => {
          console.log("Current answers:", answers);
          handleNext();
        }}
      >
        Next
      </button>
    </div>
  );
}

export default QuizTemplate;
