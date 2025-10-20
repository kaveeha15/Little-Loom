/*import { Outlet,Link } from 'react-router-dom'
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
 
export default RootLayout;*/
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase'; // ✅ correct
import logo from '../assets/images/logo.png';
import order from '../assets/images/order.png';
import products from '../assets/images/products.png';
import user from '../assets/images/user.png';
import '../css/admin/rootLayout.css';

const RootLayout = () => {
    const location = useLocation();

    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            const productsSnapshot = await getDocs(collection(db, 'products'));
            const ordersSnapshot = await getDocs(collection(db, 'totalOrders'));
            const usersSnapshot = await getDocs(collection(db, 'totalUsers'));

            setProductCount(productsSnapshot.size);
            setOrderCount(ordersSnapshot.size);
            setUserCount(usersSnapshot.size);
        };

        fetchCounts();
    }, []);

    return (
        <>
            <div className="navContainer">
                <div className="top">
                    <img src={logo} alt="logo" />
                    <h1>Admin Dashboard</h1>
                    <div className="signOutBtn"><p>Sign Out</p></div>
                </div>
                <hr />
                <div className="btnSet">
                    <div className={`box ${location.pathname === '/' ? 'active' : ''}`}>
                        <Link to='/admin' className='navLink'>
                            <p>All Products {productCount}</p>
                        </Link>
                        <img src={products} alt="products" />
                    </div>
                    <div className={`box ${location.pathname === '/totalOrders' ? 'active' : ''}`}>
                        <Link to='/admin/totalOrders' className='navLink'>
                            <p>Total Orders {orderCount}</p>
                        </Link>
                        <img src={order} alt="orders" />
                    </div>
                    <div className={`box ${location.pathname === '/totalUsers' ? 'active' : ''}`}>
                        <Link to='/admin/totalUsers' className='navLink'>
                            <p>Total Users {userCount}</p>
                        </Link>
                        <img src={user} alt="users" />
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default RootLayout;