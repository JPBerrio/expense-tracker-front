import React from "react";

function Header() {
  return (
    <header className="bg-amber-400 p-4 flex flex-col justify-around items-center h-[40%] w-6/10">
      <h1 className="text-2xl font-bold italic">Expense Tracker</h1>
      <h2 className="text-2xl font-bold">Welcome Back don user username  {"{Username}"}</h2>
    </header>
  );
}

export default Header;
