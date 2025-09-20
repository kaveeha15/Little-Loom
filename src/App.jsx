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
//import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
function App() {
 
  return (
    <div className="appContainer">
   <AllProducts/>
    </div>
    
    
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
      