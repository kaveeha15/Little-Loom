import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import "../css/UserProfile.css";
import Order from "../Components/Order";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [userImage, setUserImage] = useState(assets.uploadArea);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  // ✅ Load user details from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);

        const userRef = doc(db, "totalUsers", user.uid); // 🔥 updated
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setName(data.name || "");
          setPhone(data.phone || "");
          setAddress1(data.address1 || "");
          setAddress2(data.address2 || "");
          setUserImage(data.profileImage || assets.userImage1);
        }
      }
    };

    fetchUserData();
  }, []);

  // ✅ Upload profile image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Save updated details to Firestore
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in!");
      return;
    }

    try {
      const userRef = doc(db, "totalUsers", user.uid); // 🔥 updated

      await setDoc(
        userRef,
        {
          name,
          phone,
          address1,
          address2,
          profileImage: userImage,
          email: user.email,
          uid: user.uid,
        },
        { merge: true }
      );

      toast.success("Profile Updated Successfully!");
      setIsEdit(false);

    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <div>
      <div className="profile-container">

        <div className="image-wrapper">
          {isEdit ? (
            <label className="image-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <img src={userImage} alt="User" className="userImage" />
              <div className="overlay-text">Click Here to Change Profile Photo</div>
            </label>
          ) : (
            <img src={userImage} alt="User" className="userImage" />
          )}
        </div>

        <div className="user-Details">
          <div className="detail-row">
            <span className="label-text">Name:</span>
            {isEdit ? (
              <input value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <span className="value-text">{name}</span>
            )}
          </div>

          <div className="detail-row">
            <span className="label-text">Email:</span>
            <span className="value-text">{email}</span>
          </div>

          <div className="detail-row">
            <span className="label-text">Phone No:</span>
            {isEdit ? (
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              <span className="value-text">{phone}</span>
            )}
          </div>

          <div className="detail-row">
            <span className="label-text">Address:</span>
            {isEdit ? (
              <div className="address-inputs">
                <input value={address1} onChange={(e) => setAddress1(e.target.value)} />
                <input value={address2} onChange={(e) => setAddress2(e.target.value)} />
              </div>
            ) : (
              <span className="value-text">{address1}, {address2}</span>
            )}
          </div>
        </div>

        <div>
          {isEdit ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEdit(true)}>Edit</button>
          )}
        </div>
      </div>

      <Order />
    </div>
  );
};

export default UserProfile;
