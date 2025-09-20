import React from 'react'
import {assets,product} from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/ProductDetails.css'


const ProductDetails = () => {

  const navigate=useNavigate()

  const {id}=useParams()

  const selectProduct=product.find((item)=>item._id===id)

  const relatedProduct=product.filter((item)=>item.category===selectProduct.category && item._id !== id)



  return (
    <div>
    <div className='productDetails'>
      <div className='prodetailsImg'>
        <img src={selectProduct.image}alt="" />
      </div>
      <div className='proDetails'>
        <h2 className='proText'>Name: {selectProduct.name} </h2>
        <p className='proText'>Prize: Rs.{selectProduct.prize} </p>
        <p className='proText'>In Stock: {selectProduct.stock} </p>
        <p className='proText'>Description:</p><p className='des'> {selectProduct.des} </p>

        <button className='cartBut' onClick={() => {
                          navigate(`/cart/${selectProduct._id}`);
                          scrollTo(0, 0)
                        }} >Add to Cart</button>
      </div>

    </div>
     <div className='relatedproduct'>
        <p>RELATED PRODUCTS</p>

         <div className="pro-details">
                {relatedProduct.map((item) => (
                  <div
                    onClick={() => {
                      navigate(`/productDetails/${item._id}`);
                      scrollTo(0, 0);
                    }}
                    className="pro-detailsBox"
                    key={item.id}
                  >
                    <img className="boxClor" src={item.image} alt="" />
                    <div className="tooltip wishlist-tooltip" onClick={(e) => e.stopPropagation()}>
                      <img
                        className="wishlist-img"
                        src={assets.wishlist}
                        alt="Add to Wishlist"
                      />
                      <span
                        className="tooltip-text"
                        onClick={() => {
                          navigate(`/wishlist/${item._id}`);
                          scrollTo(0, 0);
                        }}
                      >
                        Add to Wishlist
                      </span>
                    </div>
        
                    <div className="boxPadding">
                      <p className="pro-name">{item.name}</p>
                      <p className="pro-prize">Rs.{item.prize}</p>
                      <div className="tooltip" onClick={(e) => e.stopPropagation()}>
                        <img
                          className="addCart-img"
                          src={assets.addCart}
                          alt="Add to Cart"
                        />
                        <span className="tooltip-text"  onClick={() => {
                          navigate(`/cart/${item._id}`);
                          scrollTo(0, 0);
                        }}>Add to Cart</span>
                      </div>
                    </div>
                  </div>
                  
                ))}
              </div>

        
      </div>

    </div>
  )
}

export default ProductDetails