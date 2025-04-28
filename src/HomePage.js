// src/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-8">Welcome to Scholarship Journey AI Assistant</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* SOP/LOM Generator Card */}
          <Link to="/sop-lom" className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">SOP/LOM Generator</h2>
              <p className="text-lg">Generate your Statement of Purpose or Motivation Letter with ease!</p>
            </div>
          </Link>
          
          {/* CV Analyzer Card */}
          <Link to="/cv-analyzer" className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">CV Analyzer</h2>
              <p className="text-lg">Analyze and improve your CV for ATS compatibility.</p>
            </div>
          </Link>
          
          {/* Scholarship Finder Card */}
          <Link to="/scholarship-finder" className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Scholarship Finder</h2>
              <p className="text-lg">Find scholarships that match your profile and interests!</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
