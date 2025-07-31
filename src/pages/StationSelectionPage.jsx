import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StationSelectionPage.css";
import { useCustomerStore } from '../stores/index.stores.js';
import Header from "../components/Header";

const stationsByZone = {
  "Chennai Division Zone": [
    "MGR Chennai Central",
    "Egmore",
    "Perambur",
    "Tambaram",
    "Chengalpet Junction",
    "Arakkonam Junction",
    "Sullurpet",
    "Coimbatore Junction",
    "Madurai Junction",
    "Dindigul Junction"
  ],
  "KSR Bengaluru Zone": [
    "KSR Bengaluru Junction",
    "SMVT Bengaluru",
    "Bengaluru Cantt",
    "Yesvantpur Junction",
    "Mysuru Junction"
  ],
  "Mumbai Central Zone": [
    "Mumbai CSMT",
    "Mumbai LTT",
    "Mumbai Dadar Central",
    "Thane",
    "Kalyan Junction",
    "Pune Junction",
    "Nagpur Junction"
  ],
  "Mumbai Western Zone": [
    "Mumbai Central",
    "Dadar Western",
    "Bandra Terminus",
    "Andheri",
    "Borivali",
    "Vasai",
    "Ahmedabad Junction",
    "Vadodara Junction",
    "Surat",
    "Rajkot"
  ],
  "Hyderabad Zone": [
    "Hyderabad",
    "Hyderabad Deccan",
    "Secunderabad Junction",
    "Kakinada"
  ],
  "Delhi Zone": [
    "New Delhi Junction",
    "Old Delhi Junction",
    "Delhi Shahdara",
    "Rohtak",
    "Hazrat Nizamuddin",
    "Anand Vihar Terminus"
  ],
  "Eastern (Kolkata) Zone": [
    "Howrah Junction",
    "Santragachi Junction",
    "Sealdah",
    "Kolkata"
  ],
  "South/North-East Kolkata Zone": [
    "Kolkata",
    "Shalimar"
  ]
};

function StationSelectionPage() {
  const navigate = useNavigate();
  const { zone: selectedZone, station: selectedStation, setStation } = useCustomerStore();

  const stations = stationsByZone[selectedZone] || [];

  const handleStationClick = (station) => {
    setStation(station);
    navigate(`/food-preference`);
  };

  return (
    <div className="station-page">
      <Header />
      <div className="station-content">
        <h2 className="zone-title">
          {selectedZone ? `Stations in ${selectedZone}` : "Please select a zone"}
        </h2>
        <div className="station-grid">
          {stations.length > 0 ? (
            stations.map((station, idx) => (
              <div
                key={idx}
                className={`station-card ${station === selectedStation ? "station-card-active" : ""}`}
                onClick={() => handleStationClick(station)}
              >
                <p>{station}</p>
              </div>
            ))
          ) : (
            <p className="no-station">No stations found for this zone.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StationSelectionPage;
