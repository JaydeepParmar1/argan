export default function PriorityBadge({ priority }) {
  if (priority === 'High') {
    return (
      <span className="badge bg-danger text-white px-2.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1 shadow-sm">
        <i className="bi bi-exclamation-triangle-fill"></i>
        <span>High</span>
      </span>
    );
  }

  if (priority === 'Medium') {
    return (
      <span className="badge bg-warning text-dark px-2.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1 shadow-sm">
        <i className="bi bi-dash-circle-fill"></i>
        <span>Medium</span>
      </span>
    );
  }

  // Low Priority
  return (
    <span className="badge bg-success text-white px-2.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1 shadow-sm">
      <i className="bi bi-arrow-down-circle-fill"></i>
      <span>Low</span>
    </span>
  );
}