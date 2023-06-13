import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from './components/AdminDashboard';
import AdminEstates from './components/AdminEstates';
import AdminHouses from './components/AdminHouses';
import AdminConfiguration from './components/AdminConfiguration';
import AdminNotifications from './components/AdminNotifications';
import AdminTenants from './components/AdminTenants';
import AdminRentPayments from './components/AdminRentPayments';

import UserRentPayments from './components/UserRentPayments';
import UserPayRent from './components/UserPayRent';
import UserVacantHouses from './components/UserVacantHouses';
import UserLease from './components/UserLease';
import UserChat from './components/UserChat';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FAQ from './components/Faq';

function App() {
  const myRef = useRef(null);

  // Example usage of useRef
  const handleClick = () => {
    myRef.current.focus();
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Admin Panel */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/estates" element={<AdminEstates />} />
        <Route path="/admin/houses" element={<AdminHouses />} />
        <Route path="/admin/configuration" element={<AdminConfiguration />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/tenants" element={<AdminTenants />} />
        <Route path="/admin/rent-payments" element={<AdminRentPayments />} />

        {/* User App */}
        <Route path="/" element={<HomePage />} />
        <Route path="/user/rent-payments" element={<UserRentPayments />} />
        <Route path="/user/pay-rent" element={<UserPayRent />} />
        <Route path="/user/vacant-houses" element={<UserVacantHouses />} />
        <Route path="/user/lease" element={<UserLease />} />
        <Route path="/user/chat" element={<UserChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<FAQ/>} />
      
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
