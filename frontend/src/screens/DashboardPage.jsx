import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, chimps, onLogout, onLoadChimps, onCreateChimp, onDeleteChimp }) => {
  const [newChimp, setNewChimp] = useState({ name: '', age: '', bio: '' });

  useEffect(() => {
    onLoadChimps();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChimp(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateChimp = async (e) => {
    e.preventDefault();
    if (!newChimp.name || !newChimp.age) {
        alert('Name and Age are required.');
        return;
    }
    await onCreateChimp({ ...newChimp, age: parseInt(newChimp.age, 10) });
    setNewChimp({ name: '', age: '', bio: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ChimpTrack Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {user.name} ({user.role})!</p>
          </div>
          <div className="space-x-4">
            <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Chimp Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Log a New Chimp</h2>
              <form onSubmit={handleCreateChimp} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g., Koko"
                    value={newChimp.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="e.g., 12"
                    value={newChimp.age}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio / Notes</label>
                  <textarea
                    id="bio"
                    name="bio"
                    placeholder="Initial observations..."
                    value={newChimp.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                  Add Chimp Record
                </button>
              </form>
            </div>
          </div>

          {/* Chimps List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Tracked Population</h2>
                {chimps.length === 0 ? (
                    <p className="text-gray-500">No chimps recorded yet. Add one using the form.</p>
                ) : (
                    <div className="space-y-4">
                    {chimps.map(chimp => (
                        <div key={chimp.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start hover:bg-gray-50 transition">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{chimp.name}</h3>
                                <p className="text-sm text-gray-600">Age: {chimp.age} years | Status: <span className='font-medium'>{chimp.status}</span></p>
                                <p className="text-sm text-gray-500 mt-1 italic">“{chimp.bio}”</p>
                                <p className="text-xs text-gray-400 mt-2">Tracked by: {chimp.researcher?.name || 'N/A'}</p>
                            </div>
                            { user.id === chimp.researcher?.id || user.role === 'admin' ? (
                                <button onClick={() => onDeleteChimp(chimp.id)} className='text-red-500 hover:text-red-700 text-sm font-medium'>Delete</button>
                            ) : null }
                        </div>
                    ))}
                    </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
