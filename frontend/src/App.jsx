import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import TicketsListPage from './pages/TicketsListPage';
import NewTicketPage from './pages/NewTicketPage';
import TicketDetailPage from './pages/TicketDetailPage';

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/tickets">HelpDesk Mini</Link>
        <Link to="/tickets/new" className="new-ticket-btn">New Ticket</Link>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/tickets" />} />
          <Route path="/tickets" element={<TicketsListPage />} />
          <Route path="/tickets/new" element={<NewTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;