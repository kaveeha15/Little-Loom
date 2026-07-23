// WishlistContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // Listen to auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else {
        setUserId(null);
        setWishlistItems([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener for wishlist
  useEffect(() => {
    if (!userId) return;

    const wishlistRef = collection(db, "wishlist");
    const q = query(wishlistRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setWishlistItems(items);
    });

    return () => unsubscribe();
  }, [userId]);

  // Add to wishlist
  const addToWishlist = async (product) => {
    if (!userId) {
      toast.error("Please login first to add items to wishlist");
      return false; // return false if not logged in
    }

    const wishlistRef = collection(db, "wishlist");
    const q = query(
      wishlistRef,
      where("userId", "==", userId),
      where("productId", "==", product.id)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      toast.info("Product already in wishlist!");
      return true;
    }

    await addDoc(wishlistRef, {
      userId,
      productId: product.id,
      name: product.Name,
      image: product.Image || assets.defaultImage,
      price: product.Price,
      stock: product.Stock ?? 0,
    });

    toast.success("Product added to wishlist!");
    return true;
  };

  // Remove from wishlist
  const removeFromWishlist = async (wishlistId) => {
    await deleteDoc(doc(db, "wishlist", wishlistId));
    toast.success("Removed from wishlist!");
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
