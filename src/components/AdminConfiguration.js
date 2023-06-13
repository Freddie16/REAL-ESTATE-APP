import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function AdminConfiguration () {
  const rentPaymentDateRef = useRef(null);
  const houseRentAmountRef = useRef(null);

  const [rentPaymentDates, setRentPaymentDates] = useState([]);
  const [houseRents, setHouseRents] = useState([]);
  const [newRentPaymentDate, setNewRentPaymentDate] = useState('');
  const [newHouseRent, setNewHouseRent] = useState({ houseId: '', rentAmount: '' });
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetchRentPaymentDates();
    fetchHouseRents();
    fetchHouses();
  }, []);

  const fetchRentPaymentDates = async () => {
    try {
      const response = await axios.get('/api/rent-payment-dates');
      setRentPaymentDates(response.data);
    } catch (error) {
      console.error('Error fetching rent payment dates:', error);
    }
  };

  const fetchHouseRents = async () => {
    try {
      const response = await axios.get('/api/house-rents');
      setHouseRents(response.data);
    } catch (error) {
      console.error('Error fetching house rents:', error);
    }
  };

  const fetchHouses = async () => {
    try {
      const response = await axios.get('/api/houses');
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const addRentPaymentDate = async () => {
    if (newRentPaymentDate.trim() === '') return;

    try {
      const response = await axios.post('/api/rent-payment-dates', { date: newRentPaymentDate });
      setRentPaymentDates([...rentPaymentDates, response.data]);
      setNewRentPaymentDate('');
      rentPaymentDateRef.current.value = '';
    } catch (error) {
      console.error('Error adding rent payment date:', error);
    }
  };

  const addHouseRent = async () => {
    try {
      const response = await axios.post('/api/house-rents', newHouseRent);
      setHouseRents([...houseRents, response.data]);
      setNewHouseRent({ houseId: '', rentAmount: '' });
      houseRentAmountRef.current.value = '';
    } catch (error) {
      console.error('Error adding house rent:', error);
    }
  };

  const handleHouseRentChange = (e) => {
    setNewHouseRent({
      ...newHouseRent,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Admin Configuration</h2>
      <div>
        <h3>Rent Payment Dates</h3>
        <ul>
          {rentPaymentDates.map(date => (
            <li key={date.id}>{date.date}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Rent Payment Date"
          value={newRentPaymentDate}
          onChange={e => setNewRentPaymentDate(e.target.value)}
          ref={rentPaymentDateRef}
        />
        <button onClick={addRentPaymentDate}>Add</button>
      </div>
      <div>
        <h3>House Rents</h3>
        <ul>
          {houseRents.map(rent => (
            <li key={rent.id}>
              House: {rent.houseNumber}, Rent: {rent.rentAmount}
            </li>
          ))}
        </ul>
        <select name="houseId" value={newHouseRent.houseId} onChange={handleHouseRentChange}>
          <option value="">Select House</option>
          {houses.map(house => (
            <option key={house.id} value={house.id}>{house.houseNumber}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Rent Amount"
          name="rentAmount"
          value={newHouseRent.rentAmount}
          onChange={handleHouseRentChange}
          ref={houseRentAmountRef}
        />
        <button onClick={addHouseRent}>Add</button>
      </div>
    </div>
  );
};
 

