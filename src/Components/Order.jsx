import React, { useContext } from "react";
import { assets } from "../assets/assets";
import "../css/Order.css";
import { OrderContext } from "../Context/OrderContext";

const Order = () => {
  const { orders } = useContext(OrderContext);

  if (!orders || orders.length === 0) {
    return <h2>No Order placed yet</h2>;
  }

  return (
    <div>
      <h1>MY ORDERS</h1>

      {orders.slice().reverse().map((order, index) => {
        const form = order.billingDetails || {};

        // Convert Firestore timestamp to readable date
        const date = order.orderDate?.toDate
          ? order.orderDate.toDate().toLocaleString()
          : "";

        return (
          <div className="OrderBox" key={index}>

            <div>
              <img className="orderImg" src={assets.orderImg} alt="" />
            </div>

            <div className="OrderDetails">

              {/* Column 1 - Order Items */}
              <div className="fristCol">
                {order.items?.map((item, idx) => (
                  <p key={idx}>
                    {item.productName} × {item.quantity}
                  </p>
                ))}
                <p>Rs.{order.totalAmount}</p>
              </div>

              {/* Column 2 - Address & Phone */}
              <div className="secondCol">
                <p>
                  {form.fName} {form.lName}
                </p>
                <p>
                  {form.houseNo}, {form.optional}, {form.city} - {form.pCode}
                </p>
                <p>{form.pNo}</p>
              </div>

              {/* Column 3 - Payment & Date */}
              <div className="thirdCol">
                <p>Method: {form.paymentMethod}</p>
                <p>Date: {date}</p>
                <p>Status: Pending</p> {/* default status */}
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
};

export default Order;
