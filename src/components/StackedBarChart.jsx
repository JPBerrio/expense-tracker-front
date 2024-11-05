import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StackedBarChart = () => {
  const [data, setData] = useState({});
  const API_URL = "https://expense-tracker-api-jsmc.onrender.com/api/expenses?fetchAll=true";

  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const expenses = response.data;

      const categories = [...new Set(expenses.map(exp => exp.expenseCategoryEntity.nameCategory))];
      const monthlyData = {};

      expenses.forEach(exp => {
        const month = new Date(exp.expenseDate).toLocaleString('default', { month: 'long' });
        if (!monthlyData[month]) {
          monthlyData[month] = {};
        }
        const category = exp.expenseCategoryEntity.nameCategory;
        if (!monthlyData[month][category]) {
          monthlyData[month][category] = 0;
        }
        monthlyData[month][category] += exp.expenditureAmount;
      });

      const labels = Object.keys(monthlyData);
      const colors = ["#2ecc71", "#27ae60", "#ecf0f1", "#95a5a6", "#34495e", "#2c3e50", "#1a1a1a"];
      const datasets = categories.map((category, index) => ({
        label: category,
        data: labels.map(month => monthlyData[month][category] || 0),
        backgroundColor: colors[index % colors.length],
      }));

      setData({
        labels: labels,
        datasets: datasets,
      });
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full relative">
      {data.labels ? (
        <Bar
          data={data}
          options={{
            scales: {
              x: { stacked: false },
              y: { stacked: true },
            },
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <p className="text-gray-600">No hay datos disponibles para mostrar en el gráfico.</p>
      )}
    </div>
  );
};

export default StackedBarChart;
