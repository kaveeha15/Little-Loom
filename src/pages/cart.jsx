import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { CartContext } from "../Context/CartContext";
import "../css/Cart.css";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, placeOrder, clearCart } =
    useContext(CartContext);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>No products in cart.</h2>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div>
      {cartItems
        .slice()
        .reverse()
        .map((item, index) => (
          <div className="product-Details" key={`${item._id}-${index}`}>
            <div className="prodetails-Img">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="pro-Details">
              <h2 className="pro-Text">Name: {item.name}</h2>
              <p className="pro-Text">Price: Rs.{item.price}</p>
              <p className="pro-Text">In Stock: {item.stock - item.quantity}</p>

              <div className="quantity-control">
                <img
                  className="Q-icon"
                  src={assets.removeicon}
                  alt="Remove one"
                  onClick={() =>
                    updateQuantity(
                      item._id,
                      Math.max(Number(item.quantity) - 1, 1)
                    )
                  }
                />
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="quantity"
                />
                <img
                  className="Q-icon"
                  src={assets.addicon}
                  alt="Add one"
                  onClick={() =>
                    updateQuantity(item._id, Number(item.quantity) + 1)
                  }
                />
              </div>

              <div className="tool-tip">
                <img
                  className="removeCart-icon"
                  src={assets.removeCart}
                  alt="Remove cart"
                  onClick={() => removeFromCart(item._id)}
                />
                <span
                  className="tool-tip-text"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove from Cart
                </span>
              </div>

              <p className="proText">
                Total Price: Rs.{Number(item.quantity) * Number(item.price)}
              </p>
            </div>
          </div>
        ))}

      <div className="pro-paid">
        <h2>To be paid</h2>
       <p className="pro-Text">
            Total Items: {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}
      </p>
        <p className="pro-Text">Delivery Charge: Rs.500</p>
        <p className="pro-Text">Total Amount: Rs.{totalPrice + 500}</p>
        <button
          className="buyBut"
          onClick={() => {
            navigate("/order"); 
            scrollTo(0, 0);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
