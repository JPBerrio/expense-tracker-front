import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from "chart.js"; // Importa los elementos necesarios

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const LineChart = () => {
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

      // Procesa los datos para el gráfico de línea
      const dates = [...new Set(expenses.map(exp => exp.expenseDate))];
      const amounts = dates.map(date =>
        expenses.filter(exp => exp.expenseDate === date)
          .reduce((acc, exp) => acc + exp.expenditureAmount, 0)
      );

      setData({
        labels: dates,
        datasets: [{
          label: 'Gastos por Fecha',
          data: amounts,
          fill: false,
          borderColor: '#36A2EB',
          tension: 0.1, // Suaviza la línea
        }],
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
        <Line data={data} options={{ maintainAspectRatio: false }} />
      ) : (
        <p className="text-gray-600">No hay datos disponibles para mostrar en el gráfico.</p>
      )}
    </div>
  );
};

export default LineChart;
