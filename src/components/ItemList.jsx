import React from "react";
import editar from "../assets/editar.png";
import eliminar from "../assets/eliminar.png";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

function ItemList({ items = [], onDelete, onEdit }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center h-[90%]  w-[100%] shadow-md bg-gray-950">
      {items.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500 text-lg">No hay gastos para mostrar</p>
        </div>
      ) : (
        items.map((item) => (
          <div key={item.idExpense} className="h-[30%] w-[32%] relative ">
            <div className="bg-gray-600 shadow-lg rounded-lg overflow-hidden h-full hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:from-10% hover:via-sky-500 hover:via-30% hover:to-emerald-500 hover:to-90%">
              <div className="px-4 py-2">
                <p className="text-gray-50 text-base mb-1">
                  <span className="font-semibold">Nombre del gasto:</span>{" "}
                  {item.expenseName || "No especificado"}
                </p>
                <p className="text-gray-50 text-base mb-1">
                  <span className="font-semibold">Monto:</span>{" "}
                  {item.expenditureAmount !== undefined
                    ? `$${Number(item.expenditureAmount).toFixed(2)}`
                    : "No especificado"}
                </p>
                <p className="text-gray-50 text-base mb-1">
                  <span className="font-semibold">Fecha:</span>{" "}
                  {item.expenseDate || "No especificada"}
                </p>
                <p className="text-gray-50 text-base mb-1">
                  <span className="font-semibold">Categoría:</span>{" "}
                  {item.expenseCategoryEntity.nameCategory || "No especificada"}
                </p>
                <div className="text-gray-50 text-base flex justify-end gap-1  absolute bottom-2 right-2">
                  <button
                    className="font-semibold p-2 rounded hover:bg-gray-950"
                    onClick={() => onEdit(item)}
                  >
                    <img src={editIcon} className="h-7 w-7" alt="Editar" />
                  </button>
                  <button
                    className="font-semibold p-2 rounded hover:bg-gray-950"
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
