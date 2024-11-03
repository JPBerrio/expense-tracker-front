import React from "react";

function Header() {

  const username = localStorage.getItem("username");

  return (
    <header className="p-4 flex flex-col justify-around items-center h-[40%] w-6/10 text-green-500">
      <h1 className="text-2xl font-bold italic">Expense Tracker</h1>
      <h2 className="text-2xl font-bold">Welcome Back {username || "Username"}</h2>
    </header>
  );
}

export default Header;
