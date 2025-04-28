// src/CVAnalyzer.js
import React, { useState } from "react";

const CVAnalyzer = () => {
  const [cvFile, setCvFile] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleAnalyze = () => {
    if (!cvFile) {
      alert("Please upload a CV file.");
      return;
    }

    setIsLoading(true);
    // Perform the analysis (Here, it's simulated)
    setTimeout(() => {
      setIsLoading(false);
      // Simulated feedback after analysis
      setFeedback("Your CV looks good, but consider adding more details to your work experience and skills sections.");
    }, 2000);
  };

  const handleConvertATS = () => {
    if (!cvFile) {
      alert("Please upload a CV file.");
      return;
    }

    // Simulate conversion to ATS-friendly format
    alert("Your CV has been converted to an ATS-friendly format. Download it here.");
  };

  const handleConvertEuropass = () => {
    if (!cvFile) {
      alert("Please upload a CV file.");
      return;
    }

    // Simulate Europass conversion
    alert("Your CV has been converted to Europass format. Download it here.");
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">CV Analyzer</h1>
      <div className="space-y-4">
        <input
          type="file"
          accept=".pdf, .docx, .jpg, .png"
          onChange={handleFileChange}
          className="file-input"
        />

        <button onClick={handleAnalyze} className="submit-btn">
          Analyze CV
        </button>

        {isLoading ? (
          <p>Loading... Please wait while we analyze your CV.</p>
        ) : (
          feedback && <div className="feedback">{feedback}</div>
        )}

        <div className="mt-4">
          <button onClick={handleConvertATS} className="submit-btn">
            Convert to ATS-Friendly CV
          </button>

          <button onClick={handleConvertEuropass} className="submit-btn mt-2">
            Convert to Europass CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVAnalyzer;
