import React from "react";

function ExpenseCard({ title, children }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow border border-gray-300 aspect-square flex flex-col items-center justify-center w-[30%] h-[70%]">
      <h2>{title}</h2> {/* Asegúrate de mostrar el título */}
      <section className="w-full h-full flex items-center justify-center">
        {children}
      </section>
    </div>
  );
}

export default ExpenseCard;
