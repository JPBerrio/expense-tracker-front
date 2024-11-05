// ExpenseGraphic.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_URL =
  "https://expense-tracker-api-jsmc.onrender.com/api/expenses?fetchAll=true";
const ExpenseGraphic = ({ label }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const fetchExpenses = async () => {
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
      console.log(response.data);
      const currentDate = new Date();
      const lastMonth = new Date(
        currentDate.setMonth(currentDate.getMonth() - 1)
      );
      const filteredExpenses = expenses.filter(
        (exp) => new Date(exp.expenseDate) >= lastMonth
      );
      console.log("Filtered Expenses:", filteredExpenses);

      let categories, data;

      if (label === "Expenses by Category") {
        categories = [
          ...new Set(
            expenses.map((exp) => exp.expenseCategoryEntity.nameCategory)
          ),
        ];
        data = categories.map(
          (category) =>
            expenses
              .filter(
                (exp) => exp.expenseCategoryEntity.nameCategory === category
              )
              .reduce((acc, exp) => acc + exp.expenditureAmount, 0) || 0
        );
      } else if (label === "Expenses by Date") {
        const expensesByDate = {};

        filteredExpenses.forEach((exp) => {
          const date = exp.expenseDate;
          if (!expensesByDate[date]) {
            expensesByDate[date] = 0;
          }
          expensesByDate[date] += exp.expenditureAmount;
        });

        categories = Object.keys(expensesByDate);
        data = Object.values(expensesByDate);
      }

      const maxValue = Math.max(...data);

      const colors = [
        "#2ecc71",
        "#27ae60",
        "#B6F25C",
        "#95a5a6",
        "#34495e",
        "#2c3e50",
        "#1a1a1a",
      ];

      setChartData({
        labels: categories,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: colors.slice(0, data.length),
          },
        ],
      });

      setChartOptions({
        scales: {
          y: {
            beginAtZero: true,
            max: maxValue,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [label]);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow border border-gray-300 w-[47%] flex items-center justify-center h-3/4">
      {chartData.labels ? (
        <Bar data={chartData} options={{ chartOptions }} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default ExpenseGraphic;
