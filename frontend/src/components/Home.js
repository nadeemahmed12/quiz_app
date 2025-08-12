import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Home() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    axios
      .get("https://quiz-app-lnbi.onrender.com")
      .then((res) => setQuizzes(res.data));
  }, []);
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="mb-5">Select a Quiz</h1>
      <div className="row w-100">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="col-md-4 mb-4 d-flex align-items-stretch"
          >
            <div className="card w-100 text-center">
              <div className="card-body">
                <h5 className="card-title">{quiz.title}</h5>
                <p className="card-text">{quiz.description}</p>
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="btn btn-primary w-100"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add-quiz" className="btn btn-success mt-4">
        Add New Quiz
      </Link>
    </div>
  );
}
export default Home;
