import React from "react";

function Pagination({ currentPage, totalPages, prevPage, nextPage }) {
  return (
    <div className="flex justify-around items-center  bg-black w-[100%] h-[10%] align-self-center">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span className="text-gray-400">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
