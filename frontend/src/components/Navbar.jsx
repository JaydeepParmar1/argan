export default function Navbar() {
  return (
    <header className="app-navbar mb-4 sticky-top">
      <div className="container-fluid max-w-7xl mx-auto d-flex align-items-center justify-content-between">
        {/* Brand Section */}
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '42px', height: '42px' }}>
            <i className="bi bi-headset fs-4"></i>
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-dark">SmartDesk</h5>
            <small className="text-secondary">Smart Employee Service Desk & Ticketing</small>
          </div>
        </div>
      </div>
    </header>
  );
}
