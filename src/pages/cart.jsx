import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, product } from "../assets/assets";
import "../css/Cart.css";

const Cart = () => {
  const { id } = useParams();
  const navigate=useNavigate()

  const selectProduct = product.find((item) => item._id === id);

  return (
    <div>
      <div className="product-Details">
        <div className="prodetails-Img">
          <img src={selectProduct.image} alt="" />
        </div>
        <div className="pro-Details">
          <h2 className="pro-Text">Name: {selectProduct.name} </h2>
          <p className="pro-Text">Prize: Rs.{selectProduct.prize} </p>
          <p className="pro-Text">In Stock: {selectProduct.stock} </p>
          <div className="quantity-control">
            <img className="Q-icon" src={assets.removeicon} alt="Remove one" />
            <input type="text" value="1" readOnly className="quantity"/>
            <img className="Q-icon" src={assets.addicon} alt="Add one" />
          </div>

          <div className="tool-tip">
           <img className="removeCart-icon" src={assets.removeCart} alt="" />
          <span className="tool-tip-text">Remove from Cart</span>
           </div>

          <p className="proText">Total prize: </p>
        </div>
      </div>

      <div className="pro-paid">
        <h2>To be paid</h2>
        <p className="pro-Text">Total Item: </p>
        <p className="pro-Text">Delivery Charge : </p>
        <p className="pro-Text">Total Amount : Rs.</p>
        <button className="buyBut"  onClick={() => {
                          navigate(`/order`);
                          scrollTo(0, 0);
                        }}>Buy Now</button>
      </div>
    </div>
  );
};

export default Cart;
