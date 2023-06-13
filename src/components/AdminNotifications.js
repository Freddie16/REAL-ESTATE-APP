import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Notifications.css'

const AdminNotifications = () => {
  const [tenants, setTenants] = useState([]);
  const [message, setMessage] = useState('');

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

  const sendNotification = async () => {
    if (message.trim() === '') return;

    try {
      await axios.post('/api/notifications', { message });
      setMessage('');
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <div>
        <h3>Send Notification</h3>
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>
        <button onClick={sendNotification}>Send</button>
      </div>
      <div>
        <h3></h3>
        <ul>
          {tenants.map(tenant => (
            <li key={tenant.id}>
              {tenant.name} - {tenant.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminNotifications;
