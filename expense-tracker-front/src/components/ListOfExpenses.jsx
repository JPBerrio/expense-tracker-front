import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import Pagination from './Pagination';

const API_URL = 'https://api.example.com/items'; // Cambia esta URL a la de tu API

const apiData = [
  { id: 1, name: 'Item 1', category: 'Category A', price: 10, stock: 100 },
  { id: 2, name: 'Item 2', category: 'Category B', price: 20, stock: 50 },
  { id: 3, name: 'Item 3', category: 'Category A', price: 15, stock: 75 },
  { id: 4, name: 'Item 4', category: 'Category C', price: 30, stock: 25 },
  { id: 5, name: 'Item 5', category: 'Category B', price: 25, stock: 60 },
  { id: 6, name: 'Item 6', category: 'Category C', price: 35, stock: 40 },
  { id: 7, name: 'Item 7', category: 'Category A', price: 18, stock: 80 },
  { id: 8, name: 'Item 8', category: 'Category B', price: 22, stock: 55 },
  { id: 9, name: 'Item 9', category: 'Category C', price: 28, stock: 30 },
];

export default function Component() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        setItems(data.items); // Asume que la respuesta tiene un campo 'items'
        setTotalPages(Math.ceil(data.total / itemsPerPage)); // Asume que la respuesta tiene un campo 'total'
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-gray-900 text-white p-2  w-7/10 bg-red-400 overflow-hidden flex-1">
      <div className="max-w-6xl mx-auto bg-green-800 rounded-lg shadow-lg overflow-hidden h-[100%] flex flex-row flex-wrap justify-center">
          <ItemList items={apiData.slice(0, 9)} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
          />
      </div>
    </div>
  );
}
