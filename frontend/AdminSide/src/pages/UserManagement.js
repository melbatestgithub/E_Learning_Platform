import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Simulate fetching users from an API
  useEffect(() => {
    const fetchUsers = async () => {
      // Replace with your API call
      const res=await axios.get("http://localhost:5600/user/getStudent")
      setUsers(res.data);
      setFilteredUsers(users);
    };

    fetchUsers();
  }, []);

  // Filter users based on search input
  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, users]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle edit user (placeholder function)
  const handleEdit = (userId) => {
    console.log('Edit user with ID:', userId);
    // Implement the actual edit functionality
  };

  // Handle delete user (placeholder function)
  const handleDelete = (userId) => {
    console.log('Delete user with ID:', userId);
    // Implement the actual delete functionality
  };

  return (
    <Box sx={{ padding: 1 ,mt:10,borderRadius:3,boxShadow:4 }}>
      <Typography variant="h6" gutterBottom sx={{m:1}}>
        User Management
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: .5, mr: 2,borderRadius:4,background:'whitesmoke' , '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Remove the border
            }}}}
        />
        <IconButton color="primary" sx={{color:'orange'}}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box sx={{overflowX:'auto'}}>
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
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.enrolledCourses|| "No erollement yet"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
};

export default UserManagement;
  