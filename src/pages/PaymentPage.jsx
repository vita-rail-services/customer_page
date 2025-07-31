import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/PaymentPage.css";
import logo from "../assets/logo.png"; // make sure logo path is correct
import { useCustomerStore, useAuthStore } from "../stores/index.stores.js";
import { axiosInstance } from "../utils/index.utils.js";
import { useState } from "react";

const Payment = () => {
  const navigate = useNavigate();

  const { zone, station, trainDetails, items } = useCustomerStore();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false)

  const calculateTotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject("Razorpay SDK failed to load");
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true)
    const loaded = await loadRazorpay();
    if (!loaded) return toast.error("Razorpay SDK failed to load.");

    try {
      const preparedItems = items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const res = await axiosInstance.post("/booking/process-order", {
        items: preparedItems,
      });

      const { id: order_id, amount } = res.data;
      // console.log("Payment successful:", {
      //     items: preparedItems,
      //     zone,
      //     station,
      //     trainDetails,
      //   })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "VITA RAILS",
        description: "Train Food Order Payment",
        order_id,
        handler: async (response) => {
          try {
            await axiosInstance.post("/booking/book-order", {
              items: preparedItems,
              zone,
              station,
              trainDetails,
            });
            toast.success("✅ Payment successful!");
            navigate("/confirm");
          } catch (err) {
            console.error("SMS/Booking error:", err);
            toast.error("Order confirmation failed.");
          }
        },
        // prefill: {
        //   name: user?.name || "Vita Customer",
        //   email: user?.email || "example@email.com",
        //   contact: user?.phone || "9999999999",
        // },
        notes: {
          address: "Vita Rails, India",
        },
        theme: {
          color: "#0066cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (err) => {
        console.error("❌ Payment failed:", err.error);
        toast.error("Payment failed: " + err.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process order.");
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="payment-page">
      <div className="logo-container">
        <img src={logo} alt="Vita Rails Logo" className="logo" />
        <div className="logo-text">Track Bites</div>
      </div>

      <div className="payment-card">
        <h3>Order Summary & Payment</h3>
        <p><strong>Zone:</strong> {zone}</p>
        <p><strong>Station:</strong> {station}</p>
        <p><strong>Train:</strong> {trainDetails?.trainName || "N/A"}</p>
        <p><strong>PNR:</strong> {trainDetails?.pnr || "N/A"}</p>
        <p><strong>Seat:</strong> {trainDetails?.seatNumber || "N/A"}</p>

        <p><strong>Items:</strong></p>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity} = ₹{item.quantity * item.price}
            </li>
          ))}
        </ul>

        <p className="price"><strong>Total:</strong> ₹{calculateTotal().toFixed(2)}</p>

        <div className="button-group">
          <button className="btn" onClick={() => navigate("/train")}>← Previous</button>
          <button disabled={isLoading} className="btn btn-primary" onClick={handlePayment}>Proceed to Pay →</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
