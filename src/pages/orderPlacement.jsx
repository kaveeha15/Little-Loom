import "../css/orderPlacement.css";
import bank from "../assets/images/bank.png";
import cod from "../assets/images/cash-on-delivery.png";
import visa from "../assets/images/visa.png";
import card from "../assets/images/card.png";
import { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const OrderPlacement = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { cartItems, placeOrder, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    houseNo: "",
    optional: "",
    city: "",
    pCode: "",
    pNo: "",
    email: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const totalAmount =
    cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    ) + 100;

  const handleSubmit = async () => {
    const requiredFields = [
      "fName",
      "lName",
      "city",
      "pCode",
      "pNo",
      "email",
      "paymentMethod",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    setLoading(true);
    const success = await placeOrder(
      cartItems,
      totalAmount,
      formData,
      clearCart
    );

    setLoading(false);

    if (success) {
      toast.success("Order placed successfully!");
      navigate("/userProfile");
    }
  };




  return (
    <div className="orderCon">
      <div className="orderForm">
        <div className="orderHeading">
          <h2>Order Details</h2>
        </div>

        <div className="billingDetails">
          <h3>Billing details</h3>

          <div className="inline">
            <div>
              <input
                type="text"
                name="fName"
                placeholder="First name*"
                onChange={handleChange}
                className={errors.fName ? "error" : ""}
              />
              {errors.fName && (
                <span className="error-text">First name is required</span>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lName"
                placeholder="Last name*"
                onChange={handleChange}
                className={errors.lName ? "error" : ""}
              />
              {errors.lName && (
                <span className="error-text">Last name is required</span>
              )}
            </div>
          </div>

          <input
            type="text"
            name="houseNo"
            placeholder="House no & Street name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="optional"
            placeholder="Apartment, suite, etc. (optional)"
            onChange={handleChange}
          />

          <div className="inline">
            <div>
              <input
                type="text"
                name="city"
                placeholder="Town/City*"
                onChange={handleChange}
                className={errors.city ? "error" : ""}
              />
              {errors.city && (
                <span className="error-text">City is required</span>
              )}
            </div>
            <div>
              <input
                type="text"
                name="pCode"
                placeholder="Postcode/ZIP*"
                onChange={handleChange}
                className={errors.pCode ? "error" : ""}
              />
              {errors.pCode && (
                <span className="error-text">Postcode is required</span>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              name="pNo"
              placeholder="Phone*"
              onChange={handleChange}
              className={errors.pNo ? "error" : ""}
            />
            {errors.pNo && (
              <span className="error-text">Phone number is required</span>
            )}
          </div>

          <div>
            <input
              type="text"
              name="email"
              placeholder="Email address*"
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-text">Email is required</span>
            )}
          </div>
        </div>

        <div className={`payMethod ${errors.paymentMethod ? "error" : ""}`}>
          <div className="label">
            <input
              type="radio"
              name="paymentMethod"
              value="Bank"
              onChange={handleChange}
            />
            <span>Direct Bank Transfer</span>
            <img src={bank} alt="Bank" />
          </div>
          <div className="label">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              onChange={handleChange}
            />
            <span>Cash on Delivery</span>
            <img src={cod} alt="COD" />
          </div>
          <div className="label">
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              onChange={handleChange}
            />
            <span>VISA / Master Card</span>
            <img src={visa} alt="Visa" />
            <img src={card} alt="Card" />
          </div>
          {errors.paymentMethod && (
            <span className="error-text">Please select a payment method</span>
          )}
        </div>

        <div className="checkout" onClick={!loading ? handleSubmit : null}>
          <p>{loading ? "Processing..." : "Checkout"}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
