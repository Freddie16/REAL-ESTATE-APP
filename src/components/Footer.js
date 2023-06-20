import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Footer.css'; // Import the CSS file for styling

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (!isHomePage) {
    return null; // Render nothing if not the homepage
  }

  return (
    <footer className="footer">
      <div className="footer__section">
        {/* Section 1 content goes here */}
      </div>
      <div className="footer__line"></div>
      <div className="footer__section">
        {/* Section 2 content goes here */}
      </div>
      <div className="footer__line"></div>
      <div className="footer__section">
        {/* Section 3 content goes here */}
      </div>
    </footer>
  );
};

export default Footer;




