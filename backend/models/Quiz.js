const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
});
const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  questions: [questionSchema],
});
module.exports = mongoose.model("Quiz", quizSchema);