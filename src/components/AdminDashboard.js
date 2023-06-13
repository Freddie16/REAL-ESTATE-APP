import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../css/Dashboard.css';

const AdminDashboard = () => {
  const [estateCount, setEstateCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [rentPayments, setRentPayments] = useState([]);
  const [unpaidRentPayments, setUnpaidRentPayments] = useState([]);
  const [houseCount, setHouseCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard');

      setEstateCount(response.data.estateCount);
      setTenantCount(response.data.tenantCount);
      setRentPayments(response.data.rentPayments);
      setHouseCount(response.data.houseCount);

      const unpaidRentPayments = rentPayments.filter(payment => !payment.isPaid);
      setUnpaidRentPayments(unpaidRentPayments);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Estate Count: {estateCount}</h3>
        <h3>House Count: {houseCount}</h3>
        <h3>Tenant Count: {tenantCount}</h3>

        <h3>Rent Payments Per Month:</h3>
        <ul>
          {rentPayments.map(payment => (
            <li key={payment.id}>
              Tenant: {payment.tenantName}, Month: {payment.month}, Amount: {payment.amount}
            </li>
          ))}
        </ul>
        <h3>Unpaid Rent Payments:</h3>
        <ul>
          {unpaidRentPayments.map(payment => (
            <li key={payment.id}>
              Tenant: {payment.tenantName}, Month: {payment.month}, Amount: {payment.amount}
            </li>
          ))}
        </ul>
      </div>

      <nav className="admin-menu">
        <ul>
          <li>
            <NavLink to="/admin/estates" activeClassName="active">
              Estates
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/houses" activeClassName="active">
              Houses
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/notifications" activeClassName="active">
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/tenants" activeClassName="active">
              Tenants
            </NavLink>
          </li>
          <li className="dropdown">
            <span className="dropdown-toggle"></span>
            <ul className="dropdown-menu" style={{ marginTop: '10px' }}>
              <li>
                <NavLink to="/user/rent-payments" activeClassName="active">
                  Rent Payments
                </NavLink>
              </li>
              <li>
                <NavLink to="/user/pay-rent" activeClassName="active">
                  Pay Rent
                </NavLink>
              </li>
              <li>
                <NavLink to="/user/lease" activeClassName="active">
                  Lease
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
