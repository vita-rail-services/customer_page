import React, { useEffect, useState } from "react";
import "../styles/OrderConfirmationPage.css";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useCustomerStore, useAuthStore } from "../stores/index.stores.js";


const OrderConfirmationPage = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const username = user?.name || " "
  const { trainDetails } = useCustomerStore();
  const { trainName, pnr, seatNumber } = trainDetails
  const totalAmount = 199

  const [confirmationId, setConfirmationId] = useState("");

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        const data = {
          username,
          trainName,
          pnr,
          seatNumber,
          totalAmount,
        };

        // const response = await submitOrderConfirmation(data);
        setConfirmationId(response.confirmationId || `VTR-${Math.floor(Math.random() * 100000)}`);
      } catch (error) {
        console.error("Order confirmation failed:", error);
        setConfirmationId(`VTR-${Math.floor(Math.random() * 100000)}`);
      }
    };

    confirmOrder();
  }, [username, trainName, pnr, seatNumber, totalAmount]);

  return (
    <motion.div
      className="confirmation-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
    >
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="confirmation-card">
        <h2>Order Confirmed!</h2>
        <p><strong>Name:</strong> {username}</p>
        <p><strong>Train:</strong> {trainName}</p>
        <p><strong>PNR:</strong> {pnr}</p>
        <p><strong>Seat:</strong> {seatNumber}</p>
        <p><strong>Total Paid:</strong> ₹{totalAmount}</p>
        <p>Thank you for booking with <b>Vita Rails</b>!</p>
        <p className="small-text">Confirmation ID: {confirmationId}</p>
      </div>
    </motion.div>
  );
};

export default OrderConfirmationPage;
