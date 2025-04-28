import React, { useState } from 'react';
import axios from 'axios';

export default function ScholarshipPage() {
  const [degreeLevel, setDegreeLevel] = useState('');
  const [country, setCountry] = useState('');
  const [matchedScholarships, setMatchedScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userBackground, setUserBackground] = useState('');

  const handleDegreeChange = (e) => setDegreeLevel(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleBackgroundChange = (e) => setUserBackground(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMatchedScholarships([]);

    try {
      if (!degreeLevel || !country) {
        throw new Error('Please select both degree level and country');
      }

      const prompt = `As an international scholarship expert, recommend 5-10 fully funded scholarships for ${degreeLevel} programs in ${country} that don't require IELTS. 
      Applicant background: ${userBackground || 'not specified'}.
      
      Format response as valid JSON exactly like this:
      {
        "scholarships": [
          {
            "title": "Scholarship Name",
            "degree": "Degree Level",
            "country": "Country",
            "description": "Detailed description (120+ characters)",
            "link": "https://official.website",
            "financialCoverage": "Fully Funded/Partial",
            "deadline": "Month Year or Rolling"
          }
        ]
      }`;

      // Correct API endpoint with working model name
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;

      const response = await axios.post(
        apiUrl,
        {
          contents: [{
            parts: [{ text: prompt }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from API');
      }

      const responseText = response.data.candidates[0].content.parts[0].text;
      const jsonStart = responseText.indexOf('{');
      const jsonEnd = responseText.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('Could not extract JSON from response');
      }

      const jsonString = responseText.substring(jsonStart, jsonEnd);
      const result = JSON.parse(jsonString);
      
      if (!result.scholarships || !Array.isArray(result.scholarships)) {
        throw new Error('Invalid scholarship data format');
      }

      const validScholarships = result.scholarships.filter(scholarship => 
        scholarship.title && scholarship.description
      );

      if (validScholarships.length === 0) {
        throw new Error('No valid scholarships found. Please try different criteria.');
      }

      setMatchedScholarships(validScholarships);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.error?.message || 
               err.message || 
               'Failed to fetch scholarships. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212059] to-[#0f1029] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-[#FDB302]/20">
        <div className="bg-[#212059] p-6 text-center">
          <h1 className="text-3xl font-bold text-[#FDB302]">AI Scholarship Finder</h1>
          <p className="text-white/80 mt-2">Get personalized scholarship recommendations</p>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="degree" className="block text-white/90 mb-1">Degree Level*</label>
                <select
                  id="degree"
                  value={degreeLevel}
                  onChange={handleDegreeChange}
                  className="w-full bg-[#212059] border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div>
                <label htmlFor="country" className="block text-white/90 mb-1">Country*</label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full bg-[#212059] border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  placeholder="e.g. Germany, Canada, Japan"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="background" className="block text-white/90 mb-1">
                Your Background (Optional)
              </label>
              <textarea
                id="background"
                value={userBackground}
                onChange={handleBackgroundChange}
                className="w-full bg-[#212059] border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                placeholder="e.g. Computer Science student with 3.8 GPA, research experience in AI"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 font-bold rounded-lg transition-colors ${
                isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#FDB302] hover:bg-[#FDB302]/90 text-[#212059]'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching with AI...
                </span>
              ) : (
                'Find Scholarships'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 text-red-300 rounded-lg">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
              <div className="mt-3 p-3 bg-[#212059]/50 rounded">
                <p className="font-medium text-yellow-300">Complete Setup Checklist:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                  <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">Google Cloud Console</a></li>
                  <li>Enable billing for your project (required even with free credits)</li>
                  <li>Search for and enable "Generative Language API"</li>
                  <li>Create an API key in "Credentials" section</li>
                  <li>Add API key to your .env file: REACT_APP_GEMINI_API_KEY=your_key_here</li>
                  <li>Restart your development server</li>
                </ol>
              </div>
              <button 
                onClick={() => setError('')}
                className="mt-3 px-4 py-2 bg-red-500/30 text-white rounded-lg hover:bg-red-500/40"
              >
                Dismiss
              </button>
            </div>
          )}

{matchedScholarships.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-[#FDB302] mb-4">
      {matchedScholarships.length} Scholarship{matchedScholarships.length > 1 ? 's' : ''} Found
    </h2>
    <div className="space-y-6">
      {matchedScholarships.map((scholarship, index) => (
        <div key={index} className="bg-[#0f1029]/80 border border-[#FDB302]/20 p-6 rounded-lg hover:border-[#FDB302]/40 transition-colors">
          <h3 className="text-xl font-bold text-[#FDB302]">{scholarship.title}</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
            <div className="bg-[#0f1029] p-2 rounded border border-[#FDB302]/20">
              <p className="font-semibold text-[#FDB302]">Degree</p>
              <p className="text-white/90">{scholarship.degree || 'Not specified'}</p>
            </div>
            <div className="bg-[#0f1029] p-2 rounded border border-[#FDB302]/20">
              <p className="font-semibold text-[#FDB302]">Country</p>
              <p className="text-white/90">{scholarship.country || 'Multiple'}</p>
            </div>
            <div className="bg-[#0f1029] p-2 rounded border border-[#FDB302]/20">
              <p className="font-semibold text-[#FDB302]">Funding</p>
              <p className="text-white/90">{scholarship.financialCoverage || 'Varies'}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-white/90">{scholarship.description}</p>
          </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {scholarship.deadline && (
                        <span className="px-3 py-1 bg-[#FDB302]/20 text-[#FDB302] rounded-full text-sm">
                          Deadline: {scholarship.deadline}
                        </span>
                      )}
                      {scholarship.link && (
                        <a
                          href={scholarship.link.startsWith('http') ? scholarship.link : `https://${scholarship.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#FDB302] text-[#212059] rounded-lg font-medium hover:bg-[#FDB302]/90 transition-colors"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}