import { useState } from 'react'
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
 
  return (
   <BrowserRouter>
     <NavBar/>

     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/products/:category" element={<AllProduct/>} />
      <Route path='/products' element={<AllProduct/>}/>
      <Route path='/singIn' element={<SignIn/>}/>
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
export default App



 /* <Router>
        <nav>
          <Link to='/'>All Products</Link>
           <Link to='/totalOrders'>Total Orders</Link>
            <Link to='/totalUsers'>Total Users</Link>
        </nav>
        <Routes>
          <Route path='/'>All Products</Route>
          <Route path='/totalOrders'>Total Orders</Route>
          <Route path='/totalUsers'>Total Users</Route>
        </Routes>
      </Router>*/
      