import React from "react";
import ButtonAside from "./ButtonAside";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


function Sidebar({ onComponentChange }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("removiendo token " + localStorage.getItem("jwtToken"))
    localStorage.removeItem("jwtToken");
    console.log("token removido exitosamente")
    navigate("/", { replace: true });
  };

  return (
    <aside className="w-1/4 p-4 space-y-4 bg-emerald-500 flex flex-col justify-center items-center">
      <Header />
      <ButtonAside text="List and filter your expenses" onClick={()=>onComponentChange("list")}/>
      <ButtonAside text="Add a new expense" onClick={()=>onComponentChange("add")}/>
      <ButtonAside text="Filter your expenses" onClick={()=>onComponentChange("filter")}/>
      <ButtonAside text="Update existing expenses" onClick={()=>onComponentChange("update")}/>
      <ButtonAside text="Dashboard" onClick={()=>onComponentChange("main")}/>
      <ButtonAside text="Logout" onClick={handleLogout}/>
    </aside>
  );
}

export default Sidebar;
