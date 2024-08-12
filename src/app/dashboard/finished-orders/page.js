"use client";

import { useEffect, useState } from "react";
import SearchAndFilter from "../../../components/SearchAndFilter"; // Adjust the path based on your folder structure

export default function FinishedOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text
  const [filterType, setFilterType] = useState("All"); // State for filter type

  useEffect(() => {
    // Fetch orders in the "Finished" stage from the backend
    const fetchOrders = async () => {
      const response = await fetch("/api/orders?stage=Finished");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // Filter and search logic
  const filteredOrders = orders.filter((order) => {
    return (
      (filterType === "All" || order.type === filterType) &&
      (order.name.toLowerCase().includes(searchText.toLowerCase()) ||
        order.type.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">
        Finished Orders
      </h1>

      <SearchAndFilter
        searchText={searchText}
        setSearchText={setSearchText}
        filterType={filterType}
        setFilterType={setFilterType}
        filterOptions={["All", "X", "Y"]} // Example filter options, adjust as needed
      />

      {filteredOrders.length === 0 && (
        <div className="text-center text-gray-500">
          No orders match your criteria.
        </div>
      )}

      <ul className="space-y-4">
        {filteredOrders.map((order) => (
          <li
            key={order._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
          >
            <span className="text-base sm:text-lg font-medium">
              {order.name} - {order.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
