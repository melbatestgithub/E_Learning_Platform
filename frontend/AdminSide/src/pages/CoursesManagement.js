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
  Avatar,
  IconButton,
  TextField,
  TableSortLabel,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  DialogContentText,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { visuallyHidden } from '@mui/utils';

const CoursesManagement = () => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const [addCourse, setAddCourse] = useState({
    title: '',
    description: '',
    creditHour: '',
    courseCode: '',
    category: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5600/course/getCourse');
        setCourses(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    getCourses();
  }, []);


  const handleManageCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
      await axios.post('http://localhost:5600/course/addCourse', addCourse);
      setAddCourse({
        title: '',
        description: '',
        courseCode: '',
        category: '',
        creditHour: ''
      });
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom>
        Courses Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Search Courses ..."
          variant='outlined'
          value={searchTerm}
          
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
          sx={{ mb: 2, backgroundColor: theme.palette.primary.button }}
          onClick={handleOpenModal}
        >
          Add Course
        </Button>
      </Box>

      <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'title' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'title'}
                    direction={orderBy === 'title' ? order : 'asc'}
                   
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
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.courseCode}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.creditHour}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleManageCourse(course.id)}
                      sx={{ backgroundColor: theme.palette.primary.button, color: "white", textTransform: 'capitalize' }}
                    >
                      <IconButton sx={{ color: 'white' }}>
                        <AdminPanelSettingsIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Course</DialogTitle>
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
                label="Category"
                type="text"
                fullWidth
                variant="outlined"
                name="category"
                value={addCourse.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Credit Hours"
                type="text"
                fullWidth
                variant="outlined"
                name="creditHour"
                value={addCourse.creditHour}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCourse} color="primary">
            Add Course
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursesManagement;
