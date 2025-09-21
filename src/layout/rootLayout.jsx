import { Outlet,Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import order from '../assets/images/order.png'
import products from '../assets/images/products.png'
import user from '../assets/images/user.png'
import '../css/admin/rootLayout.css'
const RootLayout = () => {

    return ( 
        <><div className="navContainer">
    <div className="top">
        <img src={logo}></img>
        <h1>Admin Dashboard</h1>
        <div className="signOutBtn"><p>Sign Out</p></div>
    </div>
    <hr></hr>
    <div className="btnSet">
        <div className="box" >
            <Link to='/' className='navLink'><p>All Products</p></Link>
            <img src={ products}></img>
        </div>
         <div className="box">
             <Link to='/totalOrders' className='navLink'><p>Total Orders</p></Link>
            <img src={ order}></img>
         </div>
          <div className="box">
            <Link to='/totalUsers' className='navLink'><p>Total Users</p></Link>
            <img src={user}></img>
         </div>
    </div>
</div>
<Outlet/>
</>



     );
}
 
export default RootLayout;






