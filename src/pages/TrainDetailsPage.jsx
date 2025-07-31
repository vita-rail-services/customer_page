import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../styles/TrainDetailsPage.css";
import logo from "../assets/logo.png"; // Replace this with your logo path
import { useCustomerStore } from '../stores/index.stores.js';
import toast from "react-hot-toast";

function TrainDetailsPage() {
  const { trainDetails, setTrainDetails } = useCustomerStore();
  const [trainName, setTrainName] = useState(trainDetails?.trainName || "");
  const [pnr, setPnr] = useState(trainDetails?.pnr || "");
  const [seatNumber, setSeatNumber] = useState(trainDetails?.seatNumber || "");
  const [trainNumber, setTrainNumber] = useState(trainDetails?.trainNumber || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const seatRegex = /^[A-Za-z]{1,2}\d{0,1}-\d{1,2}$/;
    if (!seatRegex.test(seatNumber)) {
      toast.error("❌ Invalid Seat format. Use A1-34 format.");
      return;
    }

    const trainData = {
      trainName,
      pnr,
      coach: seatNumber.split("-")[0],
      seatNumber: seatNumber.split("-")[1],
      trainNumber,
    };

    setTrainDetails(trainData);
    navigate("/payment");
  };

  return (
    <div className="train-page-container">
      <div className="form-card">
        <img src={logo} alt="Logo" className="form-logo" />
        <h2 className="form-heading">Enter Train Details</h2>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Train Name:
            <input
              type="text"
              value={trainName}
              placeholder="e.g. Chennai Express"
              onChange={(e) => setTrainName(e.target.value)}
              required
            />
          </label>

          <label>
            PNR Number:
            <input
              type="text"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              pattern="\d{10}"
              maxLength={10}
              required
              title="PNR must be exactly 10 digits"
              placeholder="e.g. 1234567890"
            />
          </label>

          <label>
            Seat Number (e.g., A1-34):
            <input
              type="text"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value.toUpperCase())}
              required
              placeholder="e.g. A1-34"
              title="Format: A1-34 (Coach-Seat)"
            />
          </label>

          <label>
            Train Number:
            <input
              type="number"
              value={trainNumber}
              placeholder="e.g. 330644"
              onChange={(e) => setTrainNumber(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrainDetailsPage;
