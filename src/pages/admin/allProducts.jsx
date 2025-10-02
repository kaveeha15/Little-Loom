import search from '../../assets/images/search.png'
import '../../css/admin/allProducts.css'
import ng1 from '../../assets/images/ng1.jpg'
import ng2 from '../../assets/images/ng2.jpg'
import ng3 from '../../assets/images/ng3.jpg'
/*import edit from '../../assets/images/edit.jpg'
import del from '../../assets/images/delete.jpg'
import { Link } from "react-router-dom";
import { useEffect} from "react";
import useFetch from '../../hooks/useFetch'

const AllProducts = () => {
    return (  
    <>
      <RootLayout/>
<div className="middle">
    <div className="searchBar"><input placeholder="Search"/><img src={search}></img></div>
        <div className="addBtn"><p>Add product</p></div>
</div>

  
}
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
                   isLoading?<h2>Loading...</h2>:data.map((product,index)=>(
                        <div className="item" key={product.id}>
                           <div className="pItem">{index+1}</div>
                            <div className="pItemImg">{product.Image}</div>
                            <div className="pItemName">{product.Name}</div>
                            <div className="pItem">{product.Price}</div>
                            <div className="pItem">{product.Stock}</div>
                          <div className="Aaction">    
                            <div className="pItem"><img src={del}  onClick={handleDelete} /></div>
                            <div className="pItem"><img src={edit}/ ></div> 
                          </div>
                        </div>
                    ))
                } 
    
                </div>
            
            </div>
        </>
    );
}

export default AllProducts;*/
import edit from '../../assets/images/edit.jpg'
import del from '../../assets/images/delete.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useFetch from '../../hooks/useFetch'

const AllProducts = () => {
   const { fetchDbData, isLoading, error, data, setData,deleteDbItem } = useFetch();
   const navigate = useNavigate();

   useEffect(() => {
      fetchDbData('products')
   }, [])
   const handleDelete = (id) => {
    deleteDbItem('products', id);
}

   /*// Delete function
   const handleDelete = (id) => {
      const filterArray = data.filter((product) => (product.id !== id))
      setData(filterArray)
   }*/

   // Edit function
   const handleEdit = (product) => {
      navigate("/addproduct", { state: { product } });
   }

   return (
      <>
         <div className="middle">
            <div className="searchBar">
               <input placeholder="Search" />
               <img src={search} alt="search" />
            </div>
            <div className="addBtn">
               <Link to="/addproduct" className="addBtn">
                  <p>Add product</p>
               </Link>
            </div>
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
                  isLoading ? <h2>Loading...</h2> : data.map((product, index) => (
                     <div className="item" key={product.id}>
                        <div className="pItem">{index + 1}</div>
                      
                        {product.Image && <img src={product.Image} alt="product" />}
                        <div className="pItemName">{product.Name}</div>
                        <div className="pItem">{product.Price}</div>
                        <div className="pItem">{product.Stock}</div>
                        <div className="Aaction">
                           <div className="pItem">
                              <img 
                                src={del} 
                                alt="delete" 
                                onClick={() => handleDelete(product.id)} 
                                
                              />
                           </div>
                           <div className="pItem">
                              <img 
                                src={edit} 
                                alt="edit" 
                                onClick={() => handleEdit(product)} 
                              
                              />
                           </div>
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
