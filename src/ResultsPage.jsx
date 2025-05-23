function ResultsPage({ data }) {
  const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers"));

  return (
    <div>
      <h1>Your Results</h1>
      {Object.entries(savedAnswers).map(([topic, stanceNumber]) => {
        const stanceText = data?.[topic]?.[stanceNumber] || "Unknown stance";
        return (
          <p key={topic}>
            <strong>{topic}:</strong> #{stanceNumber} <br></br>
            {stanceText}
          </p>
        );
      })}
    </div>
  );
}

export default ResultsPage;
