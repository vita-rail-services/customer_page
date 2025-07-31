import { useState } from 'react';
import "../styles/MenuListPage.css";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function MenuListPage() {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);

  const menu = [
    {
      name: "Idli Sambar",
      price: 40,
      image: "https://cdn-icons-png.flaticon.com/512/5768/5768344.png",
    },
    {
      name: "Dosa",
      price: 50,
      image: "https://cdn-icons-png.flaticon.com/512/5768/5768346.png",
    },
    {
      name: "Poori Masala",
      price: 45,
      image: "https://cdn-icons-png.flaticon.com/512/5768/5768383.png",
    },
    {
      name: "Veg Biryani",
      price: 90,
      image: "https://cdn-icons-png.flaticon.com/512/5787/5787775.png",
    },
    {
      name: "Chicken Biryani",
      price: 130,
      image: "https://cdn-icons-png.flaticon.com/512/5787/5787772.png",
    },
    {
      name: "Paneer Butter Masala",
      price: 110,
      image: "https://cdn-icons-png.flaticon.com/512/5787/5787783.png",
    },
    {
      name: "Veg Sandwich",
      price: 35,
      image: "https://cdn-icons-png.flaticon.com/512/8480/8480512.png",
    },
    {
      name: "Tea",
      price: 15,
      image: "https://cdn-icons-png.flaticon.com/512/685/685352.png",
    },
    {
      name: "Coffee",
      price: 20,
      image: "https://cdn-icons-png.flaticon.com/512/4490/4490439.png",
    },
  ];

  const handleAddItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleContinue = () => {
    // Send selected items to the next page
    navigate('/train-details');
  };

  return (
    <div className="menu-container">
      <Header />
      <h2 className="menu-title">Select Your Food Items</h2>
      <div className="menu-grid">
        {menu.map((item, index) => (
          <div key={index} className="menu-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => handleAddItem(item)}>Add</button>
          </div>
        ))}
      </div>
      <div className="continue-footer">
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}

export default MenuListPage;
