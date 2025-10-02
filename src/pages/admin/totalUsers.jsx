import { useState } from "react";
import user1 from '../../assets/images/user1.jpg'
import user2 from '../../assets/images/user2.jpg'
import'../../css/admin/totalUsers.css'
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
const TotalUsers = () => {
   const{fetchDbData,isLoading,error,data}=useFetch()
   useEffect(()=>{
    fetchDbData('totalUsers')
   },[])
    return ( 
<>
<div className="userContainer">
    {
        isLoading?<h2>Loading...</h2>:data.map((user,index)=>(
        <div className="user" key={index}>
            <div className="uImg">{user.image}</div>
            <div className="userData">
                <div>{user.Name}</div>
                <div>{user.email}</div>
                <div>{user.Address}</div>
                <div>{user.phoneNumber}</div>
                <div>{user.noOfitems}</div>
            </div>  
        </div>


        ))
       
    }
</div>
</>
       
     );
}
 
export default TotalUsers;

