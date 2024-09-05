const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Courses = require('../models/Courses');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, phoneNumber, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };


  exports.getStudents=async(req,res)=>{
    try {
      const students=await User.find({role:"student"})
      res.status(200).send(students)
    } catch (error) {
      res.status(500).send("Internal Server Error is Occured !")
    }
  }
  // Controller to enroll a student in a course
exports.enrollInCourse = async (req, res) => {
  try {
      const { userId, courseId } = req.body;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the user is a student
      if (user.role !== 'student') {
          return res.status(403).json({ message: 'Only students can enroll in courses' });
      }

      // Check if the course exists
      const course = await Courses.findById(courseId);
      if (!course) {
          return res.status(404).json({ message: 'Course not found' });
      }

      // Check if the student is already enrolled in the course
      if (user.enrolledCourses.includes(courseId)) {
          return res.status(400).json({ message: 'Student is already enrolled in this course' });
      }

      // Add the course to the student's enrolled courses
      user.enrolledCourses.push(courseId);
      await user.save();

      res.status(200).json({ message: 'Enrolled in course successfully', user });
  } catch (error) {
      res.status(500).json({ message: 'Error enrolling in course', error });
  }
};

exports.getInstructors = async (req, res) => {
  try {
      const instructors = await User.find();
      res.status(200).json(instructors);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching instructors', error });
  }
};

// Get a single instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
      const instructor = await User.findById(req.params.id);
      if (!instructor) {
          return res.status(404).json({ message: 'Instructor not found' });
      }
      res.status(200).json(instructor);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching instructor', error });
  }
};

// Update an instructor by ID
exports.updateInstructor = async (req, res) => {
  try {
      const { username, email, educationLevel, courseAssignedTo } = req.body;
      const instructor = await User.findByIdAndUpdate(
          req.params.id,
          { username, email, educationLevel, courseAssignedTo },
          { new: true }
      );
      if (!instructor) {
          return res.status(404).json({ message: 'Instructor not found' });
      }
      res.status(200).json({ message: 'Instructor updated successfully', instructor });
  } catch (error) {
      res.status(500).json({ message: 'Error updating instructor', error });
  }
};

// Delete an instructor by ID
exports.deleteInstructor = async (req, res) => {
  try {
      const instructor = await User.findByIdAndDelete(req.params.id);
      if (!instructor) {
          return res.status(404).json({ message: 'Instructor not found' });
      }
      res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting instructor', error });
  }
};

// Assign a course to an instructor
exports.assignCourse = async (req, res) => {
  try {
      const { courseAssignedTo } = req.body;
      const instructor = await User.findByIdAndUpdate(
          req.params.id,
          { courseAssignedTo },
          { new: true }
      );
      if (!instructor) {
          return res.status(404).json({ message: 'Instructor not found' });
      }
      res.status(200).json({ message: 'Course assigned successfully', instructor });
  } catch (error) {
      res.status(500).json({ message: 'Error assigning course to instructor', error });
  }
};
