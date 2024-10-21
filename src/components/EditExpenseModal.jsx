import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

const EditExpenseModal = ({ isOpen, onClose, expense, onSave, categories }) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenditureAmount, setExpenditureAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    if (expense) {
      setExpenseName(expense.expenseName);
      setExpenditureAmount(expense.expenditureAmount);
      setExpenseDate(expense.expenseDate);
      if (expense.expenseCategoryEntity) {
        setSelectedCategory(expense.expenseCategoryEntity.idCategory);
      }
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedExpense = {
      idExpense: expense.idExpense, // Asegúrate de incluir el idExpense
      expenseName,
      expenditureAmount: Number(expenditureAmount),
      expenseDate,
      expenseCategoryEntity: {
        idCategory: selectedCategory, // Solo un ID de categoría
        nameCategory: categories.find(cat => cat.idCategory === selectedCategory)?.nameCategory || "",
      },
    };

    try {
      await onSave(expense.idExpense, updatedExpense);
      onClose();
      toast.success("Gasto actualizado correctamente");
      console.log(expense.idExpense, updatedExpense)
    } catch (error) {
      toast.error("Error al actualizar el gasto");
      console.error("Error updating expense:", error);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center border-orange-700"
      onClick={handleOutsideClick}
    >
      <div
        className="relative bg-white w-[35%] h-[75%] mx-auto rounded-lg shadow-lg p-6 space-y-6 border-2 border-rose-500"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Editar Gasto
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
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
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
    </div>
  );
};

export default EditExpenseModal;
