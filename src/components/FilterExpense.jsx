import { useState } from "react";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FilterExpense() {
  const [selectedOption, setSelectedOption] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "custom") {
      setDateRange([null, null]);
    }
  };

  const handleCustomDateChange = (event) => {
    setCustomDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Opción seleccionada:", selectedOption);
    if (selectedOption === "custom" && startDate && endDate) {
      console.log(
        "Rango de fechas:",
        `${startDate.toISOString().split("T")[0]} - ${
          endDate.toISOString().split("T")[0]
        }`
      );
    }
  };

  return (
    <div className="h-[100%] w-[100%] bg-lime-500">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md h-[30%] w-[40%]"
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
    </div>
  );
}

export default FilterExpense;
