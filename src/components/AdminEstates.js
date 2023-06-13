import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminEstates () {
  const [estates, setEstates] = useState([]);
  const [newEstateName, setNewEstateName] = useState('');

  useEffect(() => {
    fetchEstates();
  }, []);

  const fetchEstates = async () => {
    try {
      const response = await axios.get('/api/estates');
      setEstates(response.data);
    } catch (error) {
      console.error('Error fetching estates:', error);
    }
  };

  const createEstate = async () => {
    if (newEstateName.trim() === '') return;

    try {
      const response = await axios.post('/api/estates', { name: newEstateName });
      setEstates([...estates, response.data]);
      setNewEstateName('');
    } catch (error) {
      console.error('Error creating estate:', error);
    }
  };

  return (
    <div>
      <h2>Estates</h2>
      <div>
        <h3>Create Estate</h3>
        <input
          type="text"
          placeholder="Estate Name"
          value={newEstateName}
          onChange={e => setNewEstateName(e.target.value)}
        />
        <button onClick={createEstate}>Create</button>
      </div>
      <div>
        <h3>List of Estates</h3>
        <ul>
          {estates.map(estate => (
            <li key={estate.id}>{estate.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminEstates;
