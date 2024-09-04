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

const InstructorManagement = () => {
  const theme = useTheme();
  const [instructors, setInstructors] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    address: '',
    description: '',
    contactNumber: '',
    workingHours: '',
    photo: null,
    certificate: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching instructors from an API
    const fetchInstructors = async () => {
      const fetchedInstructors = [
        {
          id: 1,
          name: 'John Doe',
          address: '123 Main St',
          photo: 'https://via.placeholder.com/100',
          description: 'Expert in mathematics!',
          contactNumber: '123-456-7890',
          workingHours: '9:00 AM - 5:00 PM',
        },
        {
          id: 2,
          name: 'Jane Smith',
          address: '456 Elm St',
          photo: 'https://via.placeholder.com/100',
          description: 'Specialist in physics!',
          contactNumber: '234-567-8901',
          workingHours: '10:00 AM - 6:00 PM',
        },
        // Add more instructors as needed
      ];
      setInstructors(fetchedInstructors);
    };

    fetchInstructors();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleManageInstructor = (instructorId) => {
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewInstructor({
      name: '',
      address: '',
      description: '',
      contactNumber: '',
      workingHours: '',
      photo: null,
      certificate: null
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewInstructor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileUpload = (event) => {
    const { name, files } = event.target;
    setNewInstructor((prevState) => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleAddInstructor = () => {
    // Add the new instructor to the list (in a real app, you'd make an API call here)
    setInstructors((prevInstructors) => [
      ...prevInstructors,
      { ...newInstructor, id: prevInstructors.length + 1 }
    ]);
    handleCloseModal();
  };

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchTerm) ||
    instructor.address.toLowerCase().includes(searchTerm)
  );

  const sortedInstructors = filteredInstructors.sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
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
          sx={{ flex: .5, mb: 1, borderRadius: 3, background: 'whitesmoke', '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', // Remove the border
                }}}}
        />
      </Box>

      <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'name')}
                  >
                    Name
                    {orderBy === 'name' ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Working Hours</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedInstructors.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell>
                    <Avatar src={instructor.photo} alt={`${instructor.name} photo`} />
                  </TableCell>
                  <TableCell>{instructor.name}</TableCell>
                  <TableCell>{instructor.address}</TableCell>
                  <TableCell>{instructor.description}</TableCell>
                  <TableCell>{instructor.contactNumber}</TableCell>
                  <TableCell>{instructor.workingHours}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleManageInstructor(instructor.id)}
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
            count={filteredInstructors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      {/* Add Instructor Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Instructor</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                variant="outlined"
                value={newInstructor.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Address"
                name="address"
                fullWidth
                variant="outlined"
                value={newInstructor.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Description"
                name="description"
                fullWidth
                variant="outlined"
                value={newInstructor.description}
               
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Contact Number"
                name="contactNumber"
                fullWidth
                variant="outlined"
                value={newInstructor.contactNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Working Hours"
                name="workingHours"
                fullWidth
                variant="outlined"
                value={newInstructor.workingHours}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Photo
                <input
                  type="file"
                  hidden
                  name="photo"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Certificate
                <input
                  type="file"
                  hidden
                  name="certificate"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddInstructor} color="primary">
            Add Instructor
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstructorManagement;
