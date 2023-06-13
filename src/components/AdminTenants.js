import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [newTenantData, setNewTenantData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get('/api/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const createTenant = async () => {
    try {
      const response = await axios.post('/api/tenants', newTenantData);
      setTenants([...tenants, response.data]);
      setNewTenantData({
        name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error creating tenant:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewTenantData({
      ...newTenantData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Tenants</h2>
      <div>
        <h3>Create Tenant</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newTenantData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newTenantData.email}
          onChange={handleInputChange}
        />
        <button onClick={createTenant}>Create</button>
      </div>
      <div>
        <h3>List of Tenants</h3>
        <ul>
          {tenants.map(tenant => (
            <li key={tenant.id}>
              Name: {tenant.name}, Email: {tenant.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminTenants;
