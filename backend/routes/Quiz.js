const express = require('express');
const router = express.Router();
const quizController = require('../controllers/Quiz');

// Route for instructors to create a quiz
router.post('/instructors/create-quiz', quizController.createQuiz);

// Route for learners to submit a quiz and get feedback
router.post('/learners/submit-quiz', quizController.submitQuiz);

module.exports = router;
