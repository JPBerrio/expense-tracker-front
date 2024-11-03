import React from "react";

function ButtonAside({ text, onClick, img }) {
  return (
    <button
      className="w-[85%]  text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow text-center flex justify-items-start items-center text-gray-50 hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:from-10% hover:via-sky-500 hover:via-30% hover:to-emerald-500 hover:to-90%"
      onClick={onClick}
    >
      {img && <img src={img} alt="Icon" className="mr-2 w-8 h-8"/>}
      {text}
    </button>
  );
}

export default ButtonAside;
