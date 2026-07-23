import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import "../css/Highlight.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { WishlistContext } from "../Context/WishlistContext";
import { auth } from "../config/firebase";

const Highlight = () => {
  const navigate = useNavigate();

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
  const { addToWishlist } = useContext(WishlistContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const requireLogin = () => {
    if (!user) {
      toast.error("Please log in first!");
      navigate("/signIn");
      return false;
    }
    return true;
  };

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
            <img
              className="boxClor"
              src={item.Image ? item.Image : assets.defaultImage}
            />
            <div
              className="tooltip wishlist-tooltip"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="wishlist-img"
                src={assets.wishlist}
                alt="Add to Wishlist"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!requireLogin()) return;
                  await addToWishlist(item);
                  navigate("/wishlist");
                }}
              />
              <span
                className="tooltip-text"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!requireLogin()) return;
                  await addToWishlist(item);
                  navigate("/wishlist");
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
                    if (!requireLogin()) return;
                    addToCart(item, 1);
                    navigate("/cart");
                  }}
                />

                <span
                  className="tooltip-text"
                  onClick={(e) => {
                    e.stopPropagation();
                     if (!requireLogin()) return;
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
