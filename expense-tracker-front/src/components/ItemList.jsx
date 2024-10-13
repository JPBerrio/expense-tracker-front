import React from "react";
import editar from "../assets/editar.png"
import eliminar from "../assets/eliminar.png"

function ItemList({ items }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center h-[90%] bg-blue-400 justify-evenly">
      {items.map((item) => (
        <div key={item.id} className="h-[30%] w-[32%]">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
            <div className="px-6 py-2">
              <p className="text-gray-700 text-base mb-1">
                <span className="font-semibold">Nombre del gasto:</span>{" "}
                {item.name || "No especificado"}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <span className="font-semibold">Monto:</span>{" "}
                {item.price !== undefined
                  ? `$${Number(item.price).toFixed(2)}`
                  : "No especificado"}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <span className="font-semibold">Fecha:</span>{" "}
                {"No especificada"}
              </p>
              <p className="text-gray-700 text-base ">
                <span className="font-semibold">Categoria:</span>{" "}
                {item.name || "No especificado"}
              </p>
              <p className="text-gray-700 text-base flex justify-end gap-7 mb-1.5	">
                <button className="font-semibold  p-2 rounded">
                  <img src={editar} className="h-6 w-6"/>
                </button>
                <button className="font-semibold  p-2 rounded">
                  <img src={eliminar} className="h-6 w-6"/>
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
