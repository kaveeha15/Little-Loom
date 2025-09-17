import React from "react";
import "../css/Footer.css";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div>
            <img className="littleloom" src={assets.logo} alt="" />
          </div>
          <p>
            Little Loom Kids – For Today’s Little Explorers Clean design meets
            ultimate comfort. Our curated collection of baby and toddler
            essentials blends style,safety, and simplicity to support modern
            parenting with trusted quality and effortles style.
          </p>
        </div>

        <div className="footer-column">
          <h3>CONTACT US</h3>
          <p>
            <img src={assets.email} className="email-img" alt="" />{" "}
            littleloom@gmail.com
          </p>
          <p>
            <img src={assets.phone} className="phone-img" alt="" /> +94 77 842
            8666
          </p>

          <div className="social-icons">
            <a href="#">
              <img className="SMedia" src={assets.fb} alt="" />
            </a>
            <a href="#">
              <img className="SMedia" src={assets.whatsapp} alt="" />
            </a>
            <a href="#">
              <img className="SMedia" src={assets.youtube} alt="" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>LINKS</h3>
          <a href="">HOME</a>
          <a href="">ALL PRODUCT</a>
          <a href="">CART</a>
          <a href="">SING UP</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Little Loom Group. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
