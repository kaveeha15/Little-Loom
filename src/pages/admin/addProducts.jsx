/*import '../../css/admin/addProducts.css'
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
 
export default AddProducts;*/
/*import '../../css/admin/addProducts.css'
import { useLocation } from "react-router-dom";
import { useState } from "react";

const AddProducts = () => {
    const location = useLocation();
    const product = location.state?.product;

    const [formData, setFormData] = useState({
        Name: product?.Name || "",
        price: product?.Price || "",
        noItem: product?.Stock || "",
        des: product?.description || "",
        addImg: product?.Image || ""
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = () => {
        if (product) {
            // update product API call
            console.log("Updating product:", formData);
        } else {
            // add new product API call
            console.log("Adding product:", formData);
        }
    };

    return ( 
        <div className="addProductContainer">
            <div className="addProductForm">
                <h2>{product ? "Edit Product" : "Add Products"}</h2>

                <div className="addImg">
                    <input 
                        type="file" 
                        name="addImg"  
                        onChange={handleChange} 
                    />
                </div>
                <h3>Add Product Image</h3>

                <div className="addProductInput">
                    <label>Name : </label>
                    <input 
                        type="text" 
                        name="Name"  
                        value={formData.Name}
                        onChange={handleChange}
                    />

                    <label> Price : </label>
                    <input 
                        type="text" 
                        name="price"  
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <label>No  of Items : </label>
                    <input 
                        type="text" 
                        name="noItem" 
                        value={formData.noItem}
                        onChange={handleChange}
                    />

                    <label>Product Description :</label>
                    <textarea 
                        name="des"  
                        value={formData.des}
                        onChange={handleChange}
                    />
                </div>

                <div className="addBtn" onClick={handleSubmit}>
                    <p>{product ? "Update" : "Add"}</p>
                </div>
            </div>
        </div>
    );
}
 
export default AddProducts;*/
/*import '../../css/admin/addProducts.css'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import db from '../../config/firebase'
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProducts = () => {
    const location = useLocation();
    const product = location.state?.product;

    const [formData, setFormData] = useState({
        Name: product?.Name || "",
        price: product?.Price || "",
        noItem: product?.Stock || "",
        des: product?.description || "",
        addImg: product?.Image || ""   // image URL
    });

    const [file, setFile] = useState(null); // store file before upload
    const storage = getStorage();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFile(files[0]); // only file store here
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async () => {
        try {
            let imageUrl = formData.addImg;

            // 🔹 If new file uploaded, save to storage
            if (file) {
                const storageRef = ref(storage, `allProducts/${file.name}`);
                await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(storageRef);
            }

            if (product) {
                // 🔹 Update existing product
                const productRef = doc(db, "allProducts", product.id);
                await updateDoc(productRef, {
                    Name: formData.Name,
                    Price: formData.price,
                    Stock: formData.noItem,
                    description: formData.des,
                    Image: imageUrl
                });
                console.log("✅ Product updated:", formData);
            } else {
                // 🔹 Add new product
                await addDoc(collection(db, "allProducts"), {
                    Name: formData.Name,
                    Price: formData.price,
                    Stock: formData.noItem,
                    description: formData.des,
                    Image: imageUrl
                });
                console.log("✅ Product added:", formData);
            }
        } catch (err) {
            console.error("❌ Error saving product:", err);
        }
    };

    return ( 
        <div className="addProductContainer">
            <div className="addProductForm">
                <h2>{product ? "Edit Product" : "Add Products"}</h2>

                <div className="addImg">
                    <input 
                        type="file" 
                        name="addImg"  
                        onChange={handleChange} 
                    />
                </div>
                <h3>Add Product Image</h3>

                <div className="addProductInput">
                    <label>Name : </label>
                    <input 
                        type="text" 
                        name="Name"  
                        value={formData.Name}
                        onChange={handleChange}
                    />

                    <label> Price : </label>
                    <input 
                        type="text" 
                        name="price"  
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <label>No  of Items : </label>
                    <input 
                        type="text" 
                        name="noItem" 
                        value={formData.noItem}
                        onChange={handleChange}
                    />

                    <label>Product Description :</label>
                    <textarea 
                        name="des"  
                        value={formData.des}
                        onChange={handleChange}
                    />
                </div>

                <div className="addBtn" onClick={handleSubmit}>
                    <p>{product ? "Update" : "Add"}</p>
                </div>
            </div>
        </div>
    );
}
 
export default AddProducts;*/


import '../../css/admin/addProducts.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { db, storage } from '../../config/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProducts = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    Name: product?.Name || "",
    price: product?.Price || "",
    noItem: product?.Stock || "",
    des: product?.description || "",
    addImg: product?.Image || ""
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const selectedFile = files[0];
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let imageUrl = formData.addImg;

      if (file) {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const productData = {
        Name: formData.Name.trim(),
        Price: formData.price.trim(),
        Stock: formData.noItem.trim(),
        description: formData.des.trim(),
        Image: imageUrl
      };

      if (product) {
        const productRef = doc(db, "products", product.id);
        await updateDoc(productRef, productData);
      } else {
        await addDoc(collection(db, "products"), productData);
      }
    } catch (err) {
      alert("Error saving product.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addProductContainer">
      <div className="addProductForm">
        <h2>{product ? "Edit Product" : "Add Products"}</h2>
        <div className="addImg">
          <input type="file" name="addImg" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" style={{ width: "80px" }} />}
        </div>
        <h3>Add Product Image</h3>
        <div className="addProductInput">
          <label>Name :</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
          <label>Price :</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
          <label>No of Items :</label>
          <input type="number" name="noItem" value={formData.noItem} onChange={handleChange} />
          <label>Product Description :</label>
          <textarea name="des" value={formData.des} onChange={handleChange} />
        </div>
        <div className="addBtn" onClick={handleSubmit}>
          <p>{isSubmitting ? "Saving..." : product ? "Update" : "Add"}</p>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;