import React from "react";
import editar from "../assets/editar.png";
import eliminar from "../assets/eliminar.png";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

function ItemList({ items = [], onDelete, onEdit }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center h-[90%] bg-blue-400 w-[100%]">
      {items.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500 text-lg">No hay gastos para mostrar</p>
        </div>
      ) : (
        items.map((item) => (
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
                  <button
                    className="font-semibold p-2 rounded "
                    onClick={() => onEdit(item)}
                  >
                    <img src={editIcon} className="h-7 w-7" alt="Editar" />
                  </button>
                  <button
                    className="font-semibold p-2 rounded"
                    onClick={() => onDelete(item.idExpense)}
                  >
                    <img src={deleteIcon} className="h-7 w-7" alt="Eliminar" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemList;
