import { useState, useEffect } from "react";
import "./App.css";
import TopicSelector from "./TopicSelector";
import QuizTemplate from "./QuizTemplate";
import ResultsPage from "./ResultsPage";

function App() {
  const [topics, setTopics] = useState({});
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState("select");

  useEffect(() => {
    fetch("/data.json")
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
          <ul>
            {selectedTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
      {currentPage === "quiz" && (
        <QuizTemplate
          selectedTopics={selectedTopics}
          data={topics}
          onComplete={() => setCurrentPage("results")}
        />
      )}
      {currentPage === "results" && <ResultsPage data={topics} />}
    </div>
  );
}

export default App;
