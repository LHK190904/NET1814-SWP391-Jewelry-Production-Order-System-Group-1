import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

function SaleTrend() {
  const [revenue, setRevenue] = useState([]);
  const startDate = "2024-01-01T00:00:00Z";
  const endDate = "2024-12-31T23:59:59Z";

  const fetchRevenue = async () => {
    try {
      const response = await axiosInstance.get(
        `dashboard/revenue?startDate=${startDate}&endDate=${endDate}`
      );
      setRevenue(response.data.result);
      console.log("Revenue: ", response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Profits",
        data: [
          1000, 4000, 2000, 3000, 6000, 3000, 8000, 10000, 4000, 7000, 8000,
          12000,
        ],
        fill: true,
        backgroundColor: "#9CDFFF",
        borderColor: "#00ABFF",
      },
      {
        label: "Sales",
        data: [100, 400, 200, 300, 500, 400, 800, 1000, 500, 700, 900, 1200],
        fill: true,
        backgroundColor: "#FFA8A8",
        borderColor: "#FF0000",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-4xl font-bold">SALES TRENDS</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default SaleTrend;
