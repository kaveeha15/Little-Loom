import React, { useEffect, useState } from "react";
import { assets, product } from "../assets/assets";
import "../css/AllProduct.css";
import { useNavigate, useParams } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(product);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let filtered = product;

    if (category) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [category, searchQuery]);

  const handleSpecialityClick = (category) => {
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
              className="pro-type"
              onClick={() => handleSpecialityClick("Clothing & Accessories")}
            >
              Clothing & Accessories
            </p>
            <p
              className="pro-type"
              onClick={() => handleSpecialityClick("Diapers & Hygiene")}
            >
              Diapers & Hygiene
            </p>
            <p
              className="pro-type"
              onClick={() => handleSpecialityClick("Feeding Essentials")}
            >
              Feeding Essentials
            </p>
            <p
              className="pro-type"
              onClick={() => handleSpecialityClick("Nursery & Furniture")}
            >
              Nursery & Furniture
            </p>
            <p
              className="pro-type"
              onClick={() => handleSpecialityClick("Health & Safety")}
            >
              Health & Safety
            </p>
            <p
              className="pro-type"
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

                    <div
                      className="tooltip"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className="addCart-img"
                        src={assets.addCart}
                        alt="Add to Cart"
                      />
                      <span
                        className="tooltip-text"
                        onClick={() => {
                          navigate(`/cart/${item._id}`);
                          scrollTo(0, 0);
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
