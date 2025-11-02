/*import search from '../../assets/images/search.png'
import '../../css/admin/allProducts.css'
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

  
   const handleEdit = (product) => {
      navigate("/admin/addproduct", { state: { product } });
   }

   return (
      <>
         <div className="middle">
            <div className="searchBar">
               <input placeholder="Search" />
               <img src={search} alt="search" />
            </div>
            <div className="addBtn">
               <Link to="/admin/addproduct" className="addBtn">
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

export default AllProducts;*/

/*
   const handleDelete = (id) => {
      const filterArray = data.filter((product) => (product.id !== id))
      setData(filterArray)
   }*/
/*import search from '../../assets/images/search.png';
import '../../css/admin/allProducts.css';
import edit from '../../assets/images/edit.jpg';
import del from '../../assets/images/delete.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from '../../hooks/useFetch';

const AllProducts = () => {
   const { fetchDbData, isLoading, error, data, setData, deleteDbItem } = useFetch();
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
   const [suggestions, setSuggestions] = useState([]);
   const [originalData, setOriginalData] = useState([]);

   useEffect(() => {
      const loadData = async () => {
         const result = await fetchDbData('products');
         if (result) {
            setOriginalData(result);
            setData(result);
         }
      };
      loadData();
   }, []);

   const handleDelete = (id) => {
      deleteDbItem('products', id);
   };

   const handleEdit = (product) => {
      navigate("/admin/addproduct", { state: { product } });
   };

   const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (value.trim() === '') {
         setSuggestions([]);
         setData(originalData); // restore all
         return;
      }

      const uniqueCategories = [...new Set(originalData.map(p => p.Category))];
      const filtered = uniqueCategories.filter(cat =>
         cat.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
   };

   const handleSuggestionClick = (category) => {
      setSearchTerm(category);
      setSuggestions([]);
      const filteredProducts = originalData.filter(p => p.Category === category);
      setData(filteredProducts);
   };

   return (
      <>
         <div className="middle">
            <div className="searchBar">
               <input
                  placeholder="Search by category"
                  value={searchTerm}
                  onChange={handleSearchChange}
               />
               <img src={search} alt="search" />
            </div>
            <div className="addBtn">
               <Link to="/admin/addproduct" className="addBtn">
                  <p>Add product</p>
               </Link>
            </div>
         </div>

         {suggestions.length > 0 && (
            <div className="suggestionBox">
               {suggestions.map((cat, i) => (
                  <div key={i} className="suggestionItem" onClick={() => handleSuggestionClick(cat)}>
                     {cat}
                  </div>
               ))}
            </div>
         )}

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
                  </div>
               </div>

               {isLoading ? <h2>Loading...</h2> : data.map((product, index) => (
                  <div className="item" key={product.id}>
                     <div className="pItem">{index + 1}</div>
                     {product.Image && <img src={product.Image} alt="product" />}
                     <div className="pItemName">{product.Name}</div>
                     <div className="pItem">{product.Price}</div>
                     <div className="pItem">{product.Stock}</div>
                     <div className="Aaction">
                        <div className="pItem">
                           <img src={del} alt="delete" onClick={() => handleDelete(product.id)} />
                        </div>
                        <div className="pItem">
                           <img src={edit} alt="edit" onClick={() => handleEdit(product)} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};

export default AllProducts;*/

import search from '../../assets/images/search.png'; 
import '../../css/admin/allProducts.css';
import edit from '../../assets/images/edit.jpg';
import del from '../../assets/images/delete.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from '../../hooks/useFetch';

const AllProducts = () => {
   const { fetchDbData, isLoading, error, data, setData, deleteDbItem } = useFetch();
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
   const [suggestions, setSuggestions] = useState([]);
   const [originalData, setOriginalData] = useState([]);

   // ✅ Fetch all products once on load
   useEffect(() => {
      const loadData = async () => {
         const res = await fetchDbData('products');
         if (res && Array.isArray(res)) {
            setOriginalData(res);
            setData(res);
         }
      };
      loadData();
   }, []);

   const handleDelete = (id) => {
      deleteDbItem('products', id);
      setOriginalData(prev => prev.filter(item => item.id !== id));
   };

   const handleEdit = (product) => {
      navigate("/admin/addproduct", { state: { product } });
   };

   const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);

      // ✅ if search bar empty → reset all data
      if (value.trim() === '') {
         setSuggestions([]);
         setData(originalData); // restore full list
         return;
      }

      // ✅ build suggestion list (no filtering yet)
      const uniqueCategories = [...new Set(originalData.map(p => p.Category || p.category))];
      const matched = uniqueCategories.filter(cat =>
         cat && cat.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matched);
   };

   const handleSuggestionClick = (category) => {
      setSearchTerm(category);
      setSuggestions([]);
      const filteredProducts = originalData.filter(p =>
         (p.Category || p.category) === category
      );
      setData(filteredProducts);
   };

   return (
      <>
         <div className="middle">
            <div className="searchBar">
               <input
                  placeholder="Search by category"
                  value={searchTerm}
                  onChange={handleSearchChange}
               />
               <img src={search} alt="search" />
            </div>
            <div className="addBtn">
               <Link to="/admin/addproduct" className="addBtn">
                  <p>Add product</p>
               </Link>
            </div>
         </div>

         {/* ✅ Suggestion List */}
         {suggestions.length > 0 && (
            <div className="suggestionBox">
               {suggestions.map((cat, i) => (
                  <div
                     key={i}
                     className="suggestionItem"
                     onClick={() => handleSuggestionClick(cat)}
                  >
                     {cat}
                  </div>
               ))}
            </div>
         )}

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
                  </div>
               </div>

               {isLoading ? (
                  <h2>Loading...</h2>
               ) : data && data.length > 0 ? (
                  data.map((product, index) => (
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
               ) : (
                  <p>No products found.</p>
               )}
            </div>
         </div>
      </>
   );
};

export default AllProducts;
