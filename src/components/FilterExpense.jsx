import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListOfExpenses from "./ListOfExpenses";
import axios from "axios";

function FilterExpense() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async (url) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log("Datos recibidos:", response.data);
      setExpenses(response.data.content || []);
      console.log("Gastos actualizados:", response.data.content || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "custom") {
      setDateRange([null, null]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado");
    console.log("Selected Option:", selectedOption);
    console.log("Date Range:", dateRange);
    setLoading(true);

    let url = "";
    if (selectedOption === "lastWeek") {
      url =
        "https://b135-181-58-39-178.ngrok-free.app/api/expenses/users/last-week";
      console.log("haciendo peticion a last week");
    } else if (selectedOption === "lastMonth") {
      url =
        "https://b135-181-58-39-178.ngrok-free.app/api/expenses/users/last-month";
    } else if (selectedOption === "lastThreeMonths") {
      url =
        "https://b135-181-58-39-178.ngrok-free.app/api/expenses/users/last-three-months";
    } else if (selectedOption === "custom" && startDate && endDate) {
      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];
      url = `https://b135-181-58-39-178.ngrok-free.app/api/expenses/users/filter?startDate=${startDateString}&endDate=${endDateString}`;
    }

    if (url) {
      fetchExpenses(url);
      console.log("Llamando a la API con URL:", url);
    } else {
      setLoading(false);
      console.error("No valid selection made.");
    }
  };

  return (
    <div className="h-[100%] w-[100%] bg-lime-500 flex flex-col items-center justify-between">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-lg shadow-md h-[25%] w-[40%] mb-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Selecciona una opción de fecha
        </h2>
        <div className="mb-4">
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una opción</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastThreeMonths">Last Three Months</option>
            <option value="custom">Custom Filter</option>
          </select>
        </div>
        {selectedOption === "custom" && (
          <div className="mb-4 relative">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              placeholderText="Selecciona un rango de fechas"
              dateFormat="yyyy/MM/dd"
              className="w-full pl-8 pr-2 py-2 border-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Enviar
        </button>
      </form>
      <section className="border-black border-2 h-[70%] w-[100%] overflow-auto">
        {loading ? <p>Cargando...</p> : <ListOfExpenses expenses={expenses} />}
      </section>
    </div>
  );
}

export default FilterExpense;
