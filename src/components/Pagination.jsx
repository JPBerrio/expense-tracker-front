import React from "react";

function Pagination({ currentPage, totalPages, prevPage, nextPage, loading }) {
  return (
    <div className="flex justify-center gap-8 items-center w-[100%] h-[10%] align-self-center bg-gray-950">
      <button
        onClick={prevPage}
        disabled={currentPage === 1 || loading}
        className="border border-gray-400 text-white hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span className="text-gray-400">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages || loading}
        className="border border-gray-400 text-white hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
