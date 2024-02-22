import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Define paths where footer should not be rendered
  const excludedPaths = ["/login", "/register"];

  // Check if the current location path is in the excluded paths
  const shouldRenderFooter = !excludedPaths.includes(location.pathname);

  // Function to handle the click event of "Contact Us Today" button
  const handleContactButtonClick = () => {
    // Navigate to the contact page
    window.location.href = "/contact";
  };

  // If the current path is one of the excluded paths, return null to not render the footer
  if (!shouldRenderFooter) return null;

  return (
    <>
      <section className="footerContact">
        <div className="container">
          <div className="send flex">
            <div className="text">
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to rent anything you want.</p>
            </div>
            {/* Button with onClick handler */}
            <button className="btn5" onClick={handleContactButtonClick}>Contact Us Today</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <span style={{ color: "white", fontSize: "35px" }}>RENT</span>
              <span>UP</span>
              <h2>Do You Need Help With Anything?</h2>
              <p>
                Receive updates, hot deals, tutorials, discounts sent straight
                in your inbox every month
              </p>

              <div className="input flex">
                <input type="text" placeholder="Email Address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {/* Mapping through footer data */}
          {footer.map((val) => (
            <div className="box" key={val.title}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items, index) => (
                  <li key={index}> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>© 2024 RentUP. Designed By OSI.</span>
      </div>
    </>
  );
};

export default Footer;
