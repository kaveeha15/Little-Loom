import React, { createContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const auth = getAuth();

  // ✅ Listen to auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else {
        setUserId(null);
        setCartItems([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // ✅ Real-time listener for cart items
  useEffect(() => {
    if (!userId) return;

    const cartRef = collection(db, "cart");
    const q = query(cartRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({ _id: d.id, ...d.data() }));
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [userId]);

  // ✅ Add to cart
  const addToCart = async (product, quantity = 1) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login first to add items to cart.");
      return false;
    }

    const uid = user.uid;
    const productRef = doc(db, "products", product.id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      toast.error("Product not found!");
      return false;
    }

    const productData = productSnap.data();
    const currentStock = productData.Stock ?? productData.stock ?? 0;

    if (currentStock < quantity) {
      toast.error(`Only ${currentStock} items left in stock.`);
      return false;
    }

    const cartRef = collection(db, "cart");
    const q = query(
      cartRef,
      where("userId", "==", uid),
      where("productId", "==", product.id)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      const existingDoc = snap.docs[0];
      const existingData = existingDoc.data();
      const newQuantity = existingData.quantity + quantity;

      if (newQuantity > currentStock) {
        toast.error(`You can only add up to ${currentStock} items`);
        return false;
      }

      await updateDoc(doc(db, "cart", existingDoc.id), {
        quantity: newQuantity,
      });
    } else {
      await addDoc(cartRef, {
        userId: uid,
        productId: product.id,
        name: product.Name,
        price: Number(product.Price ?? product.price ?? 0),
        image: product.image || assets.defaultImage,
        quantity,
        stock: currentStock,
      });
    }

    // ✅ Reduce stock in products collection
    await updateDoc(productRef, {
      Stock: currentStock - quantity,
    });
    return true
  };

  // ✅ Update quantity
  const updateQuantity = async (cartId, newQuantity) => {
    try {
      const cartItem = cartItems.find((item) => item._id === cartId);
      if (!cartItem) return;

      const productRef = doc(db, "products", cartItem.productId);
      const productSnap = await getDoc(productRef);
      const productData = productSnap.data();
      const availableStock = productData.Stock ?? productData.stock ?? 0;

      if (newQuantity > cartItem.quantity + availableStock) {
        toast.error("Not enough stock available");
        return;
      }

      const quantityDiff = newQuantity - cartItem.quantity;

      // Update cart
      await updateDoc(doc(db, "cart", cartId), { quantity: newQuantity });

      // Update product stock
      await updateDoc(productRef, {
        Stock: availableStock - quantityDiff,
      });
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (cartId) => {
    try {
      const cartItem = cartItems.find((item) => item._id === cartId);
      if (cartItem) {
        const productRef = doc(db, "products", cartItem.productId);
        const productSnap = await getDoc(productRef);
        const productData = productSnap.data();
        const currentStock = productData.Stock ?? productData.stock ?? 0;

        // Restore stock
        await updateDoc(productRef, {
          Stock: currentStock + cartItem.quantity,
        });
      }

      await deleteDoc(doc(db, "cart", cartId));
      toast.success("Remove from cart");
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      for (let item of cartItems) {
        await removeFromCart(item._id);
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };
const placeOrder = async (cartItems, totalAmount, formData = {}, clearCart) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    // Convert cart items
    const items = cartItems.map((item) => ({
      productId: item._id || "",
      productName: item.name || "",
      quantity: Number(item.quantity) || 0,
      total: (Number(item.price) || 0) * (Number(item.quantity) || 0),
    }));

    // Order data
    const orderData = {
      userId: user.uid,
      items,
      totalAmount: Number(totalAmount) || 0,

      billingDetails: {
        fName: formData.fName ?? "",
        lName: formData.lName ?? "",
        houseNo: formData.houseNo ?? "",
        optional: formData.optional ?? "",
        city: formData.city ?? "",
        pCode: formData.pCode ?? "",
        pNo: formData.pNo ?? "",
        email: formData.email ?? "",
        paymentMethod: formData.paymentMethod ?? "",
      },

      status: "Pending",
      orderDate: serverTimestamp(),
    };

    // Save new order into Firestore
    await addDoc(collection(db, "orders"), orderData);

    // Clear cart correctly
    if (clearCart) await clearCart();

    return true;
  } catch (error) {
    console.error("Order saving error:", error);
    toast.error("Failed to place order.");
    return false;
  }
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
