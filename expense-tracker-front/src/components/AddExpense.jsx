import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const AddExpense = ({ onCreate, categories }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenditureAmount, setExpenditureAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const API_URL = "https://d4fb-2800-484-9a06-7100-84ba-20a5-d53d-4148.ngrok-free.app/api/expenses"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      expenseName,
      expenditureAmount: Number(expenditureAmount),
      expenseDate,
      expenseCategoryEntity: {
        idCategory: selectedCategory,
        nameCategory: categories.find(cat => cat.idCategory === selectedCategory)?.nameCategory || "",
      },
    };

    try {
      const token = localStorage.getItem("jwtToken"); // Obtener el token de autorización
      await axios.post(API_URL, newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Gasto creado correctamente");
      console.log("creado correctamente")
      // Reinicia los campos
      setExpenseName("");
      setExpenditureAmount("");
      setExpenseDate("");
      setSelectedCategory(null);
    } catch (error) {
      toast.error("Error al crear el gasto");
      console.error("Error creating expense:", error);
    }
  };

  return (
    <section className="border-2 border-rose-500 w-[100%] h-[100%] flex items-center justify-center bg-slate-950	">
      <div className="bg-white w-[50%] h-[75%] mx-auto rounded-lg shadow-lg p-6 space-y-6 border-black	">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Crear Gasto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="expenseName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del gasto
            </label>
            <input
              type="text"
              id="expenseName"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expenditureAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Monto
            </label>
            <input
              type="number"
              id="expenditureAmount"
              value={expenditureAmount}
              onChange={(e) => setExpenditureAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expenseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <input
              type="date"
              id="expenseDate"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expenseCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <select
              id="expenseCategory"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categories.map((category) => (
                <option key={category.idCategory} value={category.idCategory}>
                  {category.nameCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setExpenseName("");
                setExpenditureAmount("");
                setExpenseDate("");
                setSelectedCategory(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddExpense;
