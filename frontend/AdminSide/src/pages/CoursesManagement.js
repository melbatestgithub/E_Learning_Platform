import React, { useState, useEffect } from 'react';
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
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    courseCode: '',
    description: '',
    category: '',
    creditHour: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching Courses from an API
    const fetchCourses = async () => {
      const fetchedCourses = [
        {
          id: 1,
          title: 'Introduction to Programming',
          courseCode: 'CS101',
          description: 'Learn the basics of programming.',
          category: 'Computer Science',
          creditHour: '3',
        },
        {
          id: 2,
          title: 'Data Structures',
          courseCode: 'CS102',
          description: 'Understand and implement data structures.',
          category: 'Computer Science',
          creditHour: '4',
        },
        // Add more courses as needed
      ];
      setCourses(fetchedCourses);
    };

    fetchCourses();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleManageCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCourse({
      title: '',
      courseCode: '',
      description: '',
      category: '',
      creditHour: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddCourse = () => {
    // Add the new course to the list (in a real app, you'd make an API call here)
    setCourses((prevCourses) => [
      ...prevCourses,
      { ...newCourse, id: prevCourses.length + 1 }
    ]);
    handleCloseModal();
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm) ||
    course.courseCode.toLowerCase().includes(searchTerm)
  );

  const sortedCourses = filteredCourses.sort((a, b) => {
    if (orderBy === 'title') {
      return order === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      return order === 'asc'
        ? a[orderBy] < b[orderBy] ? -1 : 1
        : a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const displayedCourses = sortedCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          onChange={handleSearch}
          sx={{
            flex: .5, mb: 1, borderRadius: 3, background: 'whitesmoke', '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove the border
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
                    onClick={(event) => handleRequestSort(event, 'name')}
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
              {displayedCourses.map((course) => (
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCourses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
                  value={newCourse.title}
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
                  value={newCourse.courseCode}
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
                  value={newCourse.description}
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
                  value={newCourse.category}
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
                  value={newCourse.creditHour}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddCourse} color="primary" variant="contained">
              Add Course
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default CoursesManagement;
  
