import "../css/Wishlist.css";
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <img
        src={assets.backIcon}
        alt=""
        className="backicon"
        onClick={() => navigate(-1)}
      />
      <div className="wishlist">
        <h1 className="topic">Wishlist</h1>

        {wishlistItems.length > 0 ? (
          wishlistItems
            .slice()
            .reverse()
            .map((item) => (
              <div key={item._id} className="wishlistbox">
                <img
                  className="cancelicon"
                  src={assets.cancelicon}
                  alt=""
                  onClick={() => removeFromWishlist(item._id)}
                />

                <img src={item.image} alt="" className="wishlistimg" />

                <div className="wishlist-details">
                  <p className="wishlist-name">{item.name}</p>

                  <div className="wishlist-info">
                    <p className="wishlist-prise">Rs.{item.price}</p>
                    <p className="wishlist-stock">{item.stock} in stock</p>
                  </div>
                </div>

                <div className="tooltip" onClick={(e) => e.stopPropagation()}>
                  <img
                    className="addCart-img"
                    src={assets.addCart}
                    alt="Add to Cart"
                    onClick={async () => {
                      await addToCart(
                        {
                          id: item.productId,
                          Name: item.name,
                          Price: item.price,
                          image: item.image,
                          stock: item.stock,
                        },
                        1
                      );

                      await removeFromWishlist(item._id);

                      navigate("/cart");
                    }}
                  />
                </div>
              </div>
            ))
        ) : (
          <p>No products in wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
