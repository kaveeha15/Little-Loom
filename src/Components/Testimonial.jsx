import React from 'react'
import { testimonialsData } from '../assets/assets'
import '../css/Testimonial.css'
import { useNavigate } from 'react-router-dom'


const Testimonial = () => {

  const navigate=useNavigate()

  return (
     <div className="review-container">
      <h2 className="review-heading">Testimonial</h2>
      <p className="review-subheading">what our customers are saying</p>
      <div className="review-cardsGrid">
        {testimonialsData.map((testimonial, index) => (
          <div className="review-card" key={index}>
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="review-image"
            />
            <h3 className="review-name">{testimonial.name}</h3>
            <p className="review-text">{testimonial.review}</p>
          </div>
        ))}
      </div>
      <button className="review-button"  onClick={()=>navigate("/review")}>Give Your Review</button>
    </div>
  )
}

export default Testimonial