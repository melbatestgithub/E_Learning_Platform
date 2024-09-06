const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const User = require('../models/Users');

// Create a lesson with associated quiz
router.post('/createLesson', async (req, res) => {
  try {
    const { title, description, content, courseId, createdBy } = req.body;

    // Create a new lesson
    const lesson = new Lesson({
      title,
      description,
      content,
      courseId,
      createdBy
    });

    // Save the lesson
    const savedLesson = await lesson.save();

    res.status(201).json({ message: 'Lesson created successfully', lesson: savedLesson });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ message: 'Error creating lesson', error: error.message });
  }
});

router.get("/allLesson",async(req,res)=>{
  try {
    const lessons=await Lesson.find()
    res.status(200).send(lessons)
  } catch (error) {
    res.status(500).send("No Lesson is Found")
  }
})


router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
   
    const lessons = await Lesson.find({ createdBy: userId });

    if (!lessons.length) {
      return res.status(404).json({ message: 'No lessons found for this user.' });
    }

    res.status(200).json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Failed to fetch lessons.', error });
  }
});


router.get('/lessons-quiz/:courseId/:userId', async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    // Find the user and check if they are enrolled in the course
    const user = await User.findById(userId).populate('enrolledCourses');
    if (!user || !user.enrolledCourses.some(course => course._id.toString() === courseId)) {
      return res.status(403).json({ message: 'User is not enrolled in this course.' });
    }

    // Fetch lessons for the course and populate quizzes
    const lessons = await Lesson.find({ courseId })
      .populate('quiz')  // Populate the quiz field with the Quiz model
      .exec();

    res.status(200).json(lessons);
  } catch (error) {
    console.error('Error fetching lessons with quizzes:', error);
    res.status(500).json({ message: 'Failed to fetch lessons with quizzes.' });
  }
});


module.exports = router;
