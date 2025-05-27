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

export function SpiderGraph({ data }) {
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

    // Initialize inversion map if not already set
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

  const adjustedValues = values.map((val, index) =>
    invertedSpokes[labels[index]] ? 11 - val : val
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Your Stance",
        data: adjustedValues,
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
        ticks: {
          display: false, // hide numeric tick labels
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
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const original = values[ctx.dataIndex];
            const isInverted = invertedSpokes[labels[ctx.dataIndex]];
            return `${labels[ctx.dataIndex]}: ${
              isInverted ? 11 - original : original
            } (${isInverted ? "Inverted" : "Normal"})`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (!values.length) return null;

  return (
    <div className="w-full p-4 my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {labels.map((label) => (
          <button
            key={label}
            onClick={() => toggleInversion(label)}
            className={`px-3 py-2 text-xs rounded font-medium transition ${
              invertedSpokes[label]
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {label}: {invertedSpokes[label] ? "Inverted" : "Normal"}
          </button>
        ))}
      </div>

      <div className="h-[400px] sm:h-[500px] md:h-[600px]">
        <Radar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
