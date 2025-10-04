import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Zaroori: Yahan apna real JWT token daalein
const TEMP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFnZW50IiwiaWF0IjoxNzU5NTk1MzU4LCJleHAiOjE3NTk2ODE3NTh9.GqvxmOFBRr13vDMgS-k6LUoDkYdG-aIxm7OBOinbu5s';
const API_URL = 'http://localhost:5001/api';

const TicketDetailPage = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      if (!TEMP_TOKEN || TEMP_TOKEN === 'YOUR_JWT_TOKEN_HERE') {
        setError('Zaroori: Code me apna JWT token daalein.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/tickets/${id}`, {
          headers: { 'x-access-token': TEMP_TOKEN }
        });
        setTicket(response.data);
      } catch (err) {
        setError('Ticket details fetch nahi kar paaye.');
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) return <p>Details load ho rahi hain...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!ticket) return <p>Ticket nahi mila.</p>;

  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
      <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2>Comments</h2>
        {ticket.comments.map(comment => (
          <div key={comment.id} style={{ border: '1px solid #ddd', padding: '0.5rem', marginBottom: '0.5rem' }}>
            <p><strong>{comment.user_name}:</strong> {comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketDetailPage;