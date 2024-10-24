import React from "react";

function ButtonAside({ text, onClick, img }) {
  return (
    <button
      className="w-[90%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow text-center flex justify-items-start items-center"
      onClick={onClick}
    >
      {img && <img src={img} alt="Icon" className="mr-2 w-10 h-10"/>}
      {text}
    </button>
  );
}

export default ButtonAside;
