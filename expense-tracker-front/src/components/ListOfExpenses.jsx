import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./ItemList";
import Pagination from "./Pagination";

const API_URL =
  "https://9b8d-2800-484-9a77-1000-ada8-3039-63b0-643c.ngrok-free.app/api/expenses";

export default function ListOfExpenses() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log("Token:", token); // Verifica el token

        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        const response = await axios.get(
          `${API_URL}/${60}?page=${currentPage}&size=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("Fetched items:", response.data);
        console.log("Fetched items:", response.data.content);
        setItems(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response) {
          console.error("Error fetching data:", error.response.data);
          console.error("Status code:", error.response.status);
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
    };

    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-2 w-7/10 bg-red-400 overflow-hidden flex-1">
      <div className="max-w-6xl mx-auto bg-green-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-row flex-wrap justify-center">
        <ItemList items={items} />
        <Pagination
          currentPage={currentPage + 1} // Para que la página actual sea 1-indexed
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
}
