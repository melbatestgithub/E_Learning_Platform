import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Simulate fetching users from an API
  useEffect(() => {
    const fetchUsers = async () => {
      // Replace with your API call
      const fetchedUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin',status:'new' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User',status:'new' },
        // Add more users as needed
      ];
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  // Filter users based on search input
  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.role}</TableCell>
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
  