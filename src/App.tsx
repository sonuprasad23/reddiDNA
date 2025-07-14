import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import WelcomePage from './components/WelcomePage';
import ResultsPage from './components/ResultsPage';
export function App() {
  const [username, setUsername] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const handleGeneratePersona = (inputUsername: string) => {
    setUsername(inputUsername);
    setIsGenerated(true);
  };
  return <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        <Header />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<WelcomePage onGeneratePersona={handleGeneratePersona} />} />
            <Route path="/results" element={isGenerated ? <ResultsPage username={username} /> : <Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>;
}