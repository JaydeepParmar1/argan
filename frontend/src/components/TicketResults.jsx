import { useState } from 'react';
import PriorityBadge from './PriorityBadge';

export default function TicketResults({ tickets, onTicketClosed, loading }) {
  const [notes, setNotes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const handleNoteChange = (id, text) => {
    setNotes({ ...notes, [id]: text });
  };

  const handleClose = (id) => {
    const noteToSave = notes[id] || 'Resolved without comments.';
    onTicketClosed(id, noteToSave);
  };

  // Filtering Logic
  const filteredTickets = tickets.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(t.ticketid).includes(searchTerm) ||
      (t.categoryname && t.categoryname.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Open'
        ? t.status !== 'Closed'
        : t.status === 'Closed';

    const matchesPriority =
      priorityFilter === 'All' ? true : t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div>
      {/* Control Bar: Search & Filters */}
      <div className="row g-2 mb-3 align-items-center">
        {/* Search Bar */}
        <div className="col-12 col-md-5">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '10px 0 0 10px' }}>
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-custom border-start-0"
              style={{ borderRadius: '0 10px 10px 0' }}
              placeholder="Search tickets by ID, title or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-link text-muted position-absolute end-0 top-50 translate-middle-y z-3"
                style={{ textDecoration: 'none' }}
                onClick={() => setSearchTerm('')}
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="col-12 col-sm-6 col-md-4">
          <div className="btn-group w-100 p-1 bg-light border rounded-3" role="group">
            {['All', 'Open', 'Closed'].map(status => (
              <button
                key={status}
                type="button"
                className={`btn btn-sm rounded-2 fw-semibold ${
                  statusFilter === status ? 'btn-white shadow-sm text-dark bg-white' : 'btn-light text-secondary border-0'
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter Select */}
        <div className="col-12 col-sm-6 col-md-3">
          <select
            className="form-select form-select-custom"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-responsive border rounded-3 overflow-hidden bg-white shadow-sm">
        <table className="table table-hover table-modern mb-0 align-middle">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th>Ticket Summary</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th style={{ width: '280px' }}>Action & Resolution</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-muted">
                  <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                  Loading tickets...
                </td>
              </tr>
            ) : filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="text-muted mb-2">
                    <i className="bi bi-inbox fs-1 text-secondary opacity-50"></i>
                  </div>
                  <h6 className="fw-semibold mb-1">No tickets found</h6>
                  <p className="small text-secondary mb-3">
                    {tickets.length === 0
                      ? 'No service tickets exist yet. Create your first ticket on the left.'
                      : 'No tickets match your search or filter criteria.'}
                  </p>
                  {(searchTerm || statusFilter !== 'All' || priorityFilter !== 'All') && (
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                        setPriorityFilter('All');
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filteredTickets.map(t => (
                <tr key={t.ticketid}>
                  <td className="fw-bold text-secondary">#{t.ticketid}</td>
                  <td>
                    <div className="fw-semibold text-dark">{t.title}</div>
                    {t.description && (
                      <small className="text-muted d-block text-truncate" style={{ maxWidth: '300px' }}>
                        {t.description}
                      </small>
                    )}
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border fw-normal px-2.5 py-1 rounded-2">
                      <i className="bi bi-tag me-1 text-primary"></i>
                      {t.categoryname || 'General'}
                    </span>
                  </td>
                  <td>
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td>
                    {t.status === 'Closed' ? (
                      <span className="badge-soft-status-closed d-inline-flex align-items-center gap-1">
                        <i className="bi bi-check-circle-fill text-muted"></i> Closed
                      </span>
                    ) : (
                      <span className="badge-soft-status-open d-inline-flex align-items-center gap-1">
                        <span className="pulse-indicator" style={{ width: '7px', height: '7px' }}></span> Open
                      </span>
                    )}
                  </td>
                  <td>
                    {t.status !== 'Closed' ? (
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add resolution note..."
                          value={notes[t.ticketid] || ''}
                          onChange={e => handleNoteChange(t.ticketid, e.target.value)}
                        />
                        <button
                          className="btn btn-outline-success d-flex align-items-center gap-1"
                          onClick={() => handleClose(t.ticketid)}
                          title="Mark as Resolved/Closed"
                        >
                          <i className="bi bi-check2"></i>
                          <span>Resolve</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-muted small d-flex align-items-center gap-1">
                        <i className="bi bi-check-all text-success fs-6"></i>
                        <span>Resolved</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="d-flex align-items-center justify-content-between mt-3 text-secondary small px-1">
        <span>Showing {filteredTickets.length} of {tickets.length} total tickets</span>
        <span>Smart Service Desk Engine</span>
      </div>
    </div>
  );
}