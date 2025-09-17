import React from 'react'
import { assets } from '../assets/assets'
import '../css/Header.css'

const Header = () => {
  return (
    <div className='container'>
        {/*-------left side---------- */}
        <div className='left-side'>
            <p className='section'> LITTLE LOOM </p>
            <p className='section2'>Weaving wonder  for little ones.. </p>
            <div className='element'>
                <button className='shopnowBut'>SHOP NOW</button>
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