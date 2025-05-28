import { useState, useEffect } from "react";

/**
 * FUNCTION: useQuizChartData
 *
 * PURPOSE:
 * Formats relevant data and returns it to SpiderGraph.jsx to be rendered.
 *
 * PARAMS:
 * - data: object — full data.json mapping (including shortTitles for labels)
 *
 * LOCAL STATE:
 * - labels: array — chart labels (short titles for each selected topic)
 * - values: array — stance numbers (1–10) for each topic
 * - invertedSpokes: object — contains list of inverted spokes
 *
 * LOGIC NOTES:
 * - Accepts data.json map from SpiderGraph.jsx
 * - Fetches answers from local storage
 * - Handles inversion logic
 */

export function useQuizChartData(data) {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [invertedSpokes, setInvertedSpokes] = useState({});

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers"));
    if (!savedAnswers || !data) return;

    const newLabels = [];
    const newValues = [];

    Object.entries(savedAnswers).forEach(([topic, stanceNum]) => {
      const short = data?.[topic]?.shortTitle || topic;
      newLabels.push(short);
      newValues.push(parseInt(stanceNum));
    });

    setLabels(newLabels);
    setValues(newValues);

    setInvertedSpokes((prev) => {
      const newMap = {};
      newLabels.forEach((label) => {
        newMap[label] = prev[label] || false;
      });
      return newMap;
    });
  }, [data]);

  const toggleInversion = (label) => {
    setInvertedSpokes((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const adjustedValues = values.map((val, i) =>
    invertedSpokes[labels[i]] ? 11 - val : val
  );

  return { labels, values, adjustedValues, invertedSpokes, toggleInversion };
}
