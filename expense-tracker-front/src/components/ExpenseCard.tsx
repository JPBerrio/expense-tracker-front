import React from 'react'

function ExpenseCard({ title }) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-300 aspect-square flex items-center justify-center w-[30%] h-[70%]">
      <h2 className="font-bold text-center">{title}</h2>
    </div>
  )
}

export default ExpenseCard
