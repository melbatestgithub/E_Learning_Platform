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
  IconButton,
  TextField,
  TableSortLabel,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';

const InstructorManagement = () => {
  const theme = useTheme();
  const [instructors, setInstructors] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorsAndCourses = async () => {
      setLoading(true); 
      try {
        const instructorRes = await axios.get("http://localhost:5600/user/instructor/getAll");
        const courseRes = await axios.get("http://localhost:5600/course/getCourse");
    
        const coursesMap = courseRes.data.reduce((acc, course) => {
          acc[course._id] = course.title; 
          return acc;
        }, {});
    
        
        const instructorsWithCourses = instructorRes.data.map(instructor => {
         
          const courseTitles = Array.isArray(instructor.courseAssignedTo)
            ? instructor.courseAssignedTo.map(courseId => coursesMap[courseId] || 'Not Assigned')
            : [coursesMap[instructor.courseAssignedTo] || 'Not Assigned'];
    
          return {
            ...instructor,
            courseTitle: courseTitles.length > 0 ? courseTitles.join(', ') : 'Not Assigned' 
          };
        });
    
        setInstructors(instructorsWithCourses);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchInstructorsAndCourses();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleManageInstructor = (instructorId) => {
    setLoading(true); 
    navigate(`/instructors/${instructorId}`);
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

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.username.toLowerCase().includes(searchTerm) ||
    instructor.email.toLowerCase().includes(searchTerm)
  );

  const sortedInstructors = filteredInstructors.sort((a, b) => {
    if (orderBy === 'username') {
      return order === 'asc'
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    } else {
      return order === 'asc'
        ? a[orderBy] < b[orderBy] ? -1 : 1
        : a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const displayedInstructors = sortedInstructors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom>
        Instructor Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TextField
          label="Search Instructor ..."
          variant='outlined'
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            flex: .5,
            mb: 1,
            borderRadius: 3,
            background: 'whitesmoke',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              }
            }
          }}
        />
      </Box>

      <Box sx={{ maxHeight: 600, overflow: 'auto', position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <TableContainer component={Paper} sx={{ opacity: loading ? 0.5 : 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'name')}
                  >
                    Username
                    {orderBy === 'name' ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Education Level</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Course Assigned To</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedInstructors.map((instructor) => (
                <TableRow key={instructor._id}>
                  <TableCell>{instructor.username}</TableCell>
                  <TableCell>{instructor.email}</TableCell>
                  <TableCell>{instructor.educationLevel}</TableCell>
                  <TableCell>{instructor.phoneNumber}</TableCell>
                  <TableCell>{instructor.courseTitle}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleManageInstructor(instructor._id)}
                      sx={{ backgroundColor: theme.palette.primary.button, color: "white", textTransform: 'capitalize' }}
                    >
                      <IconButton sx={{ color: 'white' }}>
                        <AdminPanelSettingsIcon sx={{ fontSize: '15px', color: 'white', mr: 1 }} />
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredInstructors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default InstructorManagement;
