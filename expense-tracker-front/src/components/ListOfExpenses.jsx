import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../app.css";
import EditExpenseModal from "./EditExpenseModal";

const API_URL =
  "https://d4fb-2800-484-9a06-7100-84ba-20a5-d53d-4148.ngrok-free.app/api/expenses";

export default function ListOfExpenses() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editExpense, setEditExpense] = useState(null);
  const itemsPerPage = 9;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Token:", token);

      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      const response = await axios.get(
        `${API_URL}?page=${page}&size=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          responseType: "json",
        }
      );

      console.log("Fetched items:", response.data);
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
      toast.success("Datos cargados exitosamente");
    } catch (error) {
      if (error.response) {
        console.error("Error fetching data:", error.response.data);
        console.error("Status code:", error.response.status);
      } else {
        console.error("Error fetching data:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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

  const deleteExpense = (id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que quieres eliminar este gasto?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              const token = localStorage.getItem("jwtToken");
              await axios.delete(`${API_URL}/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });

              setItems((prevItems) =>
                prevItems.filter((item) => item.idExpense !== id)
              );
              toast.success("Gasto eliminado correctamente!");
            } catch (error) {
              toast.error("Error al eliminar el gasto");
              console.error("Error deleting expense:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const openEditModal = (expense) => {
    console.log("Expense to edit:", expense);
    setEditExpense(expense);
  };

  const closeEditModal = () => {
    console.log("Closing edit modal");
    setEditExpense(null);
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
    <div className="bg-gray-900 text-white p-2 w-7/10 bg-red-400 overflow-hidden flex-1">
      <div className="max-w-6xl mx-auto bg-green-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-row flex-wrap justify-center">
        {loading ? (
          <Loader />
        ) : (
          <>
            <ItemList
              items={items}
              onDelete={deleteExpense}
              onEdit={openEditModal}
            />
            <Pagination
              currentPage={currentPage + 1}
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
            />
            <EditExpenseModal
              isOpen={!!editExpense}
              onClose={closeEditModal}
              expense={editExpense}
              onSave={saveExpense}
            />
          </>
        )}
      </div>
    </div>
  );
}
