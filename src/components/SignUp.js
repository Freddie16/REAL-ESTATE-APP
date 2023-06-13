import React, { useState } from 'react';
import '../css/SignUp.css'; // Import the CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    signupType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here with form data
    console.log('Form Data:', formData);
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      password: '',
      signupType: '',
    });
  };

  const handleForgotPassword = () => {
    // Implement your "Forgot Password" functionality here
    // For example, you could show a modal or navigate to a password recovery page
    console.log('Forgot Password clicked');
  };

  return (
    
    <div className="signup-container">
        <h2>Sign Up</h2>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="signupType">Signup Type</label>
            <select
              id="signupType"
              value={formData.signupType}
              onChange={handleChange}
              required
            >
              <option value="">Select signup type</option>
              <option value="propertyOwner">Landlord</option>
              <option value="residentOwner">Agent</option>
              <option value="residentOwner">Caretaker</option>
              <option value="residentOwner">Tenant</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          <button onClick={handleForgotPassword}>Forgot Password</button>
        </p>
      </div>
      <div className="signup-image">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Signup;
