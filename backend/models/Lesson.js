const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,  
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',  // Reference to the Course model
        required: true
    },
    quiz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'  // Reference to the Quiz model
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
