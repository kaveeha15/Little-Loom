import React, { useEffect, useState, useContext } from "react";
import { assets, product } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Wishlist.css";
import { CartContext } from "../context/CartContext";

const Wishlist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (id) {
      const productToAdd = product.find((item) => item._id === id);
      if (
        productToAdd &&
        !wishlist.some((item) => item._id === productToAdd._id)
      ) {
        const updatedWishlist = [...wishlist, productToAdd];
        setWishlist(updatedWishlist);
      }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleDelete = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    setWishlist(updatedWishlist);
  };

  return (
    <div>
      <img
        src={assets.backIcon}
        alt=""
        className="backicon"
        onClick={() => navigate(-1)}
      />
      <div className="wishlist">
        <h1 className="topic">Wishlist</h1>

        {wishlist.length > 0 ? (
          wishlist.slice().reverse().map((selectedProduct) => (
            <div key={selectedProduct._id} className="wishlistbox">
              <img
                className="cancelicon"
                src={assets.cancelicon}
                alt=""
                onClick={() => handleDelete(selectedProduct._id)}
              />

              <img src={selectedProduct.image} alt="" className="wishlistimg" />

              <div className="wishlist-details">
                <p className="wishlist-name">{selectedProduct.name}</p>

                <div className="wishlist-info">
                  <p className="wishlist-prise">Rs.{selectedProduct.prize}</p>
                  <p className="wishlist-stock">
                    {selectedProduct.stock} in stock
                  </p>
                </div>
              </div>

              <div className="tooltip" onClick={(e) => e.stopPropagation()}>
                <img
                  className="addCart-img"
                  src={assets.addCart}
                  alt="Add to Cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(selectedProduct, 1); 
                    handleDelete(selectedProduct._id);
                    navigate("/cart");
                  }}
                />

                <span
                  className="tooltip-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(selectedProduct, 1);
                    handleDelete(selectedProduct._id); 
                    navigate("/cart");
                  }}
                >
                  Add to Cart
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No product found in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
