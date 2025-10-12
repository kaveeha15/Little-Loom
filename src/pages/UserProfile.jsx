import React, { useState } from "react";
import { assets } from "../assets/assets";
import "../css/UserProfile.css";
import Order from '../Components/Order'
const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [userImage, setUserImage] = useState(assets.userImage1);
  const [name, setName] = useState("Chamika Dilhani");
  const [email, setEmail] = useState("Chamikadilhani@gmail.com");
  const [phone, setPhone] = useState("0778428662");
  const [address1, setAddress1] = useState("Akuressa");
  const [address2, setAddress2] = useState("Matara");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUserImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEdit(false);
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
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span className="value-text">{name}</span>
          )}
        </div>

        <div className="detail-row">
          <span className="label-text">Email:</span>
          {isEdit ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span className="value-text">{email}</span>
          )}
        </div>

        <div className="detail-row">
          <span className="label-text">Phone No:</span>
          {isEdit ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            <span className="value-text">{phone}</span>
          )}
        </div>

        <div className="detail-row">
          <span className="label-text">Address:</span>
          {isEdit ? (
            <div className="address-inputs">
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
          ) : (
            <span className="value-text">
              {address1}, {address2}
            </span>
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
    <Order/>
    </div>


  );
};

export default UserProfile;
