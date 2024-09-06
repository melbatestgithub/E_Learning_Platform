const express = require('express');
const router = express.Router();
const userController=require('../controllers/Users')
// Route for user registration
router.post('/auth/register', userController.registerUser);
router.post('/auth/login', userController.loginUser);
router.put("/update/:id",userController.updateUser)
router.delete("/delete/:id",userController.deleteUser)
router.get('/getStudent', userController.getStudents);
router.get('/students/:userId/enrolledCourses', userController.getEnrolledCourses);
router.post('/students/enroll', userController.enrollInCourse);


router.get("/instructor/getAll",userController.getInstructors)
router.get("/student/count",userController.totalStudent)
router.get("/instructor/count",userController.totalInstructor)
router.post("/instructor/assignCourse/:id",userController.assignCourse)
router.get("/instructor/:id",userController.getInstructorById)
router.get("/instructor/courses/:userId",userController.getAssignedCourse)

module.exports = router;
