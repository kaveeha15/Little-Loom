import RootLayout from "../../layout/rootLayout";
import search from '../../assets/images/search.png'
import '../../css/admin/allProducts.css'
const AllProducts = () => {
    return (  
    <>
      <RootLayout/>
<div className="middle">
    <div className="searchBar"><input placeholder="Search"/><img src={search}></img></div>
        <div className="addBtn"><p>Add product</p></div>
</div>


















  
    </>
    );
}
 
export default AllProducts;