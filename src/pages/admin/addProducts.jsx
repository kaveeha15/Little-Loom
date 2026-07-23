 import '../../css/admin/addProducts.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from '../../config/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

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

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(product?.Image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      if (!selectedFile.type.startsWith("image/")) {
        alert("Please upload a valid image!");
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // ✅ Cloudinary Upload Function
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "little_loom_products"); // ⚠️ ඔබේ preset name
    data.append("cloud_name", "qtj1ejpm"); // ⚠️ ඔබේ cloud name

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/qtj1ejpm/image/upload`, // ⚠️ ඔබේ cloud name
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    console.log("☁️ Cloudinary result:", result);
    return result.secure_url;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      let imageUrl = formData.addImg;

      // Upload to Cloudinary if new file selected
      if (file) {
        console.log("📤 Uploading to Cloudinary...");
        imageUrl = await uploadToCloudinary(file);
        console.log("✅ Uploaded URL:", imageUrl);
      }

      if (!imageUrl) {
        alert("⚠️ Please select an image!");
        setIsSubmitting(false);
        return;
      }

      const productData = {
        Name: formData.Name.trim(),
        Price: Number(formData.price) || 0,
        Stock: Number(formData.noItem) || 0,
        description: formData.des.trim(),
        Category: formData.category,
        Image: imageUrl,
      };

      if (product && product.id) {
        const updateRef = doc(db, "products", product.id);
        await updateDoc(updateRef, productData);
        alert("✅ Product Updated Successfully!");
      } else {
        await addDoc(collection(db, "products"), productData);
        alert("✅ Product Added Successfully!");
      }

      setFile(null);
      navigate("/admin/products");
    } catch (err) {
      console.error("🔥 ERROR:", err);
      alert("❌ Error saving product!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addProductContainer">
      <div className="addProductForm">
        <h2>{product ? "Edit Product" : "Add Product"}</h2>

        <div className="addImg">
          <input type="file" accept="image/*" onChange={handleChange} />
          {preview && <img src={preview} alt="Preview" />}
        </div>


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

        <button
          className="addbut"
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