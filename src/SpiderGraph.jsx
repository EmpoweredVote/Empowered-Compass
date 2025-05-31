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
import { useEffect, useRef, useState, useMemo } from "react";
import { useQuizChartData } from "./useQuizChartData";
import { createLabelClickPlugin } from "./labelClickPlugin";

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
 * - Calls useQuizChartData() and passes mapped data.json object
 * - useQuizChartData() returns everything we need to render the radar chart.
 * - Uses Chart.js + react-chartjs-2 to render the responsive radar chart
 * - We use a custom chart.js plugin to turn labels into invert buttons
 */

export function SpiderGraph({ data }) {
  const chartRef = useRef(null);
  // const [forceRerender, setForceRerender] = useState(false);

  const {
    labels,
    values,
    politicianValues,
    adjustedValues,
    adjustedPoliticianValues,
    invertedSpokes,
    toggleInversion,
  } = useQuizChartData(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Your Values",
        data: adjustedValues,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
      {
        label: "Politician Values",
        data: adjustedPoliticianValues,
        backgroundColor: "rgba(87, 32, 13, 0.2)",
        borderColor: "rgba(87, 32, 13, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(87, 32, 13, 1)",
      },
    ],
  };
  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { display: false },
        grid: { color: "#E5E7EB" },
        pointLabels: {
          font: { size: 14 },
          color: "#374151",
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = labels[ctx.dataIndex];
            const datasetIndex = ctx.datasetIndex;
            const isInverted = invertedSpokes[label];

            if (datasetIndex === 0) {
              // Your Values
              const original = values[ctx.dataIndex];
              return `${label}: ${original} (${
                isInverted ? "Inverted" : "Normal"
              })`;
            } else if (datasetIndex === 1) {
              // Politician's Values
              const original = politicianValues[ctx.dataIndex];
              return `${label}: ${original} (${
                isInverted ? "Inverted" : "Normal"
              })`;
            }

            return `${label}: ${ctx.raw}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const clickPlugin = useMemo(
    () => createLabelClickPlugin(labels, invertedSpokes, toggleInversion),
    [labels, invertedSpokes, toggleInversion]
  );

  if (!values.length) return null;

  return (
    <div className="w-full p-4 my-8">
      {/* <button onClick={() => setForceRerender((r) => !r)}>Rerender</button> */}
      <div className="h-[400px] sm:h-[500px] md:h-[600px] relative">
        <Radar
          // key={forceRerender ? "on" : "off"}
          ref={chartRef}
          data={chartData}
          options={chartOptions}
          plugins={[clickPlugin]}
        />
      </div>
    </div>
  );
}
