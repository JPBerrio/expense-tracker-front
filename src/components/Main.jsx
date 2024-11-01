import React from "react";
import ExpenseCard from "./ExpenseCard";
import ExpenseGraphic from "./ExpenseGraphic";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import StackedBarChart from "./StackedBarChart";

function Main() {
  return (
    <main className=" w-7/10 bg-white overflow-hidden flex-1 bg-teal-800">
      <div className="flex justify-evenly items-center  h-1/2">
        <ExpenseCard
          title="Últimos gastos"
          className="flex justify-center items-center h-full"
        >
          <PieChart />
        </ExpenseCard>
        <ExpenseCard>
          <LineChart />
        </ExpenseCard>
        <ExpenseCard title="Categorías">
          <StackedBarChart />
        </ExpenseCard>
      </div>
      <div className="flex justify-evenly items-center mb-6 h-1/2 ">
        <ExpenseGraphic label="Expenses by Category" />
        <ExpenseGraphic label="Expenses by Date" />
      </div>
    </main>
  );
}

export default Main;
