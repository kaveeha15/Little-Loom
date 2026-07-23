import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CartContext } from "../Context/CartContext";
import "../css/ProductDetails.css";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); 

  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const collRef = collection(db, "products");

  useEffect(() => {
    const getData = async () => {
      try {
        const snap = await getDocs(collRef);
        const dataArray = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProductDetails(dataArray);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div>Loading products...</div>;

  const selectProduct = productDetails.find((item) => item.id === id);
  if (!selectProduct) return <div>Product not found!</div>;

  const relatedProduct = productDetails.filter(
    (item) => item.category === selectProduct.category && item.id !== id
  );

  // ✅ Handler for adding to cart
  const handleAddToCart = async () => {
    try {
      await addToCart(selectProduct, 1); // add 1 quantity
      toast.success("Product added to cart!");
      navigate("/cart");
      scrollTo(0, 0);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Error adding to cart")
    }
  };

  return (
    <div>
      <div className="productDetails">
        <div className="prodetailsImg">
          <img
            src={selectProduct.Image ?? assets.placeholder}
            alt={selectProduct.Name ?? "Product"}
          />
        </div>

        <div className="proDetails">
          <h2 className="proText">Name: {selectProduct.Name}</h2>
          <p className="proText">Price: Rs.{selectProduct.Price}</p>
          <p className="proText">In Stock: {selectProduct.Stock ?? 0}</p>
          <p className="proText">Description:</p>
          <p className="des">{selectProduct.description ?? "No description available."}</p>

          <button className="cartBut" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="relatedproduct">
        <p>RELATED PRODUCTS</p>
        <div className="pro-details">
          {relatedProduct.length === 0 ? (
            <p>No related products found.</p>
          ) : (
            relatedProduct.map((item) => (
              <div
                onClick={() => {
                  navigate(`/productDetails/${item.id}`);
                  scrollTo(0, 0);
                }}
                className="pro-detailsBox"
                key={item.id}
              >
                <img
                  className="boxClor"
                  src={item.Image ?? assets.placeholder}
                  alt={item.Name ?? "Product"}
                />
                <div
                  className="tooltip wishlist-tooltip"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img className="wishlist-img" src={assets.wishlist} alt="Add to Wishlist" />
                  <span
                    className="tooltip-text"
                    onClick={() => {
                      navigate(`/wishlist/${item.id}`);
                      scrollTo(0, 0);
                    }}
                  >
                    Add to Wishlist
                  </span>
                </div>

                <div className="boxPadding">
                  <p className="pro-name">{item.Name}</p>
                  <p className="pro-prize">Rs.{item.Price}</p>
                  <div className="tooltip" onClick={(e) => e.stopPropagation()}>
                    <img className="addCart-img" src={assets.addCart} alt="Add to Cart" />
                    <span
                      className="tooltip-text"
                      onClick={async () => {
                        await addToCart(item, 1); // ✅ add related product to cart
                        alert("Product added to cart!");
                        navigate("/cart");
                        scrollTo(0, 0);
                      }}
                    >
                      Add to Cart
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
