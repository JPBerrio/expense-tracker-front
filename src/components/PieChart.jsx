// PieChart.js
import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [data, setData] = useState({});
  const API_URL =
    "https://b135-181-58-39-178.ngrok-free.app/api/expenses?fetchAll=true";

  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken");
    console.log("funciona");
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const expenses = response.data;
      console.log("Response data:", expenses);

      const categories = [
        ...new Set(
          expenses.map((exp) => exp.expenseCategoryEntity.nameCategory)
        ),
      ];
      const dataByCategory = categories.map((category) =>
        expenses
          .filter((exp) => exp.expenseCategoryEntity.nameCategory === category)
          .reduce((acc, exp) => acc + exp.expenditureAmount, 0)
      );

      if (categories.length === 0 || dataByCategory.length === 0) {
        console.warn("No hay datos para mostrar en el gráfico.");
        return;
      }

      setData({
        labels: categories,
        datasets: [
          {
            data: dataByCategory,
            backgroundColor: ["#2ecc71", "#27ae60", "#ecf0f1", "#95a5a6", "#34495e", "#2c3e50", "#1a1a1a"],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  console.log("Data for PieChart:", data);

  return (
    <div className="w-full h-full relative">
      {data.labels ? (
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      ) : (
        <p className="text-gray-600">No hay datos disponibles para mostrar en el gráfico.</p>
      )}
    </div>
  );
};

export default PieChart;
