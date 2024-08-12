"use client";

import { useState } from "react";
import Modal from "../../components/modal"; // Import the Modal component

export default function DashboardHome() {
  const [name, setName] = useState("");
  const [type, setType] = useState("X");
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      name,
      type,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      setIsModalOpen(true); // Open the modal on successful order creation
    } else {
      alert("Failed to create order.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName(""); // Clear form inputs
    setType("X");
    setFile(null);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Home</h1>
      <p>
        Welcome to your order management dashboard. Please fill out the form
        below to create a new order.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="X">X</option>
            <option value="Y">Y</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file">File Upload </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Order
        </button>
      </form>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Order Created"
      >
        <p>Your order has been created successfully!</p>
      </Modal>
    </div>
  );
}
