import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AddQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: [],
    correctAnswer: "",
  });
  const [currentOption, setCurrentOption] = useState("");
  const navigate = useNavigate();

  const addOption = () => {
    if (currentOption && !currentQuestion.options.includes(currentOption)) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, currentOption],
      });
      setCurrentOption("");
    }
  };

  const addQuestion = () => {
    if (
      currentQuestion.questionText &&
      currentQuestion.options.length > 0 &&
      currentQuestion.correctAnswer
    ) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        questionText: "",
        options: [],
        correctAnswer: "",
      });
      setCurrentOption(""); // Reset currentOption after adding question
    } else {
      alert("Please fill in all question fields.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !type) {
      alert("Please fill out all required fields for the quiz.");
      return;
    }

    try {
      const newQuiz = { title, description, type, questions };
      await axios.post("https://quiz-app-lnbi.onrender.com/api/quizzes/", newQuiz);
      navigate("/");
    } catch (error) {
      console.error("Failed to create quiz", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Quiz Details</h5>
            <div className="mb-3">
              <label className="form-label">Quiz Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <input
                type="text"
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Add Question</h5>
            <div className="mb-3">
              <label className="form-label">Question Text</label>
              <input
                type="text"
                className="form-control"
                value={currentQuestion.questionText}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    questionText: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Options</label>
              <input
                type="text"
                className="form-control"
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={addOption}
              >
                Add Option
              </button>
              <ul className="list-group mt-2">
                {currentQuestion.options.map((option, index) => (
                  <li key={index} className="list-group-item">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <label className="form-label">Correct Answer</label>
              <input
                type="text"
                className="form-control"
                value={currentQuestion.correctAnswer}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    correctAnswer: e.target.value,
                  })
                }
              />
            </div>
            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={addQuestion}
            >
              Add Question
            </button>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Current Questions</h5>
              <ul className="list-group">
                {questions.map((question, index) => (
                  <li key={index} className="list-group-item">
                    <h5>{question.questionText}</h5>
                    <ul>
                      {question.options.map((option, idx) => (
                        <li key={idx}>{option}</li>
                      ))}
                    </ul>
                    <p>
                      <strong>Correct Answer:</strong> {question.correctAnswer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default AddQuiz;
