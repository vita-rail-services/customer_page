import { useNavigate } from 'react-router-dom';
import "../styles/ZoneSelectionPage.css";
import Header from '../components/Header';
import { useCustomerStore } from '../stores/index.stores.js';

import chennai from '../assets/chennai.jpg';
import mumbaiCentral from '../assets/mumbai-central.jpg';
import mumbaiWestern from '../assets/mumbai-western.jpg';
import bangalore from '../assets/bangalore.jpg';
import hyderabad from '../assets/hyderabad.jpg';
import delhi from '../assets/delhi.jpg';
import eastKolkata from '../assets/east-kolkata.jpg';
import southKolkata from '../assets/south-kolkata.jpg';
import { useEffect } from 'react';

const zones = [
  { name: "Chennai Division Zone", image: chennai },
  { name: "Mumbai Central Zone", image: mumbaiCentral },
  { name: "Mumbai Western Zone", image: mumbaiWestern },
  { name: "KSR Bengaluru Zone", image: bangalore },
  { name: "Hyderabad Zone", image: hyderabad },
  { name: "Delhi Zone", image: delhi },
  { name: "Eastern (Kolkata) Zone", image: eastKolkata }, 
  { name: "South/North-East Kolkata Zone", image: southKolkata },
];

function ZoneSelectionPage() {
  const navigate = useNavigate();
  const { zone: zoneName, setZone } = useCustomerStore();

  const handleZoneClick = (zoneName) => {
    setZone(zoneName);
    navigate(`/stations`);
  };

  return (
    <div className="zone-container">
      <Header />
      <h2 className="zone-title">Select Your Railway Zone</h2>
      <div className="zone-grid">
        {zones.map((zone, idx) => (
          <div key={idx} className={`zone-card ${zone.name === zoneName ? "selected-zone" : ""}`} onClick={() => handleZoneClick(zone.name)}>
            <img src={zone.image} alt={zone.name} />
            <div className="zone-name">{zone.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZoneSelectionPage;
