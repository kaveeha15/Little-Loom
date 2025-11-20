import search from '../../assets/images/search.png';
import orders from '../../assets/images/order.jpg';
import '../../css/admin/totalOrders.css';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const TotalOrders = () => {
  const { fetchDbData, isLoading, error, data } = useFetch();

  useEffect(() => {
    fetchDbData('orders');
  }, []);

  return (
    <>
      <div className="orderContainer">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          data.map((order, index) => (
            <div className="itemTot" key={order.id}>
              <div>
                <img src={orders} alt="Order" />
              </div>

              {/* Order ID and Billing Info */}
              <div className="oItem">
                <div>Order ID: {index + 1}</div>
                <div>{order.billingDetails?.fName}</div>
                <div>{order.billingDetails?.email}</div>
                <div>{order.billingDetails?.houseNo}</div>
                <div>{order.billingDetails?.city}</div>
             
              </div>

              {/* Items Ordered */}
              <div className="oItem">
                {order.items?.map((item, i) => (
                  <div key={i} className="itemDetails">
                    <div>{item.productName}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Total: Rs. {item.total}</div>
   {order.orderDate && (
  <div>
    {typeof order.orderDate === 'string'
      ? order.orderDate
      : order.orderDate.toDate().toLocaleString()}
  </div>
)}

                  </div>
                ))}
              </div>

              {/* Payment and Status */}
              <div className="oItem">
                <div>Payment: {order.billingDetails?.paymentMethod}</div>
                <div>
                  <select defaultValue="process">
                    <option value="process">Process</option>
                    <option value="ship">Ship</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancel">Cancel</option>
                    <option value="return">Return</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TotalOrders;