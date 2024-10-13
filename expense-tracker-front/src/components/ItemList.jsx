import React from "react";
import editar from "../assets/editar.png";
import eliminar from "../assets/eliminar.png";

function ItemList({ items=[] }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center h-[90%] bg-blue-400">
      {items.map((item) => (
        <div key={item.idExpense} className="h-[30%] w-[32%]">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
            <div className="px-6 py-2">
              <p className="text-gray-700 text-base mb-1">
                <span className="font-semibold">Nombre del gasto:</span>{" "}
                {item.expenseName || "No especificado"}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <span className="font-semibold">Monto:</span>{" "}
                {item.expenditureAmount !== undefined
                  ? `$${Number(item.expenditureAmount).toFixed(2)}`
                  : "No especificado"}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <span className="font-semibold">Fecha:</span>{" "}
                {item.expenseDate || "No especificada"}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <span className="font-semibold">Categoría:</span>{" "}
                {item.expenseCategoryEntity.nameCategory || "No especificada"}
              </p>
              <p className="text-gray-700 text-base flex justify-end gap-7 mb-1.5">
                <button className="font-semibold p-2 rounded">
                  <img src={editar} className="h-6 w-6" alt="Editar" />
                </button>
                <button className="font-semibold p-2 rounded">
                  <img src={eliminar} className="h-6 w-6" alt="Eliminar" />
                </button>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
