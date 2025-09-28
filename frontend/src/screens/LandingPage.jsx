import React from 'react';
import config from '../constants';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          ChimpTrack
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Modern tracking and observation for primatology research. Powered by Manifest.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onLogin('admin@manifest.build', 'admin')}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View Admin Demo
          </button>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Admin Panel
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-8">Default login: admin@manifest.build / admin</p>
      </div>
    </div>
  );
};

export default LandingPage;
