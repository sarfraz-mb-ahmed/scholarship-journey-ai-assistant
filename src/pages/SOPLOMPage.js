import React, { useState } from 'react';
import axios from 'axios';

const SOPLOMPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    documentType: 'SOP',
    name: '',
    degree: '',
    field: '',
    country: '',
    university: '',
    previousEducation: '',
    motivation: '',
    reasonForChoice: '',
    careerGoals: '',
    futurePlans: '',
    strengths: '',
    experience: '',
    workExperience: '',
    volunteerWork: '',
    achievements: '',
    personalStory: '',
    limitType: 'words',
    minLimit: 500,
    maxLimit: 1000
  });

  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.degree) newErrors.degree = 'Required';
    if (!formData.field) newErrors.field = 'Required';
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.previousEducation) newErrors.previousEducation = 'Required';
    if (!formData.motivation) newErrors.motivation = 'Required';
    if (!formData.reasonForChoice) newErrors.reasonForChoice = 'Required';
    if (!formData.careerGoals) newErrors.careerGoals = 'Required';
    if (!formData.strengths) newErrors.strengths = 'Required';
    if (!formData.experience) newErrors.experience = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate document
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const prompt = buildPrompt();
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      const text = response.data.candidates[0].content.parts[0].text;
      setGeneratedDoc(text);
    } catch (error) {
      alert(`Error: ${error.response?.data?.error?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Build dynamic prompt
  const buildPrompt = () => {
    return `
      Generate a ${formData.documentType} for ${formData.name} applying for ${formData.degree} in ${formData.field} at ${formData.university || 'a university'} in ${formData.country}.
      
      Requirements:
      - Length: ${formData.minLimit}-${formData.maxLimit} ${formData.limitType}
      - Tone: Professional yet personal
      - Structure: Clear paragraphs with logical flow
      
      Applicant Details:
      1. Personal & Academic:
         - Previous Education: ${formData.previousEducation}
         - University: ${formData.university || 'Not specified'}
      
      2. Motivation & Goals:
         - Motivation: ${formData.motivation}
         - Reason for choice: ${formData.reasonForChoice}
         - Career Goals: ${formData.careerGoals}
         ${formData.futurePlans ? `- Future Plans: ${formData.futurePlans}` : ''}
         - Strengths: ${formData.strengths}
      
      3. Experience:
         - Projects/Research: ${formData.experience}
         ${formData.workExperience ? `- Work Experience: ${formData.workExperience}` : ''}
         ${formData.volunteerWork ? `- Volunteer Work: ${formData.volunteerWork}` : ''}
         ${formData.achievements ? `- Awards: ${formData.achievements}` : ''}
         ${formData.personalStory ? `- Personal Story: ${formData.personalStory}` : ''}
      
      Special Instructions:
      - ${formData.documentType === 'SOP' ? `
        * Start with an engaging hook
        * Highlight academic background
        * Mention specific university resources
        * Include country's progress in ${formData.field}
        * Professional tone` : `
        * Focus on personal motivation
        * Emotional connection to field
        * Cultural exchange benefits
        * Humble and grateful tone`}
    `;
  };

  // UI Components
  const RequiredLabel = ({ children }) => (
    <span className="text-red-500 mr-1">*</span>
  );

  const SectionHeader = ({ title }) => (
    <h3 className="text-lg font-semibold mt-6 mb-3 pb-2 border-b border-[#FDB302]/30 text-[#FDB302]">
      {title}
    </h3>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212059] to-[#0f1029] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-[#FDB302]/20">
        {/* Header */}
        <div className="bg-[#212059] p-6 text-center">
          <h1 className="text-3xl font-bold text-[#FDB302]">Scholarship Journey</h1>
          <p className="text-white/80 mt-2">Professional {formData.documentType} Generator</p>
        </div>

        <div className="p-6 md:p-8">
          {/* Document Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-[#212059]/20 rounded-lg p-1">
              {['SOP', 'LOM'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({...formData, documentType: type})}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${formData.documentType === type 
                    ? 'bg-[#FDB302] text-[#212059]' 
                    : 'text-white hover:bg-[#212059]/50'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal & Academic */}
            <SectionHeader title="🔹 Personal & Academic Information" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Degree Applying For
                </label>
                <input
  type="text"
  value={formData.degree}
  onChange={(e) => setFormData({...formData, degree: e.target.value})}
  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
  placeholder="BS/MS/PhD"
/>
                {errors.degree && <p className="text-red-400 text-sm mt-1">{errors.degree}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Field of Study
                </label>
                <input
                  type="text"
                  value={formData.field}
                  onChange={(e) => setFormData({...formData, field: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  placeholder="Computer Science, Medicine, etc."
                />
                {errors.field && <p className="text-red-400 text-sm mt-1">{errors.field}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  placeholder="Germany, USA, etc."
                />
                {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">University Name</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Previous Education (Degrees with Majors & Universities)
                </label>
                <textarea
                  value={formData.previousEducation}
                  onChange={(e) => setFormData({...formData, previousEducation: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="3"
                />
                {errors.previousEducation && <p className="text-red-400 text-sm mt-1">{errors.previousEducation}</p>}
              </div>
            </div>

            {/* Motivation & Goals */}
            <SectionHeader title="🔹 Motivation & Goals" />
            <div className="space-y-4">
              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Motivation for Choosing This Field
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="3"
                />
                {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Reason for Choosing This Country/University
                </label>
                <textarea
                  value={formData.reasonForChoice}
                  onChange={(e) => setFormData({...formData, reasonForChoice: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="3"
                />
                {errors.reasonForChoice && <p className="text-red-400 text-sm mt-1">{errors.reasonForChoice}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Career Goals
                </label>
                <textarea
                  value={formData.careerGoals}
                  onChange={(e) => setFormData({...formData, careerGoals: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="3"
                />
                {errors.careerGoals && <p className="text-red-400 text-sm mt-1">{errors.careerGoals}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">Future Plans in Your Home Country</label>
                <textarea
                  value={formData.futurePlans}
                  onChange={(e) => setFormData({...formData, futurePlans: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />What Makes You a Strong Candidate? (Skills, Qualities, etc.)
                </label>
                <textarea
                  value={formData.strengths}
                  onChange={(e) => setFormData({...formData, strengths: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="3"
                />
                {errors.strengths && <p className="text-red-400 text-sm mt-1">{errors.strengths}</p>}
              </div>
            </div>

            {/* Experience & Achievements */}
            <SectionHeader title="🔹 Experience & Achievements" />
            <div className="space-y-4">
              <div>
                <label className="block text-white/90 mb-1">
                  <RequiredLabel />Relevant Projects / Research / Internships
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="3"
                />
                {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-white/90 mb-1">Work Experience (if any)</label>
                <textarea
                  value={formData.workExperience}
                  onChange={(e) => setFormData({...formData, workExperience: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-white/90 mb-1">Volunteer Work / Extracurricular Activities</label>
                <textarea
                  value={formData.volunteerWork}
                  onChange={(e) => setFormData({...formData, volunteerWork: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-white/90 mb-1">Awards or Achievements</label>
                <textarea
                  value={formData.achievements}
                  onChange={(e) => setFormData({...formData, achievements: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="2"
                />
              </div>
            </div>

            {/* Other Details */}
            <SectionHeader title="🔹 Other Details" />
            <div className="space-y-4">
              <div>
                <label className="block text-white/90 mb-1">Any Personal Story / Challenges Overcome</label>
                <textarea
                  value={formData.personalStory}
                  onChange={(e) => setFormData({...formData, personalStory: e.target.value})}
                  className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  rows="3"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white/90 mb-1">Length Limit Type</label>
                  <select
  value={formData.limitType}
  onChange={(e) => setFormData({...formData, limitType: e.target.value})}
  className="w-full bg-[#212059] border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
>
  <option value="words">Words</option>
  <option value="characters">Characters</option>
</select>
                </div>

                <div>
                  <label className="block text-white/90 mb-1">Minimum {formData.limitType === 'words' ? 'Words' : 'Characters'}</label>
                  <input
                    type="number"
                    min="1"
                    max={formData.limitType === 'words' ? '1000' : '5000'}
                    value={formData.minLimit}
                    onChange={(e) => setFormData({...formData, minLimit: e.target.value})}
                    className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/90 mb-1">Maximum {formData.limitType === 'words' ? 'Words' : 'Characters'}</label>
                  <input
                    type="number"
                    min={formData.minLimit}
                    max={formData.limitType === 'words' ? '1000' : '5000'}
                    value={formData.maxLimit}
                    onChange={(e) => setFormData({...formData, maxLimit: e.target.value})}
                    className="w-full bg-white/10 border border-[#FDB302]/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#FDB302] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#FDB302] hover:bg-[#FDB302]/90 text-[#212059] shadow-lg hover:shadow-[#FDB302]/50'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  `Generate ${formData.documentType}`
                )}
              </button>
            </div>
          </form>

          {/* Results */}
          {generatedDoc && (
            <div className="mt-10 bg-[#212059]/10 border border-[#FDB302]/20 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#FDB302]">Your Generated {formData.documentType}</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedDoc)}
                  className="flex items-center gap-1 bg-[#FDB302] text-[#212059] px-3 py-1 rounded text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="bg-white/5 p-4 rounded border border-white/10">
                <pre className="whitespace-pre-wrap font-sans text-white/90">{generatedDoc}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOPLOMPage;