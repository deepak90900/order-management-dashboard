"use client";

import { useEffect, useState } from "react";
import SearchAndFilter from "../../../components/SearchAndFilter"; // Adjust the path based on your folder structure

export default function PrintPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [searchText, setSearchText] = useState(""); // State for search text
  const [filterType, setFilterType] = useState("All"); // State for filter type

  useEffect(() => {
    // Fetch orders in the "Print" stage from the backend
    const fetchOrders = async () => {
      const response = await fetch("/api/orders?stage=Print");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleComplete = async (orderId) => {
    setLoadingOrderId(orderId); // Set the loading state for the specific order

    // Update the order's stage to "Delivery"
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stage: "Delivery" }),
    });

    if (response.ok) {
      // Remove the order from the current list since it's moved to the next stage
      setOrders(orders.filter((order) => order._id !== orderId));
    }

    setLoadingOrderId(null); // Reset the loading state
  };

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
        Print Stage Orders
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
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-4 rounded-lg shadow-sm"
          >
            <span className="text-base sm:text-lg font-medium mb-2 sm:mb-0">
              {order.name} - {order.type}
            </span>
            <button
              onClick={() => handleComplete(order._id)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors ${
                loadingOrderId === order._id
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              } text-white`}
              disabled={loadingOrderId === order._id}
            >
              {loadingOrderId === order._id ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Mark as Complete"
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
