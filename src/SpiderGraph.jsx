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
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers"));
    if (!savedAnswers) return;

    const labels = [];
    const values = [];

    Object.entries(savedAnswers).forEach(([topic, stanceNum]) => {
      const short = data?.[topic]?.shortTitle || topic;
      labels.push(short);
      values.push(parseInt(stanceNum));
    });

    setChartData({
      labels,
      datasets: [
        {
          label: "Your Stance",
          data: values,
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(59, 130, 246, 1)",
        },
      ],
    });
  }, []);

  if (!chartData) return null;

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] p-4 my-8">
      <Radar data={chartData} options={options} />
    </div>
  );
}
