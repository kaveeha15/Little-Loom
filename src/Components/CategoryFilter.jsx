import React from 'react'
import {categoryData} from '../assets/assets'
import {Link} from 'react-router-dom'
import '../css/CategoryFilter.css'

const CategoryFilter = () => {
  return (
    <div className='container1' id='category'>
        <div className='item'>
            {categoryData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} className='link' key={index} to={`/products/${item.category}`}>
                    <img className='images' src={item.image} alt="" />
                    <p>{item.category}</p>

                </Link>
            ))}


        </div>

    </div>
  )
}

export default CategoryFilter