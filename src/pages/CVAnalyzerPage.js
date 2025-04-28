import { useState, useRef } from 'react';
import axios from 'axios';

const CVAnalyzerPage = () => {
  const [textContent, setTextContent] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const textAreaRef = useRef();

  // Analyze CV content using Gemini API
  const analyzeCVContent = async (content) => {
    if (!content.trim()) {
      setError('Please enter your CV content first');
      return null;
    }

    setIsLoading(true);
    setError('');

    try {
      const analysisPrompt = `Analyze this CV content and provide specific feedback in JSON format with these keys: 
      "issues" (array of strings), "suggestions" (array of strings).
      Be very specific to the actual content. If the CV is empty or invalid, say so.
      
      CV Content:
      ${content.substring(0, 10000)}`;

      const analysisResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: analysisPrompt }] }] }
      );

      const analysisText = analysisResponse.data.candidates[0].content.parts[0].text;
      let analysisResult;
      
      try {
        const jsonStart = analysisText.indexOf('{');
        const jsonEnd = analysisText.lastIndexOf('}') + 1;
        analysisResult = JSON.parse(analysisText.substring(jsonStart, jsonEnd));
      } catch (e) {
        analysisResult = {
          issues: ['The CV content could not be properly analyzed. Please check the formatting.'],
          suggestions: ['Ensure your CV has clear sections for Work Experience, Education, and Skills.']
        };
      }

      return analysisResult;
    } catch (err) {
      console.error("Analysis error:", err);
      setError('Failed to analyze CV. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle manual text analysis
  const handleTextAnalysis = async () => {
    const content = textContent.trim();
    if (!content) {
      setError('Please paste your CV content first');
      return;
    }

    const analysisResult = await analyzeCVContent(content);
    if (analysisResult) {
      setAnalysis(analysisResult);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1029] to-[#212059] py-10 px-4">
      <div className="max-w-4xl mx-auto glass-card p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold text-[#FDB302] mb-2">Professional CV Analyzer</h1>
        <p className="text-white/80 mb-6">
          Paste your CV content below to get optimization recommendations
        </p>

        {/* Text Input Area */}
        <div className="mb-6">
          <label className="block text-white/90 mb-2">
            Paste your CV content here:
          </label>
          <textarea
            ref={textAreaRef}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="w-full h-40 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
            placeholder="Paste your CV content here..."
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleTextAnalysis}
          disabled={isLoading || !textContent.trim()}
          className={`mb-6 px-6 py-2 rounded-lg font-bold ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FDB302] hover:bg-[#FDB302]/90 text-[#212059]'} ${!textContent.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze CV'}
        </button>

        {/* Analysis Results */}
        {analysis && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#FDB302] mb-3">Analysis Results</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-500/10 p-4 rounded-lg">
                <h3 className="font-bold text-red-300 mb-2">Issues Found</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {analysis.issues.map((issue, i) => (
                    <li key={i} className="text-white/90">{issue}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-500/10 p-4 rounded-lg">
                <h3 className="font-bold text-green-300 mb-2">Optimization Suggestions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {analysis.suggestions.map((suggestion, i) => (
                    <li key={i} className="text-white/90">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 text-red-300 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVAnalyzerPage;