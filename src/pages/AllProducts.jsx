import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import "../css/AllProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { WishlistContext } from "../Context/WishlistContext";

const AllProducts = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(category || "");
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore based on category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const collRef = collection(db, "products");
        let q = collRef;

        // Add category filter if present
        if (category) {
          q = query(collRef, where("category", "==", category));
        }

        const snap = await getDocs(q);
        let products = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Apply search filter locally
        if (searchQuery) {
          products = products.filter((item) =>
            item.Name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setFilteredProducts(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  const handleSpecialityClick = (cat) => {
    setActiveCategory(cat);
    navigate(`/products/${cat}`);
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <p className="filter-topic">
        Browse safe & trusted kids products with ease.
      </p>

      <div className="main-content-container">
        <div className="filter-box">
          <div className="filter-box2">
            {[
              "Clothing & Accessories",
              "Diapers & Hygiene",
              "Feeding Essentials",
              "Nursery & Furniture",
              "Health & Safety",
              "Toys & Learning",
            ].map((cat) => (
              <p
                key={cat}
                className={`pro-type ${activeCategory === cat ? "active" : ""}`}
                onClick={() => handleSpecialityClick(cat)}
              >
                {cat}
              </p>
            ))}
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
              filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="pro-detailsBox"
                  onClick={() => {
                    navigate(`/productDetails/${item.id}`);
                    scrollTo(0, 0);
                  }}
                >
                  <img
                    className="boxClor"
                    src={item.image || assets.defaultImage}
                    alt={item.Name}
                  />

                  <div
                    className="tooltip wishlist-tooltip"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      className="wishlist-img"
                      src={assets.wishlist}
                      alt="Add to Wishlist"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const success = await addToWishlist(item);
                        if (!success) {
                          navigate("/signIn");
                        } else {
                          navigate("/wishlist");
                        }
                      }}
                    />
                    <span
                      className="tooltip-text"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const success = await addToWishlist(item);
                        if (!success) {
                          navigate("/signIn");
                        } else {
                          navigate("/wishlist");
                        }
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
                        onClick={async (e) => {
                          e.stopPropagation();
                          const success = await addToCart(item, 1);
                          if (!success) {
                            navigate("/signIn"); // redirect to login if not logged in
                          } else {
                            navigate("/cart"); // redirect to cart if added successfully
                          }
                        }}
                      />
                      <span
                        className="tooltip-text"
                        onClick={async (e) => {
                          e.stopPropagation();
                          const success = await addToCart(item, 1);
                          if (!success) {
                            navigate("/signIn");
                          } else {
                            navigate("/cart");
                          }
                        }}
                      >
                        Add to Cart
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
