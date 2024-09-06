const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses');
router.post('/addCourse', courseController.addCourse);

router.get('/getCourse', courseController.getCourses);

router.get('/courses/:id', courseController.getCourseById);
router.get('/count',courseController.totalCourse)

router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);

module.exports = router;
