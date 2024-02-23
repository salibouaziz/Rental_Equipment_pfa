import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
     
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <span style={{ color: "white", fontSize: "35px" }}>RENT</span>
              <span>UP</span>
              <h2>Do You Need Help With Anything?</h2>
              <p>
                Receive updates,tutorials, discounts sent straight
                in your inbox every month
              </p>

              <div className="input flex">
               
                <button className="btn5" onClick={handleContactButtonClick}>Contact Us Today</button>

              </div>
            </div>
          </div>

          {/* Mapping through footer data */}
          {footer.map((section) => (
          <div className="box" key={section.title}>
          <h4>{section.title}</h4>
          <ul>
            {section.text.map((item, index) => (
             <li key={index}>
             {item.icon && <FontAwesomeIcon icon={item.icon} className="icon" color="#ffc107" />}
             {item.path ? (
               <Link to={item.path}>{item.label}</Link>
             ) : (
               <p>{item.label}</p>
             )}
           </li>
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
