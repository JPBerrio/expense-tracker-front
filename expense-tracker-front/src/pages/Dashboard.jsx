import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import ListOfExpenses from "../components/ListOfExpenses";
import UpdateExpense from "../components/UpdateExpense";
import AddExpense from "../components/AddExpense";
import RemoveExpense from "../components/RemoveExpense";


export default function Dashboard() {
  console.log("Rendering Dashboard");

  const [currentComponent, setCurrentComponent] = useState("main");

  const handleComponentChange = (component) => {
    setCurrentComponent(component);
  }

  const categories = [
    { idCategory: 1, nameCategory: "Groceries" },
    { idCategory: 2, nameCategory: "Leisure" },
    { idCategory: 3, nameCategory: "Electronics" },
    { idCategory: 4, nameCategory: "Utilities" },
    { idCategory: 5, nameCategory: "Clothing" },
    { idCategory: 6, nameCategory: "Health" },
    { idCategory: 7, nameCategory: "Others" },
  ];

  const renderComponent = () => {
    switch (currentComponent) {
      case "main":
        return <Main />;
      case "add":
        return <AddExpense categories={categories}/>;
      case "update":
        return <UpdateExpense />;
      case "remove":
        return <RemoveExpense />;
      case "list":
        return <ListOfExpenses />;
      default:
        return <Main />;
    }
  }

  return (
    <div className="w-full h-screen flex">
      <Sidebar onComponentChange={handleComponentChange}/>
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        
        {renderComponent()}
      </div>
    </div>
  );
}
