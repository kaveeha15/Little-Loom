import React from "react";
import { assets, product } from "../assets/assets";
import "../css/Highlight.css";
import { useNavigate } from "react-router-dom";

const Highlight = () => {
  const navigate = useNavigate();

  return (
    <div className="proMenu" >
      <h1 className="heading">Highlight Popular Products</h1>

      <div className="pro-details">
        {product.slice(0, 8).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/productDetails/${item._id}`);
              scrollTo(0, 0);
            }}
            className="pro-detailsBox"
            key={index}
          >
            <img className="boxClor" src={item.image} alt="" />
            <div className="tooltip wishlist-tooltip" onClick={(e) => e.stopPropagation()}>
              <img
                className="wishlist-img"
                src={assets.wishlist}
                alt="Add to Wishlist"
              />
              <span
                className="tooltip-text"
                onClick={() => {
                  navigate(`/wishlist/${item._id}`);
                  scrollTo(0, 0);
                }}
              >
                Add to Wishlist
              </span>
            </div>

            <div className="boxPadding">
              <p className="pro-name">{item.name}</p>
              <p className="pro-prize">Rs.{item.prize}</p>
              <div className="tooltip" onClick={(e) => e.stopPropagation()}>
                <img
                  className="addCart-img"
                  src={assets.addCart}
                  alt="Add to Cart"
                />
                <span className="tooltip-text"  onClick={() => {
                  navigate(`/cart/${item._id}`);
                  scrollTo(0, 0);
                }}>Add to Cart</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlight;
