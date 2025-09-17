import '../css/orderPlacement.css'
import bank from'../assets/images/bank.png'
import cod from '../assets/images/cash-on-delivery.png'
import  visa from '../assets/images/visa.png'
 import card from  '../assets/images/card.png'
const OrderPlacement = () => {

    return ( 
    <div className="orderContainer">
        <div className="orderForm">
                    <div className="orderHeading"><h2>Order Details</h2></div>
                <div className="orderDetails"></div>
                <div className="billingDetails">
                    <h3>Billing details</h3>
                    <div className="inline"><input type="text" name="fName" placeholder="First name*" /><input type="text" name="lName" placeholder="Last name*" /></div> 
                    <input type="text" name="houseNo" placeholder="House no & Street name" id='tSize' />
                    <input type="text" name="optional" placeholder="Apartment,suite etc.(optional)"  id='tSize' />
                    <div className="inline"><input type="text" name="city" placeholder="Town/City*" /><input type="text" name="pCode" placeholder="Postcode/ZIP*" /></div>
                    <input type="text" name="pNo" placeholder="Phone*" />
                    <input type="text" name="email" placeholder="Email address*" id='tSize'  />
                </div>
                
                <div className="payMethod">
                    <div className="label"><input type="radio" name="bank"  /> <span> Direct Bank Transfer </span> <img src={bank} alt="Bank"/></div>
                    <div className="label"><input type="radio" name="cod" /><span>Cash on Delivery</span><img src={cod} alt="COD"/></div> 
                    <div className="label"><input type="radio" name="card"  /><span>VISA /Master Card</span><img src={visa}  alt="Visa"/><img src={card} alt="Card"/></div>
                </div>
                
                <div className="checkout">
                    <p>Checkout</p>
                </div>
         </div>
       
     </div>
     );
}
 
export default OrderPlacement;