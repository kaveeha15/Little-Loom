import React, { useEffect, useState } from 'react'
import { testimonialsData } from '../assets/assets'
import '../css/Testimonial.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../config/firebase'
import { collection,getDocs } from 'firebase/firestore'


const Testimonial = () => {

  const navigate=useNavigate()

  const [userReview,setUserReview]=useState([])
  const collRef=collection(db,"reviews")

  useEffect(()=>{
    reviewData()
  },[])

  const reviewData =async()=>{
    const snap = await getDocs(collRef)
    const dataArray=snap.docs.map((doc)=>({...doc.data(),id:doc.id}))
    setUserReview(dataArray)
  }

  return (
     <div className="review-container">
      <h2 className="review-heading">Testimonial</h2>
      <p className="review-subheading">what our customers are saying</p>
      <div className="review-cardsGrid">
        {userReview.map((testimonial, index) => (
          <div className="review-card" key={testimonial.id}>
                <img
                  src={testimonial.fileURL}     
                  alt={testimonial.name}
                  className="review-image"
                />
            <h3 className="review-name">{testimonial.name}</h3>
            <p className="review-text">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
      <button className="review-button"  onClick={()=>navigate("/review")}>Give Your Review</button>
    </div>
  )
}

export default Testimonial