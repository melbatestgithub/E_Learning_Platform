const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses');

// Route to create a new course
router.post('/addCourse', courseController.addCourse);

// Route to get all courses
router.get('/getCourse', courseController.getCourses);

// Route to get a single course by ID
router.get('/courses/:id', courseController.getCourseById);

// Route to update a course by ID
router.put('/courses/:id', courseController.updateCourse);

// Route to delete a course by ID
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;
