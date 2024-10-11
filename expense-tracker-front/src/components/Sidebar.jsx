import React from "react";
import ButtonAside from "./ButtonAside";

function Sidebar({ onComponentChange }) {
  return (
    <aside className="w-1/4 p-4 space-y-4 bg-emerald-500 flex flex-col justify-center items-center">
      <ButtonAside text="List and filter your expenses" onClick={()=>onComponentChange("list")}/>
      <ButtonAside text="Add a new expense" onClick={()=>onComponentChange("add")}/>
      <ButtonAside text="Remove existing expenses" onClick={()=>onComponentChange("remove")}/>
      <ButtonAside text="Update existing expenses" onClick={()=>onComponentChange("update")}/>
      <ButtonAside text="Dashboard" onClick={()=>onComponentChange("main")}/>
    </aside>
  );
}

export default Sidebar;
