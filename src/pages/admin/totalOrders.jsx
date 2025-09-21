import search from '../../assets/images/search.png'
import orders from '../../assets/images/order.jpg'
import '../../css/admin/allProducts.css';
import '../../css/admin/totalOrders.css'
import { useState } from "react";
const TotalOrders = () => {
    const[totalOrders,setTotalOrders]=useState([
        {
        
            id:1,
            pName:"Floral Embroidered Baby Romper Set,Soft toy Elephant",
            items:5,
            price:"Rs.9600",
            address:"Deegala,Maramba,Akuressa",
            telNo:"0778428666",
            method:"COD",
            date: "10/10/2025",
            status:"processing"

        },
         {
            id:2,
            pName:"Floral Embroidered Baby Romper Set,Soft toy Elephant",
            items:5,
            price:"Rs.9600",
            address:"Deegala,Maramba,Akuressa",
            telNo:"0778428666",
            method:"COD",
            date: "10/10/2025",
            status:"processing"

        },

    ])

    return ( 
      <>
    
      <div className="middle">
          <div className="searchBar"><input placeholder="Search"/><img src={search}></img></div>
      </div>
      <div className="orderContainer">
        {
            totalOrders.map(order=>(
                <div className="itemTot" key={order.id}>
                       
                        <div><img src={orders}/></div>
                        <div className="oItem1">
                        <div>{order.id}</div>
                        <div>{order.pName}</div>
                        <div>{order.items}</div>
                        </div>
                        <div className="oItem2">
                        <div >{order.price}</div>
                        <div >{order.address}</div>
                        <div>{order.telNo}</div>
                        </div>
                        <div className="oItem3">
                        <div>{order.method}</div>
                        <div>{order.date}</div>
                        <div>{order.status}</div>
                        </div>
                </div>
            ))
        }
      </div>
      
      </>
     );
}
 
export default TotalOrders;