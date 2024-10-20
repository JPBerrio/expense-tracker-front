import React from "react";
import editar from "../assets/editar.png";
import eliminar from "../assets/eliminar.png";

const API_URL =
  "https://d4fb-2800-484-9a06-7100-84ba-20a5-d53d-4148.ngrok-free.app/api/expenses";

function ItemList({ items=[], onDelete, onEdit }) {

  return (
    <div className="flex flex-wrap gap-4 justify-center h-[90%] bg-blue-400 w-[100%]">
      {items.map((item) => (
        <div key={item.idExpense} className="h-[30%] w-[32%] relative">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
            <div className="px-4 py-2">
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
              <div className="text-gray-700 text-base flex justify-end gap-1  absolute bottom-2 right-2">
                <button className="font-semibold p-2 rounded " onClick={()=> onEdit(item)}>
                  <img src={editar} className="h-6 w-6" alt="Editar" />
                </button>
                <button className="font-semibold p-2 rounded" onClick={() => onDelete(item.idExpense)}>
                  <img src={eliminar} className="h-6 w-6" alt="Eliminar"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
