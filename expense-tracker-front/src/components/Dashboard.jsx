import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  console.log("Rendering Dashboard");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Eliminar el token
    navigate("/"); // Navegar de vuelta al Login
  };
  
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <h1>Dashboard Here</h1>
      <p>Dashboard</p>
      <button onClick={handleLogout}>cerrar sesion</button>
    </div>
  );
}

