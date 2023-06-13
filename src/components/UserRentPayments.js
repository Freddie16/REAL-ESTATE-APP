import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRentPayments = () => {
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
      <h2>Rent Payments</h2>
      <div>
        <h3>List of Rent Payments</h3>
        <table>
          <thead>
            <tr>
              <th>House</th>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rentPayments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.houseNumber}</td>
                <td>{payment.paymentDate}</td>
                <td>{payment.amount}</td>
                <td>{payment.paid ? 'Paid' : 'Not Paid'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRentPayments;
