import React from 'react'

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-300">
        {/* Header */}
        <header className="bg-gray-200 p-4 flex justify-between items-center border-b-2 border-gray-300">
          <h1 className="text-2xl font-bold">Welcome Back {'{Username}'}</h1>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Logout
          </button>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-1/3 bg-gray-100 p-4 space-y-4 border-r-2 border-gray-300">
            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
              List and filter your expenses
            </button>
            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
              Add a new expense
            </button>
            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
              Remove existing expenses
            </button>
            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-left">
              Update existing expenses
            </button>
          </aside>

          {/* Main Content */}
          <main className="w-2/3 p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-square flex items-center justify-center">
                <h2 className="font-bold text-center">Últimos gastos</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-square flex items-center justify-center">
                <h2 className="font-bold text-center">Ya no se que poner</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-square flex items-center justify-center">
                <h2 className="font-bold text-center">Categorías</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-[2/1] flex items-center justify-center">
                <h2 className="font-bold text-center">Gráfico últimos tres meses</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-300 aspect-[2/1] flex items-center justify-center">
                <h2 className="font-bold text-center">Categorías con más gastos</h2>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}