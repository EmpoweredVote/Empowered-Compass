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

const options = {
  scales: {
    r: {
      suggestedMin: 1,
      suggestedMax: 10,
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

  const currentValues = showInverted ? values.map((v) => 11 - v) : values;

  const chartData = {
    labels,
    datasets: [
      {
        label: showInverted ? "Inverted Stance" : "Your Stance",
        data: currentValues,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  if (!values.length) return null;

  return (
    <div className="w-full p-4 my-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowInverted((prev) => !prev)}
          className="px-4 py-2 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {showInverted ? "Show Original" : "Invert Graph"}
        </button>
      </div>

      <div className="h-[400px] sm:h-[500px] md:h-[600px]">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
}
