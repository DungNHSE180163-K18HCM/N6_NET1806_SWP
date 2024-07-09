import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jan 2023", "Feb 2023", "Mar 2023", "Apr 2023", "May 2023", "Jun 2023",
    "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023", "Nov 2023", "Dec 2023",
    "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024"
  ], // Each month from January 2023 to June 2024
  datasets: [
    {
      label: "Revenue",
      data: [
        1400, 1600, 1900, 2300, 1800, 2100, 2400, 2200, 2600, 2800, 3100, 3300,
        1500, 1700, 2000, 2400, 1900, 2200
      ], // Monthly revenue figures
      borderColor: "blue",
      backgroundColor: "rgba(0,0,255,0.2)",
      pointBackgroundColor: "blue",
      pointBorderColor: "blue",
      tension: 0.4,
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Revenue",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: $${context.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 35,
        minRotation: 35,
      },
    },
    y: {
      title: {
        display: true,
        text: 'Revenue ($)',
      },
    },
  },
};

const LineChartRevenue = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartRevenue;
