import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { toast } from "sonner";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditExpenseModal from "./EditExpenseModal";
import ConfirmationModal from "./ConfirmationModal";

const API_URL = "https://0698-200-122-222-162.ngrok-free.app/api/expenses";

function ListOfExpenses() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const itemsPerPage = 9;

  const fetchExpenses = async (url) => {
    setLoading(true);
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      setItems(response.data.content || []);
      setTotalPages(Math.ceil(response.data.totalPages || 0));
      toast.success("Datos cargados exitosamente");
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = `${API_URL}?page=${currentPage}&size=${itemsPerPage}`;
    fetchExpenses(url);
  }, [currentPage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "";
    if (selectedOption === "lastWeek") {
      url = `${API_URL}/users/last-week`;
    } else if (selectedOption === "lastMonth") {
      url = `${API_URL}/users/last-month`;
    } else if (selectedOption === "lastThreeMonths") {
      url = `${API_URL}/users/last-three-months`;
    } else if (selectedOption === "custom" && startDate && endDate) {
      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];
      url = `${API_URL}/users/filter?startDate=${startDateString}&endDate=${endDateString}`;
    }
    if (url) {
      fetchExpenses(url);
    } else {
      console.error("No valid selection made.");
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const openDeleteModal = (id) => {
    setExpenseToDelete(id);
    setIsModalOpen(true);
  };

  const deleteExpense = async () => {
    if (!expenseToDelete) return;

    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`${API_URL}/${expenseToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setItems((prevItems) =>
        prevItems.filter((item) => item.idExpense !== expenseToDelete)
      );
      toast.success("Gasto eliminado correctamente!");
    } catch (error) {
      toast.error("Error al eliminar el gasto");
      console.error("Error deleting expense:", error);
    } finally {
      setIsModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  const openEditModal = (expense) => {
    setEditExpense(expense);
  };

  const saveExpense = async (id, updatedExpense) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.put(`${API_URL}/${id}`, updatedExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.idExpense === id ? { ...item, ...updatedExpense } : item
        )
      );
      toast.success("Gasto actualizado correctamente!");
    } catch (error) {
      toast.error("Error al actualizar el gasto");
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="text-white w-[100%] bg-red-400 h-[100%] overflow-hidden flex-1 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-md w-[90%]  p-4 flex flex-row items-center justify-between gap-4 flex-nowrap"
      >
        <h2 className="font-bold text-gray-200 text-center">
          Selecciona una opción de fecha
        </h2>

        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
        >
          <option value="">Selecciona una opción</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastThreeMonths">Last Three Months</option>
          <option value="custom">Custom Filter</option>
        </select>

        {selectedOption === "custom" && (
          <div className="relative flex-grow min-w-[200px]">
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable
              placeholderText="Selecciona un rango de fechas"
              dateFormat="yyyy/MM/dd"
              className="w-full p-2 pl-8 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 whitespace-nowrap"
        >
          Enviar
        </button>
      </form>

      <div className="w-[100%] mx-auto bg-green-800 rounded-lg shadow-lg overflow-hidden h-[90%] flex flex-col">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ItemList
              items={items}
              onDelete={openDeleteModal}
              onEdit={openEditModal}
            />
            {items.length > 0 && (
              <Pagination
                currentPage={currentPage + 1}
                totalPages={totalPages}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            )}
            <EditExpenseModal
              isOpen={!!editExpense}
              onClose={() => setEditExpense(null)}
              expense={editExpense}
              onSave={saveExpense}
            />
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={deleteExpense}
              title="Confirmar eliminación"
              message="¿Estás seguro de que quieres eliminar este gasto?"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ListOfExpenses;
