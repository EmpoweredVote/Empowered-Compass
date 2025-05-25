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
      localStorage.setItem("quizAnswers", JSON.stringify(answers));
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none p-4 border-b bg-white">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {currentTopic}
        </h1>
        <p className="text-center text-sm text-gray-500">
          Question {currentIndex + 1} of {selectedTopics.length}
        </p>
      </div>

      <div className="flex-1 px-4 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(stances).map(([stanceNumber, stanceText]) => {
          const isSelected = selectedStance === stanceNumber;

          return (
            <button
              key={stanceNumber}
              onClick={() =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentTopic]: stanceNumber,
                }))
              }
              className={`w-full text-left border rounded-lg px-4 py-3 transition text-sm
                ${
                  isSelected
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
            >
              <span className="font-medium">{stanceNumber}.</span> {stanceText}
            </button>
          );
        })}
      </div>

      <div className="flex-none p-4 border-t bg-white flex gap-4">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`w-1/2 py-3 rounded-lg font-medium transition shadow ${
            currentIndex === 0
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedStance}
          className={`w-1/2 py-3 rounded-lg font-medium transition text-white shadow ${
            selectedStance
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {currentIndex === selectedTopics.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default QuizTemplate;
