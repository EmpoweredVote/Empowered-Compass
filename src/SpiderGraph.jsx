import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/**
 * COMPONENT: SpiderGraph
 *
 * PURPOSE:
 * Renders a radar chart ("spider graph") showing quiz answers for each selected topic.
 * Includes a button to invert the axis direction of the chart.
 *
 * PROPS:
 * - data: object — full data.json mapping (including shortTitles for labels)
 *
 * LOCAL STATE:
 * - labels: array — chart labels (short titles for each selected topic)
 * - values: array — stance numbers (1–10) for each topic
 * - showInverted: boolean — whether the radial axis is flipped (min/max reversed)
 *
 * LOGIC NOTES:
 * - Pulls stance data from localStorage["quizAnswers"]
 * - Uses Chart.js + react-chartjs-2 to render a responsive radar chart
 * - Toggling `showInverted` reverses the axis orientation for all spokes
 */

export function SpiderGraph({ data }) {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [showInverted, setShowInverted] = useState(false);

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
  }, [data]);

  const chartData = {
    labels,
    datasets: [
      {
        label: showInverted ? "Inverted Axis" : "Your Stance",
        data: values,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 10,
        reverse: showInverted,
        ticks: {
          stepSize: 1,
          color: "#4B5563",
        },
        grid: {
          color: "#E5E7EB",
        },
        pointLabels: {
          font: {
            size: 14,
          },
          color: "#374151",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (!values.length) return null;

  return (
    <div className="w-full p-4 my-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowInverted((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {showInverted ? "Show Original Axis" : "Invert Axis"}
        </button>
      </div>

      <div className="h-[400px] sm:h-[500px] md:h-[600px]">
        <Radar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
