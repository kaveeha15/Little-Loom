import { useState } from 'react';
import '../css/Reviews.css';
import { db, storage } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Reviews = () => {
  const [name, setName] = useState('');
  const [fBack, setFBack] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !fBack) {
      alert('Please fill in all fields');
      return;
    }

    setUploading(true);
    let fileURL = '';

    try {
      if (file) {
        const storageRef = ref(storage, `reviews/${file.name}`);
        await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'reviews'), {
        name,
        feedback: fBack,
        fileURL,
        timestamp: new Date()
      });

      alert('Review submitted successfully!');
      setName('');
      setFBack('');
      setFile(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
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
          <input type="file" name="upload" onChange={(e) => setFile(e.target.files[0])} />
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