const express = require('express');
const router = express.Router();
const userController=require('../controllers/Users')
// Route for user registration
router.post('/auth/register', userController.registerUser);
router.post('/auth/login', userController.loginUser);
router.get('/getStudent', userController.getStudents);
router.post('/students/enroll', userController.enrollInCourse);

module.exports = router;
