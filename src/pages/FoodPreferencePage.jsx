import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from '../stores/index.stores.js';
import "../styles/FoodPreferencePage.css";
import logo from "../assets/logo.png";

const vegMenu = {
  tiffin: [
    { name: "Idlis with Sambar", price: 40 },
    { name: "Dosas", price: 50 },
    { name: "Parathas", price: 55 },
    { name: "Puri-Sabzi", price: 45 },
    { name: "Pongal", price: 50 },
    { name: "Poha", price: 35 },
    { name: "Dhokla", price: 40 },
    { name: "Handvo", price: 50 },
    { name: "Akki Roti", price: 55 },
    { name: "Vegetable Upma", price: 40 },
  ],
  lunch: [
    { name: "Vegetable Biryani", price: 90 },
    { name: "Dal Fry & Rice", price: 80 },
    { name: "Rajma Chawal", price: 85 },
    { name: "Sambar Rice", price: 75 },
    { name: "Vegetable Pulao", price: 85 },
    { name: "Chole Bhature", price: 80 },
    { name: "Chapati & Kurma", price: 90 },
    { name: "Cabbage Poriyal", price: 70 },
  ],
  snacks: [
    { name: "Samosa", price: 20 },
    { name: "Vada Pav", price: 25 },
    { name: "Vegetable Cutlet", price: 30 },
    { name: "Onion Pakora", price: 25 },
    { name: "Paneer Roll", price: 45 },
    { name: "Masala Corn", price: 30 },
    { name: "Bhel Puri", price: 35 },
    { name: "Veg Puff", price: 25 },
  ],
  dinner: [
    { name: "Roti with Mixed Veg", price: 80 },
    { name: "Vegetable Fried Rice", price: 85 },
    { name: "Khichdi", price: 70 },
    { name: "Pesarattu", price: 75 },
    { name: "Masala Dosa", price: 65 },
    { name: "Stuffed Paratha", price: 60 },
    { name: "Paneer Curry", price: 90 },
    { name: "Lemon Rice", price: 60 },
  ]
};

const nonVegMenu = {
  tiffin: [
    { name: "Egg Dosa", price: 60 },
    { name: "Bread Omelette", price: 45 },
    { name: "Egg Paniyaram", price: 55 },
    { name: "Chicken Sandwich", price: 65 },
  ],
  lunch: [
    { name: "Chicken Biryani", price: 120 },
    { name: "Fish Curry Rice", price: 130 },
    { name: "Egg Curry & Rice", price: 100 },
    { name: "Chicken Kurma", price: 115 },
  ],
  snacks: [
    { name: "Chicken Lollipop", price: 70 },
    { name: "Egg Puff", price: 30 },
    { name: "Chicken Roll", price: 60 },
    { name: "Spicy Chicken Popcorn", price: 65 },
  ],
  dinner: [
    { name: "Butter Chicken & Roti", price: 130 },
    { name: "Chicken Fried Rice", price: 110 },
    { name: "Egg Fried Rice", price: 95 },
    { name: "Fish Fry & Rice", price: 135 },
  ]
};

const specialMenu = {
  gym: [
    { name: "Nutri Protein Box", price: 150 },
    { name: "Boiled Eggs with Quinoa", price: 90 },
    { name: "Grilled Paneer Wrap", price: 100 }
  ],
  diabetic: [
    { name: "Low GI Veg Thali", price: 120 },
    { name: "Brown Rice with Dal", price: 100 },
    { name: "Steamed Veggies with Chapati", price: 90 }
  ],
  kids: [
    { name: "Mini Cheese Sandwich", price: 60 },
    { name: "Fruit Bowl", price: 50 },
    { name: "Mild Veg Pulao", price: 70 }
  ]
};

const FoodPreferencePage = () => {
  const { items: selectedItems, setItems } = useCustomerStore();
  const [preference, setPreference] = useState("veg");
  const [category, setCategory] = useState("tiffin");
  const [cart, setCart] = useState(selectedItems || []);
  const navigate = useNavigate();

  const handleAddToCart = (itemName, itemPrice) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === itemName);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { name: itemName, quantity: 1, price: itemPrice }];
    });
  };

  const handleRemoveFromCart = (itemName) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === itemName);
      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.name !== itemName);
      }

      return prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleProceed = () => {
    setItems(cart);
    navigate("/train");
  };

  const menu =
    preference === "veg" || preference === "nonveg"
      ? preference === "veg"
        ? vegMenu
        : nonVegMenu
      : specialMenu;

  const items = menu[category] || [];

  return (
    <div className="food-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Select Your Food</h2>

      <div className="selector">
        <button className={preference === "veg" ? "active" : ""} onClick={() => setPreference("veg")}>Veg</button>
        <button className={preference === "nonveg" ? "active" : ""} onClick={() => setPreference("nonveg")}>Non-Veg</button>
        <button className={preference === "gym" ? "active" : ""} onClick={() => { setPreference("gym"); setCategory("gym"); }}>Gym</button>
        <button className={preference === "diabetic" ? "active" : ""} onClick={() => { setPreference("diabetic"); setCategory("diabetic"); }}>Diabetic</button>
        <button className={preference === "kids" ? "active" : ""} onClick={() => { setPreference("kids"); setCategory("kids"); }}>Kids</button>
      </div>

      {(preference === "veg" || preference === "nonveg") && (
        <div className="selector">
          {["tiffin", "lunch", "snacks", "dinner"].map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="menu-items">
        {items.map((item) => (
          <div className="item-card" key={item.name}>
            <p>{item.name} <span className="price">₹{item.price}</span></p>
            <button onClick={() => handleAddToCart(item.name, item.price)}>Add +</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
            {cart.map(({ name, quantity, price }) => (
              <li key={name}>
                {name} x {quantity} <span className="price">₹{price * quantity}</span>
                <div className="cart-buttons">
                  <button onClick={() => handleAddToCart(name, price)}>+</button>
                  <button onClick={() => handleRemoveFromCart(name)} className="remove">−</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="confirm-box">
          <button className="proceed-btn" onClick={handleProceed}>
            Proceed to Train Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodPreferencePage;
