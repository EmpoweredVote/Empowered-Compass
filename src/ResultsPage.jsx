/**
 * COMPONENT: ResultsPage
 *
 * PURPOSE:
 * Displays the user's selected stances after completing the quiz.
 * Pulls data from localStorage and topic data for display.
 *
 * PROPS:
 * - data: object — full data.json mapping (with shortTitles)
 * - onReset: function — resets app state to allow user to retake the quiz
 *
 * LOGIC NOTES:
 * - Reads 'quizAnswers' from localStorage to show selected stance for each topic
 * - Maps stance number to its corresponding text explanation using provided data
 *
 * RELATED FILES:
 * - QuizTemplate.jsx → saves data to localStorage used here
 * - SpiderGraph.jsx → visualizes the same data in graph format
 */

function ResultsPage({ data, onReset }) {
  const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers"));

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Your Results
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Here's what you selected for each topic:
        </p>

        <div className="space-y-4">
          {Object.entries(savedAnswers).map(([topic, stanceNumber]) => {
            const stanceText =
              data?.[topic]?.[stanceNumber] || "Unknown stance";
            return (
              <div
                key={topic}
                className="p-4 rounded-lg border bg-white shadow-sm"
              >
                <h2 className="font-semibold text-gray-800 text-lg mb-1">
                  {topic}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium">Stance #{stanceNumber}</span>
                </p>
                <p className="text-gray-700">{stanceText}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onReset}
            className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
