const Quiz = require('../models/Quiz');
const Lesson = require('../models/Lesson');

// Controller to create a quiz for a lesson
exports.createQuiz = async (req, res) => {
    try {
        const { lessonId, questions } = req.body;
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        const quiz = new Quiz({
            lessonId,
            questions
        });

        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;

        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        let score = 0;
        const feedback = quiz.questions.map((question, index) => {
            const correctOption = question.options.find(option => option.isCorrect);
            const isCorrect = correctOption.text === answers[index];
            if (isCorrect) score++;
            return {
                question: question.questionText,
                correctAnswer: correctOption.text,
                isCorrect
            };
        });

        res.status(200).json({ message: 'Quiz submitted successfully', score, feedback });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quiz', error });
    }
};
