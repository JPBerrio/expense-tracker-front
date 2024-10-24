import React from "react";

function Header() {
  return (
    <header className="bg-amber-400 p-4 flex justify-between items-center h-16 w-6/10">
      <h1 className="text-2xl font-bold">Welcome Back {"{Username}"}</h1>
    </header>
  );
}

export default Header;
