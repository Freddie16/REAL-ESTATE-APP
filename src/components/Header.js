import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import UserChat from "./UserChat";
import '../css/Header.css';

const Header = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <nav>
       {/* Added heading */}
      <ul style={{ display: "none" }}> {/* Hide the navigation links */}
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
          <button onClick={handleChatToggle}>
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
        <div className="chat-container" style={{ display: "none" }}> {/* Hide the chat */}
          <UserChat />
        </div>
      )}
    </nav>
  );
      }  

export default Header;
