import { useState, useEffect } from 'react';
import TicketResults from './TicketResults';

export default function Dashboard({ refreshTrigger }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/tickets')
      .then(res => res.json())
      .then(data => {
        setTickets(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [refreshTrigger]);

  const closeTicket = async (id, note) => {
    try {
      await fetch(`http://localhost:5000/tickets/${id}/close`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });
      setTickets(tickets.map(t => t.ticketid === id ? { ...t, status: 'Closed' } : t));
    } catch (err) {
      console.error('Error closing ticket:', err);
    }
  };

  // Metrics computation
  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status !== 'Closed').length;
  const closedCount = tickets.filter(t => t.status === 'Closed').length;
  const highPriorityCount = tickets.filter(t => t.priority === 'High' && t.status !== 'Closed').length;

  const categoryStats = tickets.reduce((acc, ticket) => {
    const catName = ticket.categoryname || 'Uncategorized';
    acc[catName] = (acc[catName] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="custom-card">
      <div className="card-header-custom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h4 className="mb-1 fw-bold">Ticket Operations Dashboard</h4>
          <p className="text-secondary small mb-0">Monitor, filter, and resolve incoming service requests</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-light text-dark border px-3 py-2">
            <i className="bi bi-clock-history me-1 text-primary"></i> Real-time Sync
          </span>
        </div>
      </div>

      <div className="card-body-custom">
        {/* Metric KPI Grid */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="kpi-card d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small fw-semibold d-block mb-1">Total Tickets</span>
                <h3 className="fw-bold mb-0 text-dark">{loading ? '-' : totalCount}</h3>
              </div>
              <div className="kpi-icon-wrapper bg-primary-subtle text-primary">
                <i className="bi bi-ticket-detailed"></i>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="kpi-card d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small fw-semibold d-block mb-1">Open Tickets</span>
                <h3 className="fw-bold mb-0 text-primary">{loading ? '-' : openCount}</h3>
              </div>
              <div className="kpi-icon-wrapper bg-info-subtle text-info">
                <i className="bi bi-hourglass-split"></i>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="kpi-card d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small fw-semibold d-block mb-1">Resolved</span>
                <h3 className="fw-bold mb-0 text-success">{loading ? '-' : closedCount}</h3>
              </div>
              <div className="kpi-icon-wrapper bg-success-subtle text-success">
                <i className="bi bi-check-circle"></i>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="kpi-card d-flex align-items-center justify-content-between">
              <div>
                <span className="text-secondary small fw-semibold d-block mb-1">High Priority</span>
                <h3 className="fw-bold mb-0 text-danger">{loading ? '-' : highPriorityCount}</h3>
              </div>
              <div className="kpi-icon-wrapper bg-danger-subtle text-danger">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown bar */}
        {Object.keys(categoryStats).length > 0 && (
          <div className="p-3 bg-light rounded-3 border mb-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="small fw-bold text-uppercase text-secondary" style={{ letterSpacing: '0.05em' }}>
                <i className="bi bi-grid-fill me-1 text-primary"></i> Category Distribution
              </span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {Object.entries(categoryStats).map(([cat, count]) => (
                <div key={cat} className="bg-white border rounded-pill px-3 py-1.5 d-flex align-items-center gap-2 shadow-sm">
                  <span className="small fw-semibold text-dark">{cat}</span>
                  <span className="badge bg-primary rounded-pill">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tickets Grid & Filters */}
        <TicketResults tickets={tickets} onTicketClosed={closeTicket} loading={loading} />
      </div>
    </div>
  );
}