// PieChart.js
import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"; // Importa los elementos necesarios

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [data, setData] = useState({});
  const API_URL =
    "https://8fbe-190-109-4-228.ngrok-free.app/api/expenses?fetchAll=true";
  const canvasRef = useRef(null);

  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken"); // Obtén el token JWT del almacenamiento local
    console.log("funciona");
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const expenses = response.data;
      console.log("Response data:", expenses);

      // Procesa los datos como lo hiciste en ExpenseGraphic
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
        return; // Salir si no hay datos
      }

      setData({
        labels: categories,
        datasets: [
          {
            data: dataByCategory,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
