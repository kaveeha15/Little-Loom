import '../../css/admin/addProducts.css'
const AddProducts = () => {
    return ( 
<div className="addProductContainer">
    <div className="addProductForm">
          <h2>Add Products</h2>
            <div className="addImg">
                <input type="file" name="addImg"  />
            </div>
            <h3>Add Product Image</h3>
            <div className="addProductInput">
                <label>Name : </label>
                <input type="text" name="Name"  />
                <label> Price : </label>
                <input type="text" name="price"  />
                <label>No  of Items : </label>
                <input type="text" name="noItem" />
                <label>Product Description :</label>
                <textarea name="des"  />
            </div>
            <div className="addBtn">
                <p>Add</p>
            </div>

    </div>
  

</div>

     );
}
 
export default AddProducts;