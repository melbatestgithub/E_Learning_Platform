import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5600/user/getStudent");
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setAlert({ open: true, message: 'Error fetching users', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5600/course/getCourse");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setAlert({ open: true, message: 'Error fetching courses', severity: 'error' });
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, users]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpenEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5600/user/update/${currentUser._id}`, currentUser);
      setUsers(users.map(user => user._id === currentUser._id ? currentUser : user));
      setAlert({ open: true, message: 'User updated successfully', severity: 'success' });
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setAlert({ open: true, message: 'Error updating user', severity: 'error' });
    }
  };

  const handleDelete = (user) => {
    setCurrentUser(user);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5600/user/delete/${currentUser._id}`);
      setUsers(users.filter(user => user._id !== currentUser._id));
      setAlert({ open: true, message: 'User deleted successfully', severity: 'success' });
      setOpenDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlert({ open: true, message: 'Error deleting user', severity: 'error' });
    }
  };

  const handleEditChange = (event) => {
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  };

  const getCourseTitleById = (courseId) => {
    const course = courses.find(course => course._id === courseId);
    return course ? course.title : "Unknown Course";
  };

  return (
    <Box sx={{ padding: 1, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ m: 1 }}>
        User Management
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{
            flex: 0.5,
            mr: 2,
            borderRadius: 4,
            background: 'whitesmoke',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', 
              }
            }
          }}
        />
        <IconButton color="primary" sx={{ color: 'orange' }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Enrolled Courses</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {user.enrolledCourses.length > 0 ? (
                        user.enrolledCourses.map(courseId => getCourseTitleById(courseId)).join(', ')
                      ) : "No enrollment yet"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(user)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user)} color="secondary">
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

     
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            name="username"
            value={currentUser?.username || ''}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={currentUser?.email || ''}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            name="phoneNumber"
            value={currentUser?.phoneNumber || ''}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            name="role"
            value={currentUser?.role || ''}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} sx={{backgroundColor:"#0077b6",color:"white"}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

    
      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user <strong>{currentUser?.username}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        message={alert.message}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
