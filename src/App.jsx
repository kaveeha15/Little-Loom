/*import { useState } from 'react'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Reviews from './pages/reviews'
import OrderPlacement from './pages/orderPlacement'

import { Route,Routes,BrowserRouter} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './pages/Home'
import AllProduct from './pages/AllProducts'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'
import UserProfile from './pages/UserProfile'
import Footer from './Components/Footer'

function App() {
 const router=createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout/>}>
       <Route index element={<AllProducts/>}/>
        <Route path= '/totalOrders' element={<TotalOrders/>}/>
        <Route path= '/totalUsers' element={<TotalUsers/>}/>
         <Route path="/addproduct" element={<AddProducts/>} />
    </Route>
  ))
   
  return (
   <BrowserRouter>
     <NavBar/>

     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/products/:category" element={<AllProduct/>} />
      <Route path='/products' element={<AllProduct/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/cart/:id' element={<Cart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/wishlist/:id' element={<Wishlist/>}/>
      <Route path='/review' element={<Reviews/>}/>
      <Route path='/productDetails/:id' element={<ProductDetails/>}/>
       <Route path='/order' element={<OrderPlacement/>}/>
     </Routes>

     <Footer/>
    </BrowserRouter>
    
    
  )
}
export default App*/






import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

// User Pages
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Reviews from './pages/reviews';
import OrderPlacement from './pages/orderPlacement';
import Home from './pages/Home';
import AllProduct from './pages/AllProducts';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';

// Admin Pages
import RootLayout from './layout/rootLayout';
import TotalOrders from './pages/admin/TotalOrders';
import TotalUsers from './pages/admin/TotalUsers';
import AddProducts from './pages/admin/addProducts';
import AllProductsAdmin from './pages/admin/allProducts';

// Shared Components
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

function App() {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {user && role === 'admin' && (
          <Route path="/admin" element={<RootLayout />}>
            <Route index element={<AllProductsAdmin />} />
            <Route path="totalOrders" element={<TotalOrders />} />
            <Route path="totalUsers" element={<TotalUsers />} />
            <Route path="addproduct" element={<AddProducts />} />
          </Route>
        )}

        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<AllProduct />} />
                <Route path="/products" element={<AllProduct />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/:id" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/wishlist/:id" element={<Wishlist />} />
                <Route path="/review" element={<Reviews />} />
                <Route path="/productDetails/:id" element={<ProductDetails />} />
                <Route path="/order" element={<OrderPlacement />} />
                <Route path="/user" element={<UserProfile />} />
                <Route path="/admin/*" element={<Navigate to="/" />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



