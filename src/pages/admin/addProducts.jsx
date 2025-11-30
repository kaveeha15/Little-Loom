import '../../css/admin/addProducts.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, storage } from '../../config/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    Name: product?.Name || "",
    price: product?.Price || "",
    noItem: product?.Stock || "",
    des: product?.description || "",
    category: product?.Category || "",
    addImg: product?.Image || "",
  });

  const [file, setFile] = useState(null); // track selected file
  const [preview, setPreview] = useState(product?.Image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // IMAGE SELECT
    if (files && files.length > 0) {
      const selectedFile = files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please upload a valid image!");
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // temporary preview
      return;
    }

    // NORMAL INPUT
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      let imageUrl = formData.addImg; // default to existing image

      // UPLOAD NEW IMAGE IF SELECTED
      if (file) {
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const productData = {
        Name: formData.Name.trim(),
        Price: Number(formData.price) || 0,
        Stock: Number(formData.noItem) || 0,
        description: formData.des.trim(),
        Category: formData.category,
        Image: imageUrl, // Save Storage URL
      };

      // UPDATE EXISTING PRODUCT
      if (product && product.id) {
        const updateRef = doc(db, "products", product.id);
        await updateDoc(updateRef, productData);
        alert("✅ Product Updated Successfully!");
      }
      // ADD NEW PRODUCT
      else {
        await addDoc(collection(db, "products"), productData);
        alert("✅ Product Added Successfully!");
      }

      setFile(null); // reset selected file
      navigate("/admin/products"); // adjust route as needed
    } catch (err) {
      console.error("🔥 FIREBASE ERROR:", err);
      alert("❌ Error saving product!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addProductContainer">
      <div className="addProductForm">
        <h2>{product ? "Edit Product" : "Add Product"}</h2>

        {/* IMAGE UPLOAD */}
        <div className="addImg">
          <input type="file" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview"  />}
        </div>

        <h3>Product Image</h3>

        {/* FORM INPUTS */}
        <div className="addProductInput">
          <label>Name:</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} />

          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />

          <label>No of Items:</label>
          <input type="number" name="noItem" value={formData.noItem} onChange={handleChange} />

          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Clothing & Accessories">Clothing & Accessories</option>
            <option value="Diapers & Hygiene">Diapers & Hygiene</option>
            <option value="Feeding Essentials">Feeding Essentials</option>
            <option value="Nursery & Furniture">Nursery & Furniture</option>
            <option value="Health & Safety">Health & Safety</option>
            <option value="Toys & Learning">Toys & Learning</option>
          </select>

          <label>Description:</label>
          <textarea name="des" value={formData.des} onChange={handleChange}></textarea>
        </div>

        {/* BUTTON */}
        <button
          className="addBtn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : product ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
