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
      <Route path='/userProfile' element={<UserProfile/>}/>
    
   
      
     </Routes>

     <Footer/>
    </BrowserRouter>
    
    
  )
}
export default App



 
