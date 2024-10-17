// EditExpenseModal.js
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const EditExpenseModal = ({ isOpen, onClose, expense, onSave }) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenditureAmount, setExpenditureAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  useEffect(() => {
    if (expense) {
      setExpenseName(expense.expenseName);
      setExpenditureAmount(expense.expenditureAmount);
      setExpenseDate(expense.expenseDate);
      setExpenseCategory(expense.expenseCategoryEntity.nameCategory);
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
    await onSave(expense.idExpense, updatedExpense);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Gasto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Nombre del gasto"
            required
          />
          <input
            type="number"
            value={expenditureAmount}
            onChange={(e) => setExpenditureAmount(e.target.value)}
            placeholder="Monto"
            required
          />
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
          />
          <input
            type="text"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            placeholder="Categoría"
            required
          />
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
