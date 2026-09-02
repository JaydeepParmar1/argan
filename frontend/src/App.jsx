import { useState } from 'react';
import Navbar from './components/Navbar';
import TicketForm from './components/TicketForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-main">
      <Navbar />

      <main className="container-fluid px-3 px-md-4 px-lg-5 mb-5 flex-grow-1">
        <div className="row g-4">
          {/* Create Ticket Panel */}
          <div className="col-12 col-lg-4">
            <TicketForm onTicketCreated={() => setRefresh(r => r + 1)} />
          </div>

          {/* Main Dashboard & List Panel */}
          <div className="col-12 col-lg-8">
            <Dashboard refreshTrigger={refresh} />
          </div>
        </div>
      </main>

      <footer className="mt-auto py-3 bg-white border-top text-center text-secondary small">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} Smart Employee Service Desk. Built for high performance & elegance.</span>
        </div>
      </footer>
    </div>
  );
}