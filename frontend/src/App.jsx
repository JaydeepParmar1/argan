import { useState } from 'react';
import TicketForm from './components/TicketForm';
import Dashboard from './components/Dashboard';

export default function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Smart Employee Service Desk</h2>
      <div className="row">
        <div className="col-lg-4">
          <TicketForm onTicketCreated={() => setRefresh(refresh + 1)} />
        </div>
        <div className="col-lg-8">
          <Dashboard refreshTrigger={refresh} />
        </div>
      </div>
    </div>
  );
}