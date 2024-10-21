import React from "react";

function Header({handleLogout}) {
  return (
    <header className="bg-amber-400 p-4 flex justify-between items-center h-16 w-6/10">
      <h1 className="text-2xl font-bold">Welcome Back {"{Username}"}</h1>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
