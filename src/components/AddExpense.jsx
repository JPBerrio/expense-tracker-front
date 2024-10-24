import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { CurrencyDollarIcon, CalendarIcon, FolderIcon, XCircleIcon } from "@heroicons/react/24/outline";

const AddExpense = ({ onCreate, categories }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenditureAmount, setExpenditureAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const API_URL = "https://0698-200-122-222-162.ngrok-free.app/api/expenses"

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
    <section className="w-[100%] h-[100%] flex items-center justify-center bg-[#030400]">
      <div className="bg-[#F9FFEF] w-[60%] h-[90%] mx-auto rounded-lg shadow-lg overflow-hidden border border-[#A6FF7D]">
        <div className="bg-[#07F062] p-4">
          <h2 className="text-2xl font-bold text-center text-[#1E1E1E]">
            Crear Nuevo Gasto
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label htmlFor="expenseName" className="block text-sm font-medium text-[#1E1E1E] mb-2">
              Nombre del gasto
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                id="expenseName"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="block w-full pr-10 border-[#A6FF7D] focus:ring-[#07F062] focus:border-[#07F062] rounded-md bg-white text-[#1E1E1E] h-12 text-lg px-4"
                placeholder="Ej: Compra de comestibles"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FolderIcon className="h-6 w-6 text-[#A6FF7D]" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="expenditureAmount" className="block text-sm font-medium text-[#1E1E1E] mb-2">
              Monto
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#1E1E1E] text-lg">$</span>
              </div>
              <input
                type="number"
                id="expenditureAmount"
                value={expenditureAmount}
                onChange={(e) => setExpenditureAmount(e.target.value)}
                className="block w-full pl-10 pr-12 border-[#A6FF7D] focus:ring-[#07F062] focus:border-[#07F062] rounded-md bg-white text-[#1E1E1E] h-12 text-lg"
                placeholder="0.00"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 text-[#A6FF7D] mr-4" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="expenseDate" className="block text-sm font-medium text-[#1E1E1E] mb-2">
              Fecha
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="date"
                id="expenseDate"
                dateFormat="yyyy/MM/dd"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="block w-full pr-10 border-[#A6FF7D] focus:ring-[#07F062] focus:border-[#07F062] rounded-md bg-white text-[#1E1E1E] h-12 text-lg px-4"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-6 w-6 text-[#A6FF7D]" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="expenseCategory" className="block text-sm font-medium text-[#1E1E1E] mb-2">
              Categoría
            </label>
            <select
              id="expenseCategory"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="block w-full pl-4 pr-10 py-2 text-[#1E1E1E] border-[#A6FF7D] focus:outline-none focus:ring-[#07F062] focus:border-[#07F062] rounded-md h-12 text-lg"
              required
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.idCategory} value={category.idCategory}>
                  {category.nameCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => {
                setExpenseName("");
                setExpenditureAmount("");
                setExpenseDate("");
                setSelectedCategory(null);
              }}
              className="inline-flex items-center px-6 py-3 border border-[#A6FF7D] rounded-md shadow-sm text-base font-medium text-[#1E1E1E] bg-[#F9FFEF] hover:bg-[#FFF345] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#07F062] transition-colors duration-200"
            >
              <XCircleIcon className="h-6 w-6 mr-2 text-[#1E1E1E]" aria-hidden="true" />
              Limpiar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1E1E1E] bg-[#07F062] hover:bg-[#A6FF7D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFF345] transition-colors duration-200"
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
