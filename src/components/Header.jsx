import React from "react";
import "./Header.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Vita Rails Logo" className="logo" />
    </div>
  );
}

export default Header;
