import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchChatMessages();
  }, []);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get('/api/chat-messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post('/api/chat-messages', {
        message: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const email = 'freddiemurigi@gmail.com';
  const phoneNumber = '+254722565543';
  const socialMediaHandles = {
    twitter: 'https://twitter.com/FreddieMurigi',
    facebook: 'https://www.facebook.com/fred.kabatha',
    instagram: 'https://www.instagram.com/freddie_murigijr/',
  };
  const subject = 'Chat Support';

  return (
    <div>
      <h2>Contact Us</h2>
      <p>
        For immediate assistance, you can chat with our support team. Our representatives are available to help you
        with any questions or concerns you may have.
      </p>
      <p>
        You can also reach us via email or phone if you prefer:
        <br />
        Email: <a href={`mailto:${email}`}><FontAwesomeIcon icon={faEnvelope} /> {email}</a>
        <br />
        Phone: <a href={`tel:${phoneNumber}`}><FontAwesomeIcon icon={faPhone} /> {phoneNumber}</a>
      </p>
      <p>
        Connect with us on social media for updates and announcements:
        <br />
        Twitter: <a href={`https://twitter.com/${socialMediaHandles.twitter}`}>{socialMediaHandles.twitter}</a>
        <br />
        Facebook: <a href={`https://www.facebook.com/${socialMediaHandles.facebook}`}>{socialMediaHandles.facebook}</a>
        <br />
        Instagram: <a href={`https://www.instagram.com/${socialMediaHandles.instagram}`}>{socialMediaHandles.instagram}</a>
      </p>
      <p>
        If you have a specific subject matter, please mention it when initiating the chat session.
        <br />
        Subject: {subject}
      </p>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default UserChat;


