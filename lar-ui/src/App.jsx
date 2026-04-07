import { useState, useEffect } from 'react';
import Navbar from './components/nav/Navbar';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BasicTabs from './components/Tabs';
import PresidentsLetter from './pages/presidentsLetter/PresidentsLetter';
import LetterEditor from './pages/letterEditor/LetterEditor';
import HomePage from './pages/home/HomePage';
import TopInputForm from './pages/topinputform/TopInputForm';
import TopOutput from './pages/topoutput/TopOutput';
import LarCriteria from './pages/larCriteria/LarCriteria';
import Proforma from './pages/proforma/Proforma';
import LARPlatformPOC from './pages/LARPlatformPOC';
import beazerLogo from './assets/beazerhomelogo.png';
import './App.css';

const AUTH_KEY = 'lar_authenticated';

function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true'
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authenticated) sessionStorage.setItem(AUTH_KEY, 'true');
  }, [authenticated]);

  if (authenticated) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'calance' || password === 'Calance') {
      setAuthenticated(true);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
      fontFamily: '"Segoe UI", Arial, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '360px',
        textAlign: 'center'
      }}>
        <img src={beazerLogo} alt="Beazer Homes" style={{ height: '36px', marginBottom: '24px' }} />
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#213547', marginBottom: '4px' }}>
          LAR Platform
        </h2>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
          Enter the access code to continue
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Access code"
            autoFocus
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `1px solid ${error ? '#d32f2f' : '#ccc'}`,
              borderRadius: '2px',
              fontSize: '14px',
              outline: 'none',
              marginBottom: '8px',
              boxSizing: 'border-box'
            }}
          />
          {error && (
            <p style={{ color: '#d32f2f', fontSize: '12px', marginBottom: '8px' }}>
              Incorrect access code
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              background: '#9F2C32',
              color: '#fff',
              border: 'none',
              borderRadius: '2px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <PasswordGate>
    <div className='overflow-x-hidden'>
      <Router>
        {/* Define routes for different pages */}
        <Routes>
          {/* POC route — standalone, no navbar/tabs overlay */}
          <Route path="/poc" exact element={<LARPlatformPOC />} />

          {/* Existing routes with navbar */}
          <Route path="*" element={
            <>
              <Navbar />
              <BasicTabs />
              <Routes>
                <Route path="/" exact element={<Navigate to="/poc" replace />} />
                <Route path="/presidents-letter" exact element={<PresidentsLetter />} />
                <Route path="/letter-editor" exact element={<LetterEditor />} />
                <Route path="/home" exact element={<HomePage />} />
                <Route path="/topinputform" exact element={<TopInputForm />} />
                <Route path="/topoutput" exact element={<TopOutput />} />
                <Route path="/larcriteria" exact element={<LarCriteria />} />
                <Route path="/proforma" exact element={<Proforma />} />
              </Routes>
            </>
          } />
        </Routes>
      </Router>
    </div>
    </PasswordGate>
  );
}

export default App;
