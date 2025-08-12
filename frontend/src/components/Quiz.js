import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/quizzes/${id}`
      );
      setQuiz(response.data);
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers, answer];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const correctAnswers = quiz.questions.reduce((acc, q, index) => {
        return acc + (q.correctAnswer === updatedAnswers[index] ? 1 : 0);
      }, 0);
      setScore((correctAnswers / quiz.questions.length) * 100);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">{quiz.title}</h1>
      {score === null ? (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h5>{question.questionText}</h5>
              <ul className="list-group">
                {question.options.map((option, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="progress mb-3">
            <div
              className="progress-bar progress-bar-striped bg-success"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.round(progress)}%
            </div>
          </div>
        </>
      ) : (
        <div className="card">
          <div className="card-body text-center">
            <h3>Your Score: {score.toFixed(2)}%</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;