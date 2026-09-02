import { useState, useEffect } from 'react';
import TicketResults from './TicketResults';

export default function Dashboard({ refreshTrigger }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tickets')
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error(err));
  }, [refreshTrigger]);

  const closeTicket = async (id, note) => {
    await fetch(`http://localhost:5000/tickets/${id}/close`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note })
    });
    setTickets(tickets.map(t => t.ticketid === id ? { ...t, status: 'Closed' } : t));
  };

  // Calculate Tickets by Category for Reporting
  const categoryStats = tickets.reduce((acc, ticket) => {
    acc[ticket.categoryname] = (acc[ticket.categoryname] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Ticket Dashboard</h4>
      
      {/* Metric Cards */}
      <div className="row g-2 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white p-2 text-center shadow-sm">
            <h6>Total Tickets</h6>
            <h2>{tickets.length}</h2>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card bg-light p-2 shadow-sm">
            <h6 className="text-center text-muted mb-2">Tickets by Category</h6>
            <div className="d-flex justify-content-around flex-wrap">
              {Object.entries(categoryStats).map(([cat, count]) => (
                <span key={cat} className="badge bg-secondary m-1 fs-6">
                  {cat}: {count}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TicketResults tickets={tickets} onTicketClosed={closeTicket} />
    </div>
  );
}