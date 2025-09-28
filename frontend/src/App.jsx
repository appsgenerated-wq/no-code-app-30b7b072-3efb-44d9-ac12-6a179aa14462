import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [chimps, setChimps] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          if (currentUser) {
            setUser(currentUser);
            setCurrentScreen('dashboard');
            console.log('✅ [APP] User session found.');
          }
        } catch (error) {
          console.log('ℹ️ [APP] No active user session.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed.');
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setChimps([]);
    setCurrentScreen('landing');
  };

  const loadChimps = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('Chimp').find({
        include: ['researcher'],
        sort: { createdAt: 'desc' },
      });
      setChimps(response.data);
    } catch (error) {
      console.error('Failed to load chimps:', error);
    }
  };

  const createChimp = async (chimpData) => {
    try {
      const newChimp = await manifest.from('Chimp').create(chimpData);
      // Refetch chimps to get the latest list with relations
      loadChimps();
    } catch (error) {
      console.error('Failed to create chimp:', error);
      alert(`Error creating chimp: ${error.message}`);
    }
  };
  
  const deleteChimp = async (chimpId) => {
    if(window.confirm('Are you sure you want to delete this record?')) {
        try {
            await manifest.from('Chimp').delete(chimpId);
            loadChimps();
        } catch (error) {
            console.error('Failed to delete chimp:', error);
            alert(`Error: You may not have permission to delete this record.`);
        }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">{backendConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {currentScreen === 'landing' ? (
        <LandingPage onLogin={handleLogin} />
      ) : user ? (
        <DashboardPage
          user={user}
          chimps={chimps}
          onLogout={handleLogout}
          onLoadChimps={loadChimps}
          onCreateChimp={createChimp}
          onDeleteChimp={deleteChimp}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen">Loading...</div>
      )}
    </div>
  );
}

export default App;
