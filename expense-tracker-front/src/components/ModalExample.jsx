import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';

export default function EditExpenseModal({ isOpen = true, onClose = () => {}, expense = null, onSave = () => {} }) {
  const [expenseName, setExpenseName] = useState('Ejemplo de Gasto');
  const [expenditureAmount, setExpenditureAmount] = useState('100');
  const [expenseDate, setExpenseDate] = useState('2023-05-20');
  const [expenseCategory, setExpenseCategory] = useState('Comida');

  useEffect(() => {
    if (expense) {
      setExpenseName(expense.expenseName);
      setExpenditureAmount(expense.expenditureAmount);
      setExpenseDate(expense.expenseDate);
      setExpenseCategory(expense.expenseCategoryEntity?.nameCategory || '');
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedExpense = {
      expenseName,
      expenditureAmount,
      expenseDate,
      expenseCategory,
    };
    await onSave(expense?.idExpense, updatedExpense);
    onClose();
    toast.success('Gasto actualizado correctamente');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800">Editar Gasto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="expenseName" className="block text-sm font-medium text-gray-700">
              Nombre del gasto
            </label>
            <input
              type="text"
              id="expenseName"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="expenditureAmount" className="block text-sm font-medium text-gray-700">
              Monto
            </label>
            <input
              type="number"
              id="expenditureAmount"
              value={expenditureAmount}
              onChange={(e) => setExpenditureAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              id="expenseDate"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="expenseCategory" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <input
              type="text"
              id="expenseCategory"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
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
}