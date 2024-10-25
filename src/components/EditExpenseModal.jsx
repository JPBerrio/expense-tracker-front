import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import cancelIcon from "../assets/cancel.svg"
import saveIcon from "../assets/save.svg"

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
        nameCategory:
          categories.find((cat) => cat.idCategory === selectedCategory)
            ?.nameCategory || "",
      },
    };

    try {
      await onSave(expense.idExpense, updatedExpense);
      onClose();
      toast.success("Gasto actualizado correctamente");
      console.log(expense.idExpense, updatedExpense);
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
      className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div
        className="relative bg-white dark:bg-gray-800 w-[40%]  mx-auto rounded-xl shadow-2xl p-8 space-y-6 transform transition-all duration-300 ease-in-out"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Edit Expense
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="expenseName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Name of expense
            </label>
            <input
              type="text"
              id="expenseName"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="pl-3 block w-full h-10 rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expenditureAmount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="expenditureAmount"
              value={expenditureAmount}
              onChange={(e) => setExpenditureAmount(e.target.value)}
              className="pl-3 block w-full h-10 rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expenseDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="expenseDate"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="pl-3 block w-full h-10 rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expenseCategory"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
            >
              Category
            </label>
            <select
              id="expenseCategory"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="pl-3 block w-full h-10 rounded-lg border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
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
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center w-[25%] px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <img src={cancelIcon} alt="cancel icon" className="h-6 w-6 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center w-[25%] px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:border-gray-600"
            >
              <img src={saveIcon} alt="save icon" className="h-6 w-6 mr-2" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
