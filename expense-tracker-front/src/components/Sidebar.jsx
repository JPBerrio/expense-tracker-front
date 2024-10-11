import React from "react";

function Sidebar() {
  return (
    <aside className="w-1/4 p-4 space-y-4 border-r-2 border-red-300 bg-emerald-500 flex flex-col justify-center">
      <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
        List and filter your expenses
      </button>
      <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
        Add a new expense
      </button>
      <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
        Remove existing expenses
      </button>
      <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
        Update existing expenses
      </button>
    </aside>
  );
}

export default Sidebar;
