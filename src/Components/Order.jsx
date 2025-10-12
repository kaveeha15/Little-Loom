import React, { useContext } from "react";
import { assets } from "../assets/assets";
import "../css/Order.css";
import { OrderContext } from "../Context/OrderContext";

const Order = () => {
  const {orders}=useContext(OrderContext)

  if(orders.length===0){
    return <h2>No Order placed yet</h2>
  }
  return (
    <div>
        <h1>MY ORDERS</h1>
        {orders.slice().reverse().map((order,index)=>(
          <div className="OrderBox" key={index}>
        <div>
          <img className="orderImg" src={assets.orderImg} alt="" />
        </div>
        <div className="OrderDetails">
          <div className="fristCol">
            {order.items.map((item) => (
                <p key={item._id}> 
                  {item.name} × {item.quantity}
                </p>
              ))} 
            <p>Rs.{order.totalAmount}</p>
          </div>

          <div className="secondCol">
            <p>{order.address}</p>
            <p>{order.phone}</p>
          </div>

          <div className="thirdCol">
            <p>Method:{order.paymentMethod}</p>
            <p>Date:{order.date}</p>
            <p>Status:</p>
          </div>
            

        </div>
      </div>
        ))}
      
    </div>
  );
};

export default Order;
