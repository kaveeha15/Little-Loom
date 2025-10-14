import '../css/orderPlacement.css'
import bank from'../assets/images/bank.png'
import cod from '../assets/images/cash-on-delivery.png'
import  visa from '../assets/images/visa.png'
import card from  '../assets/images/card.png'
import {useState } from "react";
import { db } from '../config/firebase'
import { collection, addDoc } from "firebase/firestore";



const OrderPlacement = () => {
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
