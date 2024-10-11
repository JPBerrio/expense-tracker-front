import React from "react";

function Main() {
  return (
    <main className="w-2/3 p-4 w-7/10 h-full">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-square flex items-center justify-center">
          <h2 className="font-bold text-center">Últimos gastos</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-square flex items-center justify-center">
          <h2 className="font-bold text-center">Ya no se que poner</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-square flex items-center justify-center">
          <h2 className="font-bold text-center">Categorías</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-[2/1] flex items-center justify-center">
          <h2 className="font-bold text-center">Gráfico últimos tres meses</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-[2/1] flex items-center justify-center">
          <h2 className="font-bold text-center">Categorías con más gastos</h2>
        </div>
      </div>
    </main>
  );
}

export default Main;
