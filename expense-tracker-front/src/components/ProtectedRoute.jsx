import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwtToken"); // Obtener el token del almacenamiento local
  console.log("Token en ProtectedRoute:", token); 

  if (!token) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
