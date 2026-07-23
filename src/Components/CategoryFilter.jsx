import React, { useEffect, useState } from 'react'
import {categoryData} from '../assets/assets'
import {Link} from 'react-router-dom'
import '../css/CategoryFilter.css'
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const CategoryFilter = () => {

  const[productDetails,setProductDetails]=useState([])

  
  const collRef=collection(db,"products")

  useEffect(()=>{
    getData()
  },[])

  const getData=async()=>{
    const snap=await getDocs(collRef)
    const dataArray=snap.docs.map((doc)=>({...doc.data(),id:doc.id}))
    setProductDetails(dataArray)
  }

  return (
    <div className='container1' id='category'>
        <div className='itm'>
            {categoryData.map((item,index)=>(
              
                <Link onClick={()=>scrollTo(0,0)} className='link' key={item.id} to={`/products/${item.category}`}>
                    <img className='images' src={item.image} alt="" />
                    <p>{item.category}</p>

                </Link>
            ))}


        </div>

    </div>
  )
}

export default CategoryFilter