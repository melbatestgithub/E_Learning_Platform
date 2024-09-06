const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

// Create a quiz
router.post('/quiz', async (req, res) => {
    try {
        const { title, questions } = req.body;
        const newQuiz = new Quiz({ title, questions });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Error creating quiz', error: error.message });
    }
});

// Create a lesson
router.post('/lesson', async (req, res) => {
    try {
        const { title, description, content, courseId, quizId } = req.body;

        const newLesson = new Lesson({
            title,
            description,
            content,
            courseId,
            quiz: quizId ? quizId : null
        });

        await newLesson.save();
        res.status(201).json({ message: 'Lesson created successfully', lesson: newLesson });
    } catch (error) {
        console.error('Error creating lesson:', error);
        res.status(500).json({ message: 'Error creating lesson', error: error.message });
    }
});

module.exports = router;
