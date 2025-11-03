import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import "../css/Highlight.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";


const Highlight = () => {
  const navigate = useNavigate();

  const [isLogIn, setIsLogIn] = useState(false);

  const [productDetails, setProductDetails] = useState([]);
  const collRef = collection(db, "products");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const snap = await getDocs(collRef);
    const dataArray = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProductDetails(dataArray);
  };
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  }, []);

  return (
    <div className="proMenu">
      <h1 className="heading">Highlight Popular Products</h1>

      <div className="pro-details">
        {productDetails.slice(0, 8).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/productDetails/${item.id}`);
              scrollTo(0, 0);
            }}
            className="pro-detailsBox"
            key={item.id}
          >
            <img className="boxClor" src={item.image} alt="" />
            <div
              className="tooltip wishlist-tooltip"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="wishlist-img"
                src={assets.wishlist}
                alt="Add to Wishlist"
              />
              <span
                className="tooltip-text"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isLogIn) {
                    navigate(`/wishlist/${item.id}`);
                  } else {
                    toast.error("Please SignIn First!!")
                    navigate("/signIn");
                  }
                  scrollTo(0, 0);
                }}
              >
                Add to Wishlist
              </span>
            </div>

            <div className="boxPadding">
              <p className="pro-name">{item.Name}</p>
              <p className="pro-prize">Rs.{item.Price}</p>
              <div className="tooltip" onClick={(e) => e.stopPropagation()}>
                <img
                  className="addCart-img"
                  src={assets.addCart}
                  alt="Add to Cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item, 1);
                    navigate("/cart");
                  }}
                />

                <span
                  className="tooltip-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item, 1);
                    navigate("/cart");
                  }}
                >
                  Add to Cart
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlight;
