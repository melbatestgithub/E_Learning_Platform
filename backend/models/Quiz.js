const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [optionSchema]
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [questionSchema],
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
