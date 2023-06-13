import React, { useState } from 'react';
import axios from 'axios';

const UserPayRent = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    if (paymentAmount.trim() === '' || paymentMethod === '') return;

    try {
      await axios.post('/api/payments', { amount: paymentAmount, method: paymentMethod });
      setPaymentSuccess(true);
    } catch (error) {
      console.error('Error processing payment:', error);
      setPaymentSuccess(false);
    }
  };

  return (
    <div>
      <h2>Pay Rent</h2>
      <div>
        <input
          type="number"
          placeholder="Payment Amount"
          value={paymentAmount}
          onChange={e => setPaymentAmount(e.target.value)}
        />
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="mobile_money">Mobile Money</option>
        </select>
        <button onClick={handlePayment}>Pay Now</button>
      </div>
      {paymentSuccess && <p>Payment successful!</p>}
    </div>
  );
};

export default UserPayRent;

