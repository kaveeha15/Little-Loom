import React, { useState } from "react";
import { assets, product} from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Wishlist.css'

const Wishlist = () => {
  const navigate=useNavigate()
 

  const {id}=useParams()

  const [selectedProduct, setSelectProduct] = useState(
    product.find((item) => item._id === id)
  );

  
  const handleDelete=()=>{
    setSelectProduct(null)
  }


  return (
    <div>
       <img src={assets.backIcon} alt="" className="backicon" onClick={() => navigate(-1)}  />
    <div className="wishlist">
     
      <h1 className="topic">Wishlist</h1>

       {selectedProduct ? (

      <div className="wishlistbox">
        <img className="cancelicon" src={assets.cancelicon} alt="" onClick={handleDelete} />

        <img  src={selectedProduct.image} alt=""  className="wishlistimg"/>

        <div className="wishlist-details">
          
        <p className="wishlist-name">{selectedProduct.name}</p>

          <div className="wishlist-info ">
         <p className="wishlist-prise">Rs.{selectedProduct.prize} </p>
        <p className="wishlist-stock">{selectedProduct.stock} in stock</p>
          </div>

        </div>

        <div className="tooltip" onClick={(e) => e.stopPropagation()}>
          <img className="addCart-img" src={assets.addCart} alt="Add to Cart" />
          <span
            className="tooltip-text"
            onClick={() => {
              navigate(`/cart/${selectedProduct._id}`);
              scrollTo(0, 0);
            }}
          >
            Add to Cart
          </span>
        </div>
      </div>
       ) : (
        <p>No product found in your wishlist.</p> 
      )}
    </div>
    </div>
  );
};

export default Wishlist;
