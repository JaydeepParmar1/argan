import { useState } from 'react';

export default function TicketForm({ onTicketCreated }) {
  const [formData, setFormData] = useState({ title: '', description: '', categoryId: 1, priority: 'Low' });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const response = await fetch('http://localhost:5000/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData({ title: '', description: '', categoryId: 1, priority: 'Low' }); // Reset form
        onTicketCreated(); // Tell the dashboard to refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h4>Create Ticket</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="mb-2">
          <label className="form-label">Description</label>
          <textarea className="form-control" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>
        <div className="mb-2">
          <label className="form-label">Category</label>
          <select className="form-select" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: parseInt(e.target.value)})}>
            <option value="1">IT</option>
            <option value="2">HR</option>
            <option value="3">Facilities</option>
            <option value="4">Finance</option>
            <option value="5">Access Management</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select className="form-select" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit Ticket</button>
      </form>
    </div>
  );
}