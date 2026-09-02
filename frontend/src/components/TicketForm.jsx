import { useState } from 'react';

export default function TicketForm({ onTicketCreated }) {
  const [formData, setFormData] = useState({ title: '', description: '', categoryId: 1, priority: 'Low' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { id: 1, name: 'IT Support' },
    { id: 2, name: 'Human Resources' },
    { id: 3, name: 'Facilities' },
    { id: 4, name: 'Finance' },
    { id: 5, name: 'Access Management' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ title: '', description: '', categoryId: 1, priority: 'Low' });
        setShowSuccess(true);
        onTicketCreated();
        setTimeout(() => setShowSuccess(false), 3500);
      }
    } catch (err) {
      console.error('Error submitting ticket:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-card mb-4">
      <div className="card-header-custom d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-plus-circle-fill text-primary fs-5"></i>
          <h5 className="mb-0 fw-bold">Create Support Ticket</h5>
        </div>
        <span className="badge bg-light text-secondary border">New Request</span>
      </div>

      <div className="card-body-custom">
        {showSuccess && (
          <div className="alert alert-success border-0 bg-success-subtle text-success d-flex align-items-center gap-2 mb-3 py-2 px-3 rounded-3" role="alert">
            <i className="bi bi-check-circle-fill fs-5"></i>
            <div>Ticket submitted successfully!</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Issue Title */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Ticket Title <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-secondary">
                <i className="bi bi-pencil-square"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-custom border-start-0"
                placeholder="e.g. Cannot access VPN network"
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control form-control-custom"
              rows="3"
              placeholder="Describe the issue, steps to reproduce, or requirements..."
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Category</label>
            <select
              className="form-select form-select-custom"
              value={formData.categoryId}
              onChange={e => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Level with Colour Indication */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary mb-2">
              Priority Level <span className="text-muted fw-normal">(Select one)</span>
            </label>
            <div className="priority-selector-group">
              {['Low', 'Medium', 'High'].map(p => {
                const isActive = formData.priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    className={`priority-chip-btn ${isActive ? `active-${p}` : ''}`}
                    onClick={() => setFormData({ ...formData, priority: p })}
                  >
                    {p === 'Low' && <i className="bi bi-arrow-down-circle-fill"></i>}
                    {p === 'Medium' && <i className="bi bi-dash-circle-fill"></i>}
                    {p === 'High' && <i className="bi bi-exclamation-triangle-fill"></i>}
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <i className="bi bi-send-fill"></i>
                <span>Submit Ticket</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}