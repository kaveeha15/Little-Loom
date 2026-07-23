import { useState } from 'react';
import '../css/Reviews.css';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Reviews = () => {
  const [name, setName] = useState('');
  const [fBack, setFBack] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    if (!name || !fBack) {
      alert('Please fill in all fields');
      return;
    }

    setUploading(true);
    let fileURL = '';

    try {
      // ✅ Upload image to Cloudinary if selected
      if (file) {
        console.log("📤 Uploading to Cloudinary...");
        fileURL = await uploadToCloudinary(file);
        console.log("✅ Uploaded URL:", fileURL);
      }

      // ✅ Save review to Firestore
      await addDoc(collection(db, 'reviews'), {
        name,
        feedback: fBack,
        fileURL,
        timestamp: new Date()
      });

      alert('✅ Review submitted successfully!');
      setName('');
      setFBack('');
      setFile(null);
    } catch (error) {
      console.error('🔥 Error submitting review:', error);
      alert('❌ Failed to submit review');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="reviewContainer">
      <div className="reviewForm">
        <div className="heading">
          <h2>Share Your Experience</h2>
        </div>

        <div className="upload">
          <input
            type="file"
            name="upload"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="reviewsInput">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            name="fBack"
            placeholder="Your Feedback"
            value={fBack}
            onChange={(e) => setFBack(e.target.value)}
          />
        </div>

        <div className="submit">
          <button onClick={handleSubmit} disabled={uploading}>
            {uploading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;