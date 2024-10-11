import React from "react";
import ButtonAside from "./ButtonAside";

function Sidebar() {
  return (
    <aside className="w-1/4 p-4 space-y-4 bg-emerald-500 flex flex-col justify-center items-center">
      <ButtonAside text="List and filter your expenses" />
      <ButtonAside text="Add a new expense" />
      <ButtonAside text="Remove existing expenses" />
      <ButtonAside text="Update existing expenses" />
    </aside>
  );
}

export default Sidebar;
