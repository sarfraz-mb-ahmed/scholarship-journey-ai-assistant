// src/ScholarshipFinder.js
import React, { useState } from "react";

// Sample scholarship data (this can be fetched from a database or API in a real-world scenario)
const scholarships = [
  {
    title: "University of Transilvania, Romania – Fully Funded Scholarship 2025",
    country: "Romania",
    field: "All Subjects",
    level: "Bachelor, Master, PhD",
    eligibility: "No IELTS, No Bank Statement Needed",
    benefits: "100% Tuition-Free Education, Monthly Stipend, Free Hostel",
    applyLink: "https://scholarshipjourney.pk/romania-scholarship",
  },
  {
    title: "Cuban Government Undergraduate Medical Scholarship 2025",
    country: "Cuba",
    field: "Medical",
    level: "Undergraduate",
    eligibility: "70%+ Marks in FSc Pre-Medical, Valid USAT-M Test Score",
    benefits: "Full Tuition Fee Coverage, Free Accommodation, Monthly Stipend",
    applyLink: "https://scholarshipjourney.pk/cuba-medical-scholarship",
  },
  {
    title: "Türkiye Burslari Scholarship 2025",
    country: "Turkey",
    field: "Medical, Engineering, Science, and more",
    level: "Undergraduate, Master's, PhD",
    eligibility: "Min 75% Marks, Below 30 years for MS, 35 years for PhD",
    benefits: "Full Tuition Fee Coverage, Monthly Stipend, Free Accommodation",
    applyLink: "https://scholarshipjourney.pk/turkey-scholarship",
  },
  // Add more scholarships as needed
];

const ScholarshipFinder = () => {
  const [country, setCountry] = useState("");
  const [field, setField] = useState("");
  const [level, setLevel] = useState("");
  const [matchingScholarships, setMatchingScholarships] = useState([]);

  const handleSearch = () => {
    // Filter scholarships based on the user's input
    const filteredScholarships = scholarships.filter((scholarship) => {
      return (
        (country === "" || scholarship.country === country) &&
        (field === "" || scholarship.field.includes(field)) &&
        (level === "" || scholarship.level.includes(level))
      );
    });
    setMatchingScholarships(filteredScholarships);
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Scholarship Matchmaker</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="country" className="block mb-2 text-lg font-semibold">
            Country of Origin:
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input-field"
            placeholder="Enter your country"
          />
        </div>

        <div>
          <label htmlFor="field" className="block mb-2 text-lg font-semibold">
            Field of Study:
          </label>
          <input
            type="text"
            id="field"
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="input-field"
            placeholder="Enter your field of study"
          />
        </div>

        <div>
          <label htmlFor="level" className="block mb-2 text-lg font-semibold">
            Degree Level:
          </label>
          <input
            type="text"
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input-field"
            placeholder="Enter degree level (e.g., Bachelor's, Master's)"
          />
        </div>

        <button
          onClick={handleSearch}
          className="submit-btn"
        >
          Find Scholarships
        </button>

        {matchingScholarships.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Matching Scholarships:</h2>
            <ul className="mt-2 space-y-2">
              {matchingScholarships.map((scholarship, index) => (
                <li key={index} className="border p-4 rounded-lg bg-gray-100">
                  <h3 className="text-2xl font-semibold">{scholarship.title}</h3>
                  <p><strong>Country:</strong> {scholarship.country}</p>
                  <p><strong>Field:</strong> {scholarship.field}</p>
                  <p><strong>Level:</strong> {scholarship.level}</p>
                  <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                  <p><strong>Benefits:</strong> {scholarship.benefits}</p>
                  <a
                    href={scholarship.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Apply Now
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4">No scholarships found. Please modify your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ScholarshipFinder;
