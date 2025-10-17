/*import '../css/orderPlacement.css'
import bank from'../assets/images/bank.png'
import cod from '../assets/images/cash-on-delivery.png'
import  visa from '../assets/images/visa.png'
import card from  '../assets/images/card.png'
import {useState } from "react";
import { db } from '../config/firebase'
import { collection, addDoc } from "firebase/firestore";

 
const OrderPlacement = () => {
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
  };

  const handleSubmit = async () => {
  const requiredFields = ["fName", "lName", "city", "pCode", "pNo", "email", "paymentMethod"];
  const newErrors = {};

  requiredFields.forEach(field => {
    if (!formData[field].trim()) {
      newErrors[field] = true;
    }
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return; // prevent submission
  }

  setErrors({}); // clear errors if all fields are valid

  try {
    await addDoc(collection(db, "orders"), formData);
    alert("Order placed successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
  return (
    <div className="orderContainer">
      <div className="orderForm">
        <div className="orderHeading"><h2>Order Details</h2></div>

        <div className="billingDetails">
          <h3>Billing details</h3>
          <div className="inline">
            <input type="text" name="fName" placeholder="First name*" onChange={handleChange} />
            <input type="text" name="lName" placeholder="Last name*" onChange={handleChange} />
          </div>
          <input type="text" name="houseNo" placeholder="House no & Street name" onChange={handleChange} />
          <input type="text" name="optional" placeholder="Apartment, suite, etc. (optional)" onChange={handleChange} />
          <div className="inline">
            <input type="text" name="city" placeholder="Town/City*" onChange={handleChange} />
            <input type="text" name="pCode" placeholder="Postcode/ZIP*" onChange={handleChange} />
          </div>

          <input type="text" name="pNo" placeholder="Phone*" onChange={handleChange} />
          <input type="text" name="email" placeholder="Email address*" onChange={handleChange} />
        </div>

        <div className="payMethod">
          <div className="label">
            <input type="radio" name="paymentMethod" value="Bank" onChange={handleChange} />
            <span>Direct Bank Transfer</span>
            <img src={bank} alt="Bank" />
          </div>
          <div className="label">
            <input type="radio" name="paymentMethod" value="COD" onChange={handleChange} />
            <span>Cash on Delivery</span>
            <img src={cod} alt="COD" />
          </div>
          <div className="label">
            <input type="radio" name="paymentMethod" value="Card" onChange={handleChange} />
            <span>VISA / Master Card</span>
            <img src={visa} alt="Visa" />
            <img src={card} alt="Card" />
          </div>
        </div>

        <div className="checkout" onClick={handleSubmit}>
          <p>Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
*/
import '../css/orderPlacement.css';
import bank from '../assets/images/bank.png';
import cod from '../assets/images/cash-on-delivery.png';
import visa from '../assets/images/visa.png';
import card from '../assets/images/card.png';
import { useState } from "react";
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

const OrderPlacement = () => {
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async () => {
    const requiredFields = ["fName", "lName", "city", "pCode", "pNo", "email", "paymentMethod"];
    const newErrors = {};

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await addDoc(collection(db, "orders"), formData);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="orderContainer">
      <div className="orderForm">
        <div className="orderHeading"><h2>Order Details</h2></div>

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
              {errors.fName && <span className="error-text">First name is required</span>}
            </div>
            <div>
              <input
                type="text"
                name="lName"
                placeholder="Last name*"
                onChange={handleChange}
                className={errors.lName ? "error" : ""}
              />
              {errors.lName && <span className="error-text">Last name is required</span>}
            </div>
          </div>

          <input type="text" name="houseNo" placeholder="House no & Street name" onChange={handleChange} />
          <input type="text" name="optional" placeholder="Apartment, suite, etc. (optional)" onChange={handleChange} />

          <div className="inline">
            <div>
              <input
                type="text"
                name="city"
                placeholder="Town/City*"
                onChange={handleChange}
                className={errors.city ? "error" : ""}
              />
              {errors.city && <span className="error-text">City is required</span>}
            </div>
            <div>
              <input
                type="text"
                name="pCode"
                placeholder="Postcode/ZIP*"
                onChange={handleChange}
                className={errors.pCode ? "error" : ""}
              />
              {errors.pCode && <span className="error-text">Postcode is required</span>}
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
            {errors.pNo && <span className="error-text">Phone number is required</span>}
          </div>

          <div>
            <input
              type="text"
              name="email"
              placeholder="Email address*"
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">Email is required</span>}
          </div>
        </div>

        <div className={`payMethod ${errors.paymentMethod ? "error" : ""}`}>
          <div className="label">
            <input type="radio" name="paymentMethod" value="Bank" onChange={handleChange} />
            <span>Direct Bank Transfer</span>
            <img src={bank} alt="Bank" />
          </div>
          <div className="label">
            <input type="radio" name="paymentMethod" value="COD" onChange={handleChange} />
            <span>Cash on Delivery</span>
            <img src={cod} alt="COD" />
          </div>
          <div className="label">
            <input type="radio" name="paymentMethod" value="Card" onChange={handleChange} />
            <span>VISA / Master Card</span>
            <img src={visa} alt="Visa" />
            <img src={card} alt="Card" />
          </div>
          {errors.paymentMethod && <span className="error-text">Please select a payment method</span>}
        </div>

        <div className="checkout" onClick={handleSubmit}>
          <p>Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;