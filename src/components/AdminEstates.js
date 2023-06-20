import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';
import '../css/Estates.css'; // Import the CSS file for styling

function AdminEstates() {
  const [estates, setEstates] = useState([]);
  const [newEstateName, setNewEstateName] = useState('');
  const [newEstateUnits, setNewEstateUnits] = useState('');
  const [newEstateCity, setNewEstateCity] = useState('');
  const [newEstateWaterRate, setNewEstateWaterRate] = useState('');
  const [newEstateElectricityRate, setNewEstateElectricityRate] = useState('');
  const [newEstatePaybill, setNewEstatePaybill] = useState('');
  const [newEstateVacancies, setNewEstateVacancies] = useState('');

  useEffect(() => {
    fetchEstates();
  }, []);

  const fetchEstates = async () => {
    try {
      const response = await axios.get('https://rentalmanagement-9g1a.onrender.com/admin/estates');
      setEstates(response.data);
    } catch (error) {
      console.error('Error fetching estates:', error);
    }
  };

  const createEstate = async () => {
    if (newEstateName.trim() === '') return;

    try {
      const response = await axios.post('https://rentalmanagement-9g1a.onrender.com/admin/estates', {
        name: newEstateName,
        units: newEstateUnits,
        city: newEstateCity,
        waterRate: newEstateWaterRate,
        electricityRate: newEstateElectricityRate,
        paybill: newEstatePaybill,
        vacancies: newEstateVacancies
      });

      const newEstate = response.data;
      setEstates((prevEstates) => [...prevEstates, newEstate]);
      setNewEstateName('');
      setNewEstateUnits('');
      setNewEstateCity('');
      setNewEstateWaterRate('');
      setNewEstateElectricityRate('');
      setNewEstatePaybill('');
      setNewEstateVacancies('');
    } catch (error) {
      console.error('Error creating estate:', error);
    }
  };

  const getTotalEstates = () => {
    return estates.length;
  };

  const getTotalVacancies = () => {
    let totalVacancies = 0;
    estates.forEach((estate) => {
      totalVacancies += parseInt(estate.vacancies);
    });
    return totalVacancies;
  };

  return (
    <div className="admin-estates-container">
      <div className="admin-estates-content">
        <div className="admin-estates-summary">
          <h3>Total Estates: {getTotalEstates()}</h3>
          <h3>Total Vacancies: {getTotalVacancies()}</h3>
        </div>
        <h2 className="admin-estates-heading">Estates</h2>
        <div className="create-estate-section">
          <h3 className="create-estate-heading">Create Estate</h3>
          <input
            className="estate-input"
            type="text"
            placeholder="Estate Name"
            value={newEstateName}
            onChange={(e) => setNewEstateName(e.target.value)}
          />
          <input
            className="estate-input"
            type="text"
            placeholder="Number of Units"
            value={newEstateUnits}
            onChange={(e) => setNewEstateUnits(e.target.value)}
          />
          <input
            className="estate-input"
            type="text"
            placeholder="City"
            value={newEstateCity}
            onChange={(e) => setNewEstateCity(e.target.value)}
          />
          <input
            className="estate-input"
            type="text"
            placeholder="Water Rate (KES)"
            value={newEstateWaterRate}
            onChange={(e) => setNewEstateWaterRate(e.target.value)}
          />
          <input
            className="estate-input"
            type="text"
            placeholder="Electricity Rate (KES)"
            value={newEstateElectricityRate}
            onChange={(e) => setNewEstateElectricityRate(e.target.value)}
          />
          <input
            className="estate-input"
            type="text"
            placeholder="M-Pesa Paybill"
            value={newEstatePaybill}
            onChange={(e) => setNewEstatePaybill(e.target.value)}
          />
          <input
            className="estate-input"
            type="text"
            placeholder="Vacancies"
            value={newEstateVacancies}
            onChange={(e) => setNewEstateVacancies(e.target.value)}
          />
          <button className="create-estate-button" onClick={createEstate}>
            Create
          </button>
        </div>
        <div>
          <h3 className="estates-list-heading">List of Estates</h3>
          <ul className="estates-list">
            {estates.map((estate) => (
              <li className="estate-item" key={estate.id}>
                {estate.name} - Water Rate: {estate.waterRate} KES, Electricity Rate: {estate.electricityRate} KES
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminEstates;




