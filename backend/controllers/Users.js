const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Courses = require('../models/Course');

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, phoneNumber, role,confirmPassword } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword,
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
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
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
  exports.enrollInCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can enroll in courses' });
        }

        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Student is already enrolled in this course' });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).json({ message: 'Enrolled in course successfully', user });
    } catch (error) {
        console.error('Error enrolling in course:', error);  
        res.status(500).json({ message: 'Error enrolling in course', error: error.message });
    }
};

exports.getInstructors = async (req, res) => {
  try {
      const instructors = await User.find({role:"instructor"});
      res.status(200).json(instructors);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching instructors', error });
  }
};

// Get a single instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id)
      .populate('courseAssignedTo','title'); // Populate courseAssignedTo field
    
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (error) {
    console.error("Error fetching instructor:", error);
    res.status(500).json({ message: 'Error fetching instructor', error });
  }
};


// Update a Users by ID
exports.updateUser = async (req, res) => {
  try {
      const instructor = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      if (!instructor) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully', instructor });
  } catch (error) {
      res.status(500).json({ message: 'Error updating USer', error });
  }
};

// Delete a User by ID
exports.deleteUser = async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting User', error });
  }
};

// Assign a course to an instructor
exports.assignCourse = async (req, res) => {
  try {
    const instructor = await User.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    if (!Array.isArray(req.body.courseAssignedTo) || req.body.courseAssignedTo.length === 0) {
      return res.status(400).json({ message: 'No courses provided' });
    }


    instructor.courseAssignedTo = [...new Set([...instructor.courseAssignedTo, ...req.body.courseAssignedTo])];
    await instructor.save();

    res.status(200).json({ message: 'Courses assigned successfully', instructor });
  } catch (error) {
    console.error('Error assigning course:', error);
    res.status(500).json({ message: 'Error assigning course', error: error.message });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate({path:'enrolledCourses'});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ enrolledCourses: user.enrolledCourses });
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Error fetching enrolled courses', error: error.message });
  }
};

exports.getAssignedCourse=async(req,res)=>{
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('courseAssignedTo');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.courseAssignedTo);
  } catch (error) {
    console.error('Error fetching courses for user:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
}

exports.totalInstructor=async(req,res)=>{
  try {
    const count = await User.countDocuments({ role: 'instructor' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get instructor count', error });
  }
}

exports.totalStudent=async(req,res)=>{
  try {
    const count = await User.countDocuments({ role: 'student' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get student count', error });
  }

}