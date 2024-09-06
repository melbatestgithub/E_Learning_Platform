import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  CircularProgress, 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstructorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [unassignedCourses, setUnassignedCourses] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddCourseDialog, setOpenAddCourseDialog] = useState(false);
  const [newCourseIds, setNewCourseIds] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });


  const getInstructor = async () => {
    try {
      const res = await axios.get(`http://localhost:5600/user/instructor/${id}`);
      setInstructor(res.data);
    } catch (error) {
      console.error("Error fetching instructor:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

 
  const getCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5600/course/getCourse');
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error.response ? error.response.data : error.message);
    }
  };


  const updateUnassignedCourses = () => {
    if (instructor && courses.length > 0) {
      const assignedCourseIds = Array.isArray(instructor.courseAssignedTo) 
        ? instructor.courseAssignedTo.map((course) => String(course._id)) 
        : [];
      
      const unassigned = courses.filter(course => !assignedCourseIds.includes(String(course._id)));
      setUnassignedCourses(unassigned);
    }
  };

  useEffect(() => {
    getInstructor();
    getCourses();
  }, [id]);

  useEffect(() => {
    updateUnassignedCourses();
  }, [instructor, courses]);


  const handleEditInstructor = async () => {
    try {
      await axios.put(`http://localhost:5600/user/update/${id}`, instructor);
      setOpenEditDialog(false);
      getInstructor(); 
      setAlert({ open: true, message: 'Instructor details updated successfully!', severity: 'success' });
    } catch (error) {
      console.error("Error updating instructor:", error.response ? error.response.data : error.message);
      setAlert({ open: true, message: 'Failed to update instructor details.', severity: 'error' });
    }
  };


  const handleDeleteInstructor = async () => {
    try {
      await axios.delete(`http://localhost:5600/user/delete/${id}`);
      navigate('/instructors');
      setAlert({ open: true, message: 'Instructor deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error("Error deleting instructor:", error.response ? error.response.data : error.message);
      setAlert({ open: true, message: 'Failed to delete instructor.', severity: 'error' });
    }
  };


  const handleAddCourse = async () => {
    if (newCourseIds.length === 0) {
      setAlert({ open: true, message: 'No courses selected.', severity: 'warning' });
      return;
    }
    
    try {
      await axios.post(`http://localhost:5600/user/instructor/assignCourse/${id}`, {
        courseAssignedTo: newCourseIds,
      });
      setOpenAddCourseDialog(false);
      getInstructor(); 
      setAlert({ open: true, message: 'Courses assigned successfully!', severity: 'success' });
    } catch (error) {
      console.error("Error assigning course:", error.response ? error.response.data : error.message);
      setAlert({ open: true, message: 'Failed to assign courses.', severity: 'error' });
    }
  };


  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  if (loading) return <CircularProgress />; 

  if (!instructor) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom>
        {instructor.username}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {instructor.phoneNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {instructor.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Education Level: {instructor.educationLevel}
      </Typography>

      <Button
        sx={{background:"#0077b6",color:"white",mt:2,mr:2}}
        startIcon={<EditIcon />}
        onClick={() => setOpenEditDialog(true)}
        
      >
        Edit Instructor
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteInstructor}
        sx={{ mt: 2, mr: 2 }}
      >
        Delete Instructor
      </Button>
      <Button
       sx={{background:"#0077b6",color:"white",mt:2}}
        startIcon={<AddIcon />}
        onClick={() => setOpenAddCourseDialog(true)}
       
      >
        Assign Course
      </Button>

     
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle>Edit Instructor Detail</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Instructor Name"
            fullWidth
            value={instructor.username}
            onChange={(e) => setInstructor({ ...instructor, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={instructor.email}
            onChange={(e) => setInstructor({ ...instructor, email: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={instructor.phoneNumber}
            onChange={(e) => setInstructor({ ...instructor, phoneNumber: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Education Level"
            fullWidth
            value={instructor.educationLevel}
            onChange={(e) => setInstructor({ ...instructor, educationLevel: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditInstructor} sx={{background:"#0077b6",color:"white"}}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAddCourseDialog}
        onClose={() => setOpenAddCourseDialog(false)}
      >
        <DialogTitle>Assign Course</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Courses</InputLabel>
            <Select
              multiple
              value={newCourseIds}
              onChange={(e) => setNewCourseIds(e.target.value)}
              label="Select Courses"
            >
              {unassignedCourses.map(course => (
                <MenuItem key={course._id} value={course._id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCourseDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCourse} sx={{background:"#0077b6",color:"white"}}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstructorDetail;
