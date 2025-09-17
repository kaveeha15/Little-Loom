import React from "react";
import { assets } from "../assets/assets";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        alt=""
        className="logo"
      />
      <ul className="navul">
        <NavLink
          to="/"
          className="navlink"
          style={({ isActive }) => ({
            textDecoration: "none", 
            color: isActive ? "#C2185B" : "#333",
          })}
        >
          <li className="navli">HOME</li>
          <hr className="navhr" />
        </NavLink>

        <NavLink
          to="/products"
          className="navlink"
          style={({ isActive }) => ({
            textDecoration: "none", 
            color: isActive ? "#C2185B" : "#333",
          })}
        >
          <li className="navli">ALL PRODUCTS</li>
          <hr className="navhr" />
        </NavLink>

        <NavLink
          to="/cart"
          className="navlink"
          style={({ isActive }) => ({
            textDecoration: "none", // remove underline
            color: isActive ? "#C2185B" : "#333",
          })}
        >
          <li className="navli">CART</li>
          <hr className="navhr" />
        </NavLink>
      </ul>

      <div className="right-actions">
        <button onClick={() => navigate("/singIn")} className="loginButton">
          SIGN IN
        </button>

        <img
          src={assets.wishlistLogo}
          onClick={() => navigate("/wishlist")}
          alt=""
          className="wishlistlogo"
        />
      </div>
    </div>
  );
};

export default NavBar;
