import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserVacantHouses = () => {
  const [vacantHouses, setVacantHouses] = useState([]);

  useEffect(() => {
    fetchVacantHouses();
  }, []);

  const fetchVacantHouses = async () => {
    try {
      const response = await axios.get('/api/vacant-houses');
      setVacantHouses(response.data);
    } catch (error) {
      console.error('Error fetching vacant houses:', error);
    }
  };

  return (
    <div>
      <h2>Vacant Houses</h2>
      <div>
        <h3>List of Vacant Houses</h3>
        <ul>
          {vacantHouses.map(house => (
            <li key={house.id}>
              Estate: {house.estateName}, House: {house.houseNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserVacantHouses;
