import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

export default function Dashboard() {
  console.log("Rendering Dashboard");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Eliminar el token
    navigate("/"); // Navegar de vuelta al Login
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-black">
        <Header style={{height: '50%' }}/>
        <Main />
      </div>
    </div>
  );
}
