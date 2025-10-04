import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Zaroori: Yahan apna real JWT token daalein jo Postman se login karke milega
const TEMP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFnZW50IiwiaWF0IjoxNzU5NTk1MzU4LCJleHAiOjE3NTk2ODE3NTh9.GqvxmOFBRr13vDMgS-k6LUoDkYdG-aIxm7OBOinbu5s'; 

const API_URL = 'http://localhost:5001/api';

const TicketsListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      if (!TEMP_TOKEN || TEMP_TOKEN === 'YOUR_JWT_TOKEN_HERE') {
        setError('Zaroori: Code me apna JWT token daalein.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/tickets`, {
          headers: { 'x-access-token': TEMP_TOKEN }
        });
        setTickets(response.data);
      } catch (err) {
        setError('Tickets fetch nahi kar paaye. Kya backend server chal raha hai?');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) return <p>Tickets load ho rahe hain...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>All Tickets</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <Link to={`/tickets/${ticket.id}`} key={ticket.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', background: 'white' }}>
                <h3>{ticket.title}</h3>
                <p>Status: {ticket.status} | Priority: {ticket.priority}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Koi ticket nahi mila.</p>
        )}
      </div>
    </div>
  );
};

export default TicketsListPage;