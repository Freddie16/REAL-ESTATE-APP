import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRentPayments = () => {
  const [rentPayments, setRentPayments] = useState([]);

  useEffect(() => {
    fetchRentPayments();
  }, []);

  const fetchRentPayments = async () => {
    try {
      const response = await axios.get('/api/rent-payments');
      setRentPayments(response.data);
    } catch (error) {
      console.error('Error fetching rent payments:', error);
    }
  };

  return (
    <div>
      <h2>Admin Rent Payments</h2>
      <div>
        <h3>List of Rent Payments</h3>
        <table>
          <thead>
            <tr>
              <th>Tenant</th>
              <th>House</th>
              <th>Payment Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rentPayments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.tenantName}</td>
                <td>{payment.houseNumber}</td>
                <td>{payment.paymentDate}</td>
                <td>{payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRentPayments;
