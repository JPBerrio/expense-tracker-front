import React from "react";
import ExpenseCard from "./ExpenseCard"
import ExpenseGraphic from "./ExpenseGraphic";

function Main() {
  return (
    <main className=" w-7/10 bg-white overflow-hidden flex-1 bg-teal-800">
      <div className="flex justify-evenly items-center bg-lime-400 h-1/2">
        <ExpenseCard title="Últimos gastos" />
        <ExpenseCard title="Ya no se que poner" />
        <ExpenseCard title="Categorías" />
      </div>
      <div className="flex justify-evenly items-center mb-6 h-1/2 bg-orange-500">
        <ExpenseGraphic label="Expenses by Category" />
        <ExpenseGraphic label="Expenses by Date" />
      </div>
    </main>
  );
}

export default Main;
