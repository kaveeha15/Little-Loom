import React, { useEffect, useState, useContext } from "react";
import { assets} from "../assets/assets";
import "../css/AllProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import {db} from '../config/firebase'
import { collection, getDocs } from "firebase/firestore";

const AllProducts = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { addToCart } = useContext(CartContext);

  const [productDetails,setProductDetails]=useState([])
  const collRef=collection(db,"products")

  const [activeCategory, setActiveCategory] = useState(category || "");
  const [filteredProducts, setFilteredProducts] = useState(productDetails);
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(()=>{
    getData()
  },[])

  const getData=async()=>{
    const snap=await getDocs(collRef)
    const dataArray=snap.docs.map((doc)=>({...doc.data(),id:doc.id}))
    setProductDetails(dataArray)
  }
  console.log(productDetails)

  useEffect(() => {
    let filtered = productDetails;

    if (category) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [category, searchQuery,productDetails]);

  const handleSpecialityClick = (category) => {
    setActiveCategory(category);
    navigate(`/products/${category}`);
  };

  return (
    <div>
      <p className="filter-topic">
        Browse safe & trusted kids products with ease.
      </p>
      <div className="main-content-container">
        <div className="filter-box">
          <div className="filter-box2">
            <p
              className={`pro-type ${
                activeCategory === "Clothing & Accessories" ? "active" : ""
              }`}
              onClick={() => handleSpecialityClick("Clothing & Accessories")}
            >
              Clothing & Accessories
            </p>
            <p
              className={`pro-type ${
                activeCategory === "Diapers & Hygiene" ? "active" : ""
              }`}
              onClick={() => handleSpecialityClick("Diapers & Hygiene")}
            >
              Diapers & Hygiene
            </p>
            <p
              className={`pro-type ${
                activeCategory === "Feeding Essentials" ? "active" : ""
              }`}
              onClick={() => handleSpecialityClick("Feeding Essentials")}
            >
              Feeding Essentials
            </p>
            <p
              className={`pro-type ${
                activeCategory === "Nursery & Furniture" ? "active" : ""
              }`}
              onClick={() => handleSpecialityClick("Nursery & Furniture")}
            >
              Nursery & Furniture
            </p>
            <p
              className={`pro-type ${
                activeCategory === "Health & Safety" ? "active" : ""
              }`}
              onClick={() => handleSpecialityClick("Health & Safety")}
            >
              Health & Safety
            </p>
            <p
              className={`pro-type ${
                activeCategory === "Toys & Learning" ? "active" : ""
              }`}
              onClick={() => handleSpecialityClick("Toys & Learning")}
            >
              Toys & Learning
            </p>
          </div>
        </div>

        <div className="proMenu1">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
            <img src={assets.searchIcon} alt="Search" className="search-icon" />
          </div>

          <div className="pro-details">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <div
                  onClick={() => {
                    navigate(`/productDetails/${item._id}`);
                    scrollTo(0, 0);
                  }}
                  className="pro-detailsBox"
                  key={index}
                >
                  <img className="boxClor" src={item.image} alt="" />

                  <div
                    className="tooltip wishlist-tooltip"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      className="wishlist-img"
                      src={assets.wishlist}
                      alt="Add to Wishlist"
                    />
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

                    <div
                      className="tooltip"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className="addCart-img"
                        src={assets.addCart}
                        alt="Add to Cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                          navigate("/cart");
                        }}
                      />

                      <span
                        className="tooltip-text"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, 1);
                          navigate("/cart");
                        }}
                      >
                        Add to Cart
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
