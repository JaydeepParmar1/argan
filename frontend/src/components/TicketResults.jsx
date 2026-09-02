import { useState } from 'react';
import PriorityBadge from './PriorityBadge';

export default function TicketResults({ tickets, onTicketClosed }) {
  const [notes, setNotes] = useState({});

  const handleNoteChange = (id, text) => {
    setNotes({ ...notes, [id]: text });
  };

  const handleClose = (id) => {
    const noteToSave = notes[id] || 'Resolved without comments.';
    onTicketClosed(id, noteToSave);
  };

  return (
    <div className="table-responsive mt-4">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action & Resolution Note</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.ticketid}>
              <td>{t.ticketid}</td>
              <td>{t.title}</td>
              <td>{t.categoryname}</td>
              <td><PriorityBadge priority={t.priority} /></td>
              <td>{t.status}</td>
              <td>
                {t.status !== 'Closed' ? (
                  <div className="input-group input-group-sm">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Add note..." 
                      onChange={(e) => handleNoteChange(t.ticketid, e.target.value)}
                    />
                    <button className="btn btn-outline-danger" onClick={() => handleClose(t.ticketid)}>Close</button>
                  </div>
                ) : (
                  <span className="text-muted small">Resolved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}