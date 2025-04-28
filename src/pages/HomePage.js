import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (card) => {
    setActiveCard(card);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1029] to-[#212059] flex items-center justify-center p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-[#FDB302]/10 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-[#FDB302]/15 blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-[#212059]/30 blur-xl"></div>
      </div>

      {!activeCard ? (
        // Initial welcome screen
        <div className="text-center z-10 animate-fade-in">
          <div className="glass-card p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-[#FDB302] mb-2">Welcome to</h1>
            <h2 className="text-2xl text-white mb-6">Scholarship Journey AI Assistant</h2>
            <p className="text-white/80 mb-8">
              Your personalized guide to winning international scholarships and studying abroad
            </p>
            <button
              onClick={() => setActiveCard('explore')}
              className="px-8 py-3 bg-[#FDB302] hover:bg-[#FDB302]/90 text-[#212059] font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-[#FDB302]/30"
            >
              Click to Explore
            </button>
          </div>
        </div>
      ) : (
        // Cards screen
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 w-full max-w-6xl">
          {/* SOP/LOM Card */}
          <Link
            to="/sop-lom"
            className={`glass-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl cursor-pointer transition-all duration-500 ${activeCard === 'sop' ? 'transform scale-105' : ''}`}
            onMouseEnter={() => setActiveCard('sop')}
            onMouseLeave={() => setActiveCard('explore')}
          >
            <div className="bg-[#FDB302]/10 p-4 rounded-xl inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FDB302]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">SOP/LOM Generator</h3>
            <p className="text-white/70 mb-4">
              Craft perfect Statements of Purpose and Letters of Motivation tailored to your dream university
            </p>
            <div className="text-[#FDB302] font-medium">Start Creating →</div>
          </Link>

          {/* CV Analyzer Card */}
          <Link
            to="/cv-analyzer"
            className={`glass-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl cursor-pointer transition-all duration-500 ${activeCard === 'cv' ? 'transform scale-105' : ''}`}
            onMouseEnter={() => setActiveCard('cv')}
            onMouseLeave={() => setActiveCard('explore')}
          >
            <div className="bg-[#FDB302]/10 p-4 rounded-xl inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FDB302]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">CV Analyzer</h3>
            <p className="text-white/70 mb-4">
              Get AI-powered feedback to optimize your resume for scholarship applications
            </p>
            <div className="text-[#FDB302] font-medium">Analyze Now →</div>
          </Link>

          {/* Scholarship Finder Card */}
          <Link
            to="/scholarship-finder"
            className={`glass-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl cursor-pointer transition-all duration-500 ${activeCard === 'scholarship' ? 'transform scale-105' : ''}`}
            onMouseEnter={() => setActiveCard('scholarship')}
            onMouseLeave={() => setActiveCard('explore')}
          >
            <div className="bg-[#FDB302]/10 p-4 rounded-xl inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FDB302]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m8-8v13m-16-8v13M3 5h18M3 5a2 2 0 012-2h14a2 2 0 012 2M3 5l6 4.5M21 5l-6 4.5M3 11l6 4.5M21 11l-6 4.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Scholarship Finder</h3>
            <p className="text-white/70 mb-4">
              Discover perfect scholarships matching your profile from 50+ countries
            </p>
            <div className="text-[#FDB302] font-medium">Find Scholarships →</div>
          </Link>
        </div>
      )}
    </div>
  );
}