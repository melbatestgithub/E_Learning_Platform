const Courses = require('../models/Course');

// Create a new course
exports.addCourse = async (req, res) => {
    try {
        const { title, description, courseCode, category, creditHour } = req.body;
        const newCourse = new Courses({ title, description, courseCode, category, creditHour });
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
    try {
        const { title, description, courseCode, category, creditHour } = req.body;
        const course = await Courses.findByIdAndUpdate(
            req.params.id,
            { title, description, courseCode, category, creditHour },
            { new: true }
        );
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Courses.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};

exports.totalCourse=async(req,res)=>{
    try {
        const count = await Courses.countDocuments();
        res.json({ count });
      } catch (error) {
        res.status(500).json({ message: 'Failed to get course count', error });
      }
}
