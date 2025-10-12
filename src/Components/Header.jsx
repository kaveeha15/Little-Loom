import React from 'react'
import { assets } from '../assets/assets'
import '../css/Header.css'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate=useNavigate()

  return (
    <div className='container'>
        {/*-------left side---------- */}
        <div className='left-side'>
            <p className='section'> LITTLE LOOM </p>
            <p className='section2'>Weaving wonder  for little ones.. </p>
            <div className='element'>
                <button className='shopnowBut' onClick={()=>navigate("/products")}>SHOP NOW</button>
            </div>
           

        </div>

         {/*-------right side---------- */}
         <div className='right-side'>
            <img className='picture' src={assets.header} alt=""  />

         </div>
    </div>
  )
}

export default Header