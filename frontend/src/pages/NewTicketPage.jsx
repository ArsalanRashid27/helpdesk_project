import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Zaroori: Yahan apna real JWT token daalein
const TEMP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFnZW50IiwiaWF0IjoxNzU5NTk1MzU4LCJleHAiOjE3NTk2ODE3NTh9.GqvxmOFBRr13vDMgS-k6LUoDkYdG-aIxm7OBOinbu5s';
const API_URL = 'http://localhost:5001/api';

const NewTicketPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!TEMP_TOKEN || TEMP_TOKEN === 'YOUR_JWT_TOKEN_HERE') {
      setError('Zaroori: Code me apna JWT token daalein.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/tickets`, 
        { title, description, priority },
        { headers: { 'x-access-token': TEMP_TOKEN } }
      );
      navigate(`/tickets/${response.data.id}`);
    } catch (err) {
      setError('Ticket banane me error. Dobara try karein.');
    }
  };

  return (
    <div>
      <h1>Create New Ticket</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ticket Title" required style={{ padding: '0.5rem' }} />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Ticket Description" required rows="5" style={{ padding: '0.5rem' }}></textarea>
        <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '0.7rem' }}>Create Ticket</button>
      </form>
    </div>
  );
};

export default NewTicketPage;