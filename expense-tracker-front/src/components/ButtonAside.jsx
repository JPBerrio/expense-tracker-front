import React from "react";

function ButtonAside({ text }) {
  return (
    <button className="w-11/12 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center">
      {text}
    </button>
  );
}

export default ButtonAside;
