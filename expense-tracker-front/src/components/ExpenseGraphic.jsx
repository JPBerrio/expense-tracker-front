import React from "react";

function ExpenseGraphic({ tittleGraphic}) {
  return (
    <div className="bg-white  rounded-lg shadow border border-gray-300 w-[47%] flex items-center justify-center h-3/4">
      <h2 className="font-bold text-center">{tittleGraphic}</h2>
    </div>
  );
}

export default ExpenseGraphic;
