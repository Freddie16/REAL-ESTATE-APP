import React, { useState, useEffect } from 'react';
import '../css/Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faChartLine, faHeadset, faCheck, faCog, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const [searchType, setSearchType] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');

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
  }, [images]);

  const handleButtonClick = (type) => {
    setSearchType(type);
  };

  const handleExitClick = () => {
    setSearchType(null);
    setLocation('');
    setBudget('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform the search logic using the location and budget values
    if (searchType === 'buy') {
      console.log('Searching for buying property:', location, budget);
      // Perform search for buying property
    } else if (searchType === 'sell') {
      console.log('Searching for selling property:', location, budget);
      // Perform search for selling property
    } else if (searchType === 'rent') {
      console.log('Searching for renting property:', location, budget);
      // Perform search for renting property
    }
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>My Real Estate App</h1>
        <nav>
          <ul>
            <li>
              <div className="nav-link-container">
                <NavLink to="/signup" activeClassName="active">
                  SignUp
                </NavLink>
              </div>
            </li>
            <li>
              <div className="nav-link-container">
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </div>
            </li>
            <li>
              <div className="nav-link-container">
                <NavLink to="/admin/dashboard" activeClassName="active">
                  Dashboard
                  <span className="arrow-icon">&#9660;</span>
                </NavLink>
              </div>
            </li>
            <li>
              <div className="nav-link-container">
                <NavLink to="/faq" activeClassName="active">
                  FAQs
                  <span className="arrow-icon">&#9660;</span>
                </NavLink>
              </div>
            </li>
            <li>
              <button onClick={() => setIsChatOpen(!isChatOpen)}>
                <span className="chat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 2.81 1.08 5.37 2.83 7.29l-.01.01L6.7 19l1.41-1.41C9.63 17.32 10.74 18 12 18c5.52 0 10-4.48 10-10S17.52 2 12 2zm2 13h-1v-2h1v2zm3 0h-1v-2h1v2zm2-5H5V8h14v2zm0-4H5V4h14v2z" />
                  </svg>
                </span>
                <span>Chat</span>
              </button>
            </li>
          </ul>
        </nav>
        {isChatOpen && (
          <div className="chat-container">
            {/* Render the chat component */}
          </div>
        )}
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Your Real Estate Management App</h2>
          <p>Manage your estates, houses, tenants, and rent payments with ease.</p>
          <p>Get started by navigating through the available features in the navigation menu.</p>
          <img src={images[imageIndex]} alt="Hero" className="hero-image" />
        </div>
        <div className="hero-buttons">
          <button onClick={() => handleButtonClick('buy')}>
            <FontAwesomeIcon icon={faMoneyBill} />
            Buy Property
          </button>
          <button onClick={() => handleButtonClick('sell')}>
            <FontAwesomeIcon icon={faChartLine} />
            Sell Property
          </button>
          <button onClick={() => handleButtonClick('rent')}>
            <FontAwesomeIcon icon={faHeadset} />
            Rent Property
          </button>
        </div>
        {searchType && (
          <div className="search-form">
            <h3>Search for {searchType === 'buy' ? 'Buying' : searchType === 'sell' ? 'Selling' : 'Renting'} Property</h3>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="number"
                placeholder="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <button type="submit">Search</button>
              <button onClick={handleExitClick}>Exit</button>
            </form>
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
            <h3>Monitoring Estates, houses, and tenants at ease</h3>
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

