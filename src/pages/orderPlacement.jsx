import "../css/orderPlacement.css";
import bank from "../assets/images/bank.png";
import cod from "../assets/images/cash-on-delivery.png";
import visa from "../assets/images/visa.png";
import card from "../assets/images/card.png";
import { createContext, useContext, useState } from "react";
import{CartContext} from '../Context/CartContext'
import { OrderContext } from "../Context/OrderContext";
import { useNavigate } from "react-router-dom";

const OrderPlacement = () => {
  const{cartItems}=useContext(CartContext)
  const {placeOrder}=useContext(OrderContext)
  const navigate=useNavigate()

  const[formData,setFormData]=useState({
    fName:"",
    lName:"",
    AddressHouseNo:"",
    AddressOptional:"",
    city:"",
    pCode:"",
    pNo:"",
    email:"",
    paymentMethod:"",

  })

  

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handlePlaceOrder=()=>{
    if(!formData.fName || !formData.pNo || !formData.paymentMethod){
      alert("Please Fill required fields and Select payment method")
      return
    }

     const total = cartItems.reduce(
      (acc, item) => acc + item.prize * item.quantity,
      0
    )


    const orderData={
      items:cartItems,
      totalAmount:total +100,
      address:`${formData.AddressHouseNo},${formData.AddressOptional},${formData.city}`,
      phone:formData.pNo,
      email:formData.email,
      paymentMethod:formData.paymentMethod,
      date: new Date().toLocaleDateString(),

    }
    placeOrder(orderData)
    navigate("/userProfile")
  }


  return (
    <div className="orderContainer">
      <div className="orderForm">
        <div className="orderHeading">
          <h2>Order Details</h2>
        </div>
        <div className="orderDetails"></div>
        <div className="billingDetails">
          <h3>Billing details</h3>
          <div className="inline">
            <input type="text" name="fName" placeholder="First name*"  onChange={handleChange}/>
            <input type="text" name="lName" placeholder="Last name*" onChange={handleChange} />
          </div>
          <input
            type="text"
            name="AddressHouseNo"
            placeholder="House no & Street name"
            id="tSize"
             onChange={handleChange}
          />
          <input
            type="text"
            name="AddressOptional"
            placeholder="Apartment,suite etc.(optional)"
            id="tSize"
             onChange={handleChange}
          />
          <div className="inline">
            <input type="text" name="city" placeholder="Town/City*" onChange={handleChange} />
            <input type="text" name="pCode" placeholder="Postcode/ZIP*"  onChange={handleChange}/>
          </div>
          <input type="text" name="pNo" placeholder="Phone*" onChange={handleChange} />
          <input
            type="text"
            name="email"
            placeholder="Email address*"
            id="tSize"
             onChange={handleChange}
          />
        </div>

        <div className="payMethod">
          <div className="label">
            <input type="radio" 
             name="paymentMethod"
            value="Bank Transfer"
             onChange={handleChange} />{" "}
            <span> Direct Bank Transfer </span> <img src={bank} alt="Bank" />
          </div>

          <div className="label">
            <input type="radio"  
            name="paymentMethod"
              value="Cash on Delivery" 
               onChange={handleChange}/>
            <span>Cash on Delivery</span>
            <img src={cod} alt="COD" />
          </div>
          <div className="label">
            <input type="radio"  
            name="paymentMethod"
              value="Card Payment" 
               onChange={handleChange}/>
            <span>VISA /Master Card</span>
            <img src={visa} alt="Visa" />
            <img src={card} alt="Card" />
          </div>
        </div>

        <div className="checkout" onClick={handlePlaceOrder}>
          <p>Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
