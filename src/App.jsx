import { useState } from 'react'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Reviews from './pages/reviews'
import OrderPlacement from './pages/orderPlacement'
import AddProducts from './pages/admin/addProducts'
import EditProducts from './pages/admin/editProducts'
import AllProducts from './pages/admin/allProducts'
import TotalOrders from './pages/admin/totalOrders'
import TotalUsers from './pages/admin/totalUsers'
import RootLayout from './layout/rootLayout'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
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
    <div className="appContainer">
    <RouterProvider router={router}/>
    </div>
    
    
  )
}
export default App
