import React, { useState, useEffect } from 'react';
import '../css/Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faShieldAlt, faMoneyBill, faChartLine, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import UserChat from './UserChat'

const HomePage = () => {
  const [searchType, setSearchType] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false); // Added state variable

  const images = [
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg',
    'https://images.pexels.com/photos/4469133/pexels-photo-4469133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5524164/pexels-photo-5524164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleButtonClick = (type) => {
    setSearchType(type);
  };

  const handleExitClick = () => {
    setSearchType(null);
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>My Real Estate App</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/signup" activeClassName="active">SignUp</NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active">Login</NavLink>
            </li>
            <li>
              <NavLink to="/admin/dashboard" activeClassName="active">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/faq" activeClassName="active">FAQs</NavLink>
            </li>
            <li>
              <button onClick={() => setIsChatOpen(!isChatOpen)}>
                <span className="chat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 2.81 1.08 5.37 2.83 7.29l-1.42 1.42c-.78-.64-1.47-1.39-2.05-2.24C.96 16.32 0 14.21 0 12c0-6.63 5.37-12 12-12s12 5.37 12 12-5.37 12-12 12c-2.21 0-4.26-.59-6-1.62-.85-.58-1.6-1.27-2.24-2.05l1.42-1.42C6.63 18.92 9.19 20 12 20c5.52 0 10-4.48 10-10S17.52 0 12 0zm-2 16h-1v-2h1v2zm3 0h-1v-2h1v2zm3 0h-1v-2h1v2z"/>
                  </svg>
                </span>
                <span>Chat</span>
              </button>
            </li>
          </ul>
          {isChatOpen && (
        <div className="chat-container">
          <UserChat />
        </div>
      )}
        </nav>

        <p></p>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Your Real Estate Management App</h2>
          <p>Manage your estates, houses, tenants, and rent payments with ease.</p>
          <p>Get started by navigating through the available features in the navigation menu.</p>
          <img src={images[imageIndex]} alt="Hero" className="hero-image" />
        </div>
        <div className="hero-buttons">
          <button onClick={() => handleButtonClick('buy')}>Buy</button>
          <button onClick={() => handleButtonClick('sell')}>Sell</button>
          <button onClick={() => handleButtonClick('rent')}>Rent</button>
        </div>
        {searchType && (
          <div className="search-form">
            <input type="text" placeholder="Enter location" />
            <select>
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </select>
            <input type="number" placeholder="Max Price" />
            <button>Search</button>
            <button onClick={handleExitClick}>Exit</button>
          </div>
        )}
      </section>

      <section className="features">
        <h1 className="features-heading">Why Choose Us?</h1>
        <div className="feature">
          <FontAwesomeIcon icon={faCheck} className="feature-icon" />
          <h3>Easy to use</h3>
          <p>Our app is designed to be easy to use, even for first-time users.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faCog} className="feature-icon" />
          <h3>Powerful features</h3>
          <p>Our app includes a wide range of features to help you manage your real estate.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
          <h3>Secure</h3>
          <p>Your data is safe and secure with our app.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faMoneyBill} className="feature-icon" />
          <h3>Payments Integration</h3>
          <p>Seamlessly integrate payment processing for rent and property transactions.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
          <h3>Updated Integration</h3>
          <p>Stay up-to-date with the latest real estate market trends and data.</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faHeadset} className="feature-icon" />
          <h3>24-Hour Consultation</h3>
          <p>Get expert advice and support anytime, anywhere.</p>
        </div>
      </section>

      <section className="my-real-estate-review">
        <div className="review-heading">
          <h2>What Customers Say About Us</h2>
        </div>
        <div className="review-content">
          <div className="review">
            <h3>Managing tenants has been made fairly easy</h3>
            <p>My Real Estate has helped me make countless sales and place wonderful tenants and families in affordable homes</p>
            <p className="review-author">Agnes Wanjiku</p>
            <p className="review-date">13-04-23</p>
          </div>
          <div className="review">
            <h3>Monitoring Estates,houses and tenants at ease</h3>
            <p>My Real Estate has helped me make countless sales and place wonderful tenants and families in affordable homes</p>
            <p className="review-author">Murigi Fred</p>
            <p className="review-date">01-01-23</p>
          </div>
          <div className="review">
            <h3>Tenant financial management has finally been automated</h3>
            <p>My Real Estate has helped me make countless sales and place wonderful tenants and families in affordable homes</p>
            <p className="review-author">FreddieMurigi</p>
            <p className="review-date">07-24-23</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;





