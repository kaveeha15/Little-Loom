import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./Context/CartContext";
import { OrderProvider } from './Context/OrderContext.jsx';
import { WishlistProvider } from './Context/WishlistContext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
    <CartProvider>
      <OrderProvider>
      <App />
      </OrderProvider>
    </CartProvider>
    </WishlistProvider>
  </StrictMode>
);

