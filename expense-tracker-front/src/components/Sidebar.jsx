import React from "react";
import ButtonAside from "./ButtonAside";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


function Sidebar({ onComponentChange }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("removiendo token " + localStorage.getItem("jwtToken"))
    localStorage.removeItem("jwtToken"); // Eliminar el token
    console.log("token removido exitosamente")
    navigate("/", { replace: true }); // Navegar de vuelta al Login sin recargar la página
  };

  return (
    <aside className="w-1/4 p-4 space-y-4 bg-emerald-500 flex flex-col justify-center items-center">
      <Header handleLogout={handleLogout}/>
      <ButtonAside text="List and filter your expenses" onClick={()=>onComponentChange("list")}/>
      <ButtonAside text="Add a new expense" onClick={()=>onComponentChange("add")}/>
      <ButtonAside text="Remove existing expenses" onClick={()=>onComponentChange("remove")}/>
      <ButtonAside text="Update existing expenses" onClick={()=>onComponentChange("update")}/>
      <ButtonAside text="Dashboard" onClick={()=>onComponentChange("main")}/>
    </aside>
  );
}

export default Sidebar;
