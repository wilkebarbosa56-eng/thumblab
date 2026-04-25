import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {!isAuthenticated ? (
        <LandingPage onStart={() => setIsAuthenticated(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
