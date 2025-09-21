import search from '../../assets/images/search.png'
import '../../css/admin/allProducts.css'
import ng1 from '../../assets/images/ng1.jpg'
import ng2 from '../../assets/images/ng2.jpg'
import ng3 from '../../assets/images/ng3.jpg'
import edit from '../../assets/images/edit.jpg'
import del from '../../assets/images/delete.jpg'
import AddProducts from "./addProducts";
import { Link } from "react-router-dom";
import { useState } from "react";
const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([
        {
            id: 1,
            image:ng1,
            name:'Floral Embroidered Baby Romper Set',
            price:'Rs.1500',
            stock:40
        },
         {
            id: 2,
            image:ng2,
            name:'New born full kit',
            price:'Rs.1550',
            stock:55
        },
         {
            id: 3,
            image:ng3,
            name:'New born full kit',
            price:'Rs.1550',
            stock:35
        },
    ])


    return (
        <>

            <div className="middle">
                <div className="searchBar"><input placeholder="Search" /><img src={search}></img></div>
                <div className="addBtn">  <Link to="/addproduct" className="addBtn">
          <p>Add product</p>
        </Link></div>
            </div>
            <div className="divContainer">
                     <div className="productContainer">

                    <div className="productHeading">
                        <div className="pItem"><h4>Id</h4></div>
                        <div className="pItem"><h4>Product</h4></div>
                       <div className="pItemName"><h4>Name</h4></div>
                        <div className="pItem"><h4>Price</h4></div>
                        <div className="pItem"><h4>Stock</h4></div>
                      <div className="Action">    
                        <div className="pItemC"><h4>Action</h4></div>
                         <div className="pItemC"><h4></h4></div>
                      </div>
                    </div>
                {
                    allProducts.map(product=>(
                        <div className="item" key={product.id}>
                           <div className="pItem">{product.id}</div>
                            <div className="pItemImg"><img src={product.image}/></div>
                            <div className="pItemName">{product.name}</div>
                            <div className="pItem">{product.price}</div>
                            <div className="pItem">{product.stock}</div>
                          <div className="Aaction">    
                            <div className="pItem"><img src={del}/></div>
                            <div className="pItem"><img src={edit}/></div> 
                          </div>
                        </div>
                    ))
                } 
    
                </div>
            
            </div>
        </>
    );
}

export default AllProducts;