import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserVacantHouses from './UserVacantHouses';
import '../css/Houses.css';

const AdminHouses = () => {
  const [houses, setHouses] = useState([]);
  const [newHouseData, setNewHouseData] = useState({
    estateId: '',
    houseNumber: '',
    rentAmount: '',
    houseName: '',
  });
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    fetchHouses();
    fetchEstates();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('/api/houses');
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const fetchEstates = async () => {
    try {
      const response = await axios.get('/api/estates');
      setEstates(response.data);
    } catch (error) {
      console.error('Error fetching estates:', error);
    }
  };

  const createHouse = async () => {
    try {
      const response = await axios.post('/api/houses', newHouseData);
      setHouses([...houses, response.data]);
      setNewHouseData({
        estateId: '',
        houseNumber: '',
        rentAmount: '',
        houseName: '',
      });
    } catch (error) {
      console.error('Error creating house:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewHouseData({
      ...newHouseData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="admin-houses">
      <h2>Houses</h2>
      <div>
        <h3>Create House</h3>
        <div className="select-wrapper">
          <select name="estateId" value={newHouseData.estateId} onChange={handleInputChange}>
            <option value="">Select Estate</option>
            {estates.map((estate) => (
              <option key={estate.id} value={estate.id}>
                {estate.name}
              </option>
            ))}
          </select>
          <span className="select-arrow"></span>
        </div>
        <input
          type="text"
          placeholder="House Name"
          name="houseName"
          value={newHouseData.houseName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="House Number"
          name="houseNumber"
          value={newHouseData.houseNumber}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Rent Amount"
          name="rentAmount"
          value={newHouseData.rentAmount}
          onChange={handleInputChange}
        />
        <button onClick={createHouse}>Create</button>
      </div>
      <div>
        <h3>List of Houses</h3>
        <ul>
          {houses.map((house) => (
            <li key={house.id}>
              Estate: {house.estateName}, House Name: {house.houseName}, House Number: {house.houseNumber}, Rent: {house.rentAmount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3></h3>
        <UserVacantHouses />
      </div>
    </div>
  );
};

export default AdminHouses;
