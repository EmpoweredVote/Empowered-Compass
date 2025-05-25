import { useState, useEffect } from "react";
import "./App.css";
import TopicSelector from "./TopicSelector";
import QuizTemplate from "./QuizTemplate";
import ResultsPage from "./ResultsPage";
import { SpiderGraph } from "./SpiderGraph";

function App() {
  const [topics, setTopics] = useState({});
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState("select");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTopics(data);
      });
  }, []);

  const handleSelectTopic = (topic) => {
    console.log("Topic selected: ", topic);
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic); // remove topic if button is unselected
      } else {
        return [...prev, topic]; // add topic if button is selected
      }
    });
  };

  const handleResetQuiz = () => {
    localStorage.removeItem("quizAnswers");
    setSelectedTopics([]);
    setCurrentPage("select");
  };

  return (
    <div>
      {currentPage === "select" && (
        <div>
          <TopicSelector
            topics={topics}
            onSelect={handleSelectTopic}
            selectedTopics={selectedTopics}
            onContinue={() => setCurrentPage("quiz")}
          />
        </div>
      )}
      {currentPage === "quiz" && (
        <QuizTemplate
          selectedTopics={selectedTopics}
          data={topics}
          onComplete={() => setCurrentPage("results")}
        />
      )}
      {currentPage === "results" && (
        <div>
          <SpiderGraph data={topics} />
          <ResultsPage data={topics} onReset={handleResetQuiz} />
        </div>
      )}
    </div>
  );
}

export default App;
