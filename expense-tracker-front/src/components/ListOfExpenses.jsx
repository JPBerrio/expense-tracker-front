import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import Loader from "./Loader";

const API_URL =
  "https://83e1-2800-484-9a77-1000-8c44-9e9-b3c6-172d.ngrok-free.app/api/expenses";

export default function ListOfExpenses() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Token:", token);

      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      const response = await axios.get(
        `${API_URL}?page=${page}&size=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          responseType: 'json',
        }
      );

      console.log("Fetched items:", response.data);
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (error.response) {
        console.error("Error fetching data:", error.response.data);
        console.error("Status code:", error.response.status);
      } else {
        console.error("Error fetching data:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
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
        {loading ? (
          <Loader />
        ) : (
          <>
            <ItemList items={items} />
            <Pagination
              currentPage={currentPage + 1}
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
