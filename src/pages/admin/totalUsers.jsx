import { useState } from "react";
import user1 from '../../assets/images/user1.jpg'
import user2 from '../../assets/images/user2.jpg'
import'../../css/admin/totalUsers.css'
const TotalUsers = () => {
    const [totalUsers,setTotalUsers]=useState([
        {
            image:user1,
            name:"Chamika Dilhani ",
            email:"chamikadilhani@gmail.com",
            address:"Deegala,Maramba,Akuressa",
            telNo:"0778428666",
            noOfOrders:1
        },
         {
            image:user2,
            name:"Kavisha Nimanshi ",
            email:"kavishanimanshi@gmail.com",
            address:"Malimbada,Palatuwa,Mathara",
            telNo:"0778414225",
            noOfOrders:4
        }

    ])
    return ( 
<>
<div className="userContainer">
    {
        totalUsers.map((user,index)=>(
        <div className="user" key={index}>
            <div className="uImg"><img src={user.image}/></div>
            <div className="userData">
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.address}</div>
                <div>{user.telNo}</div>
                <div>{user.noOfOrders}</div>
            </div>  
        </div>


        ))
       
    }
</div>
</>
       
     );
}
 
export default TotalUsers;

