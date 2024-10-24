import React from "react";
import ButtonAside from "./ButtonAside";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import filter from "../assets/filter.svg";
import add from "../assets/add.svg";
import dashboard from "../assets/dashboard.svg"
import logout from "../assets/logout.svg"

function Sidebar({ onComponentChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("removiendo token " + localStorage.getItem("jwtToken"));
    localStorage.removeItem("jwtToken");
    console.log("token removido exitosamente");
    navigate("/", { replace: true });
  };

  return (
    <aside className="w-1/4 bg-emerald-500 flex flex-col justify-around items-center">
      <Header />
      <div className="bg-red-400 h-[30%] w-[100%] flex flex-col justify-around items-center">
        <ButtonAside
          text="List and filter your expenses"
          onClick={() => onComponentChange("list")}
          img={filter}
        />
        <ButtonAside
          text="Add a new expense"
          onClick={() => onComponentChange("add")}
          img={add}
        />
        <ButtonAside
          text="View Dashboard"
          onClick={() => onComponentChange("main")}
          img={dashboard}
        />
      </div>
      <ButtonAside text="Logout" onClick={handleLogout} className="h-[20%]" img={logout}/>
    </aside>
  );
}

export default Sidebar;
