import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SOPLOMPage from './pages/SOPLOMPage';
import CVAnalyzerPage from './pages/CVAnalyzerPage';
import ScholarshipPage from './pages/ScholarshipPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sop-lom" element={<SOPLOMPage />} />
        <Route path="/cv-analyzer" element={<CVAnalyzerPage />} />
        <Route path="/scholarship-finder" element={<ScholarshipPage />} />
      </Routes>
    </Router>
  );
}

export default App;
