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
      {/* Rest of your footer content */}
    </footer>
  );
};

export default Footer;




