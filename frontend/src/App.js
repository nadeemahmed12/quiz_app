import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import AddQuiz from "./components/AddQuiz";
import Quiz from  "./components/Quiz";
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/quiz/:id" element={<Quiz />} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;