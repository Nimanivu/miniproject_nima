import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import WritingTraining from "./pages/WritingTraining";
import ReadingTraining from "./pages/ReadingTraining";
import LearningTraining from "./pages/LearningTraining";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/writing" element={<WritingTraining />} />
        <Route path="/reading" element={<ReadingTraining />} />
        <Route path="/learningtraining" element={<LearningTraining />} />
      </Routes>
    </Router>
  );
}

export default App;


