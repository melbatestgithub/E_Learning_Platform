const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');  
const Lesson = require('../models/Lesson'); 

router.post('/createQuiz', async (req, res) => {
  try {
    const { title, questions, lessonId } = req.body; 

    // Create a new quiz
    const quiz = new Quiz({
      title,
      questions,
    });

    // Save the quiz
    const savedQuiz = await quiz.save();


    if (lessonId) {
      await Lesson.findByIdAndUpdate(
        lessonId,
        { $push: { quiz: savedQuiz._id } }, 
        { new: true }
      );
    }

    res.status(201).json({ quiz: savedQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
});


router.get("/getQuiz",async(req,res)=>{
  try {
    const quiz=await Quiz.find()
    res.status(200).send(quiz)
  } catch (error) {
    res.status(500).send("Unable to fetch quiz")
  }
})

module.exports = router;
