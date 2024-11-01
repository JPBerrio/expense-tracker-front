import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"; // Importa los elementos necesarios

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StackedBarChart = () => {
  const [data, setData] = useState({});
  const API_URL = "https://8fbe-190-109-4-228.ngrok-free.app/api/expenses?fetchAll=true"; // Asegúrate de usar tu API aquí

  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken"); // Obtén el token JWT del almacenamiento local
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      const expenses = response.data;

      // Procesa los datos para el gráfico de barras apiladas
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
      const datasets = categories.map(category => ({
        label: category,
        data: labels.map(month => monthlyData[month][category] || 0),
        backgroundColor: '#FFCE56', // Cambia el color si es necesario
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
              x: { stacked: true },
              y: { stacked: true },
            },
            maintainAspectRatio: false, // Mantiene la proporción al redimensionar
          }}
        />
      ) : (
        <p className="text-gray-600">No hay datos disponibles para mostrar en el gráfico.</p>
      )}
    </div>
  );
};

export default StackedBarChart;
