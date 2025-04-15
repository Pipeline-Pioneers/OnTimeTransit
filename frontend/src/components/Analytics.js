import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Analytics({ data }) {
  const barData = {
    labels: data?.labels || [], // Default to an empty array if labels are undefined
    datasets: [
      {
        label: "Count",
        data: data?.values || [], // Default to an empty array if values are undefined
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6c757d"],
        borderColor: ["#0056b3", "#218838", "#e0a800", "#a71d2a", "#495057"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: data?.labels || [],
    datasets: [
      {
        data: data?.values || [],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6c757d"],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="analytics">
      <h3>Analytics Overview</h3>
      <div className="chart-container">
        <div className="chart">
          <h4>Bar Chart</h4>
          <Bar data={barData} />
        </div>
        <div className="chart">
          <h4>Pie Chart</h4>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;