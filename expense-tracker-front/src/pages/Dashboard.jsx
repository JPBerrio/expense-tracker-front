import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export default function Dashboard() {
  console.log("Rendering Dashboard");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Eliminar el token
    navigate("/"); // Navegar de vuelta al Login
  };

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-black h-full overflow-hidden">
        <Header/>
        <Main />
      </div>
    </div>
  );
}
