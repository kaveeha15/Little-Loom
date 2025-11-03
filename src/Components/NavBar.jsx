import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/NavBar.css";
import { useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; 


const NavBar = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [profileImage, setProfileImage] = useState(assets.uploadArea);


    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setProfileImage(data.profileImage || assets.uploadArea);
        }
      } else {
        setIsLoggedIn(false);
        setProfileImage(assets.uploadArea);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    setIsLoggedIn(true);
    navigate("/signIn");
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleProfileImage=()=>{
    navigate("/userProfile")
  }

  return (
    <div className="navbar">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        alt="logo"
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
            textDecoration: "none",
            color: isActive ? "#C2185B" : "#333",
          })}
        >
          <li className="navli">CART</li>
          <hr className="navhr" />
        </NavLink>
      </ul>

      <div className="right-actions">
        {!isLoggedIn ? (
          <button onClick={handleSignIn} className="loginButton">
            SIGN IN
          </button>
        ) : (
          <button onClick={handleSignOut} className="loginButton">
            SIGN OUT
          </button>
        )}

        <img
          src={assets.wishlistLogo}
          onClick={() => navigate("/wishlist")}
          alt="wishlist"
          className="wishlistlogo"
        />

        {isLoggedIn && (
       <img
    src={profileImage}
    alt="profile"
    className="uploadProfileArea"
    onClick={handleProfileImage}
  />
          )}

        
      </div>
    </div>
  );
};

export default NavBar;
