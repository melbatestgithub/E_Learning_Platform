import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  TableSortLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

const CoursesManagement = () => {
  const [courses, setCourses] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' }); // Added for alert

  const [addCourse, setAddCourse] = useState({
    title: '',
    description: '',
    creditHour: '',
    courseCode: '',
    category: ''
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true); 
        const res = await axios.get('http://localhost:5600/course/getCourse');
        setCourses(res.data);
        setLoading(false); 
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setLoading(false); 
      }
    };
    getCourses();
  }, []);

  const handleOpenModal = (course = null) => {
    setSelectedCourse(course);
    if (course) {
      setAddCourse({
        title: course.title,
        description: course.description,
        creditHour: course.creditHour,
        courseCode: course.courseCode,
        category: course.category
      });
    } else {
      setAddCourse({
        title: '',
        description: '',
        courseCode: '',
        category: '',
        creditHour: ''
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddCourse((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCourse = async () => {
    try {
      if (selectedCourse) {
        await axios.put(`http://localhost:5600/course/update/${selectedCourse._id}`, addCourse);
        setAlert({ open: true, message: 'Course updated successfully!', severity: 'success' });
      } else {
        await axios.post('http://localhost:5600/course/addCourse', addCourse);
        setAlert({ open: true, message: 'Course added successfully!', severity: 'success' });
      }
      setAddCourse({
        title: '',
        description: '',
        courseCode: '',
        category: '',
        creditHour: ''
      });
      handleCloseModal();
      
      const res = await axios.get('http://localhost:5600/course/getCourse');
      setCourses(res.data);
    } catch (error) {
      console.error('Failed to save course:', error);
      setAlert({ open: true, message: 'Failed to save course.', severity: 'error' });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5600/course/delete/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
      setAlert({ open: true, message: 'Course deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to delete course:', error);
      setAlert({ open: true, message: 'Failed to delete course.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom>
        Courses Management
      </Typography>

      {alert.open && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Search Courses ..."
          variant='outlined'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: .5, mb: 1, borderRadius: 3, background: 'whitesmoke', '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              }
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ mb: 2 ,backgroundColor:"#0077b6"}}
          onClick={() => handleOpenModal()}
        >
          Add Course
        </Button>
      </Box>

      {loading ? ( 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={orderBy === 'title' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'title'}
                      direction={orderBy === 'title' ? order : 'asc'}
                      onClick={() => {
                        const isAsc = orderBy === 'title' && order === 'asc';
                        setOrder(isAsc ? 'desc' : 'asc');
                        setOrderBy('title');
                      }}
                    >
                      Title
                      {orderBy === 'title' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Credit Hours</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses
                  .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.courseCode}</TableCell>
                      <TableCell>{course.description}</TableCell>
                      <TableCell>{course.creditHour}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenModal(course)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteCourse(course._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{selectedCourse ? 'Update Course' : 'Add New Course'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Course Title"
                type="text"
                fullWidth
                variant="outlined"
                name="title"
                value={addCourse.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Course Code"
                type="text"
                fullWidth
                variant="outlined"
                name="courseCode"
                value={addCourse.courseCode}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                name="description"
                value={addCourse.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Credit Hours"
                type="number"
                fullWidth
                variant="outlined"
                name="creditHour"
                value={addCourse.creditHour}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Category"
                type="text"
                fullWidth
                variant="outlined"
                name="category"
                value={addCourse.category}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleAddCourse} sx={{backgroundColor:"#0077b6",color:'white'}}>
            {selectedCourse ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursesManagement;
