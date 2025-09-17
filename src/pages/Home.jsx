import React from 'react'
import Header from '../Components/Header'
import CategoryFilter from '../Components/CategoryFilter'
import Highlight from '../Components/Highlight'
import Testimonial from '../Components/Testimonial'

const Home = () => {
  return (
    <div>
      <Header/>
      <CategoryFilter/>
      <Highlight/>
      <Testimonial/>
    </div>
  )
}

export default Home