import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useNavigate } from 'react-router-dom';

const InstructorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddMenuDialog, setOpenAddMenuDialog] = useState(false);
  const [newMenu, setNewMenu] = useState({ name: '', category: '', price: '' });

  useEffect(() => {
    // Replace with your API call
    const fetchedRestaurant = {
      id: 1,
      name: 'Pizza Palace',
      address: '123 Main St',
      logo: 'https://via.placeholder.com/100',
      description: 'Best pizza in town!',
      contactNumber: '123-456-7890',
      openingHours: '10:00 AM - 11:00 PM',
      menus: [
        { id: 1, name: 'Pepperoni Pizza', category: 'Pizza', price: 10.99 },
        { id: 2, name: 'Veggie Pizza', category: 'Pizza', price: 8.99 },
        // More menu items...
      ],
    };

    setRestaurant(fetchedRestaurant);
  }, [id]);

  const handleEditRestaurant = () => {
    // Implement edit logic here
    setOpenEditDialog(false);
  };

  const handleDeleteRestaurant = () => {
    // Implement delete logic here
    navigate('/restaurants');
  };

  const handleAddMenu = () => {
    // Implement add menu logic here
    const updatedRestaurant = {
      ...restaurant,
      menus: [
        ...restaurant.menus,
        {
          id: restaurant.menus.length + 1,
          name: newMenu.name,
          category: newMenu.category,
          price: parseFloat(newMenu.price),
        },
      ],
    };
    setRestaurant(updatedRestaurant);
    setOpenAddMenuDialog(false);
  };

  if (!restaurant) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 2, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h6" gutterBottom>
        {restaurant.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {restaurant.description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Address: {restaurant.address}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Contact: {restaurant.contactNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Opening Hours: {restaurant.openingHours}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        onClick={() => setOpenEditDialog(true)}
        sx={{ mt: 2, mr: 2 }}
      >
        Edit Instructor
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteRestaurant}
        sx={{ mt: 2, mr: 2  }}
      >
        Delete Instructor
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteRestaurant}
        sx={{ mt: 2 }}
      >
        Assign Instructor
      </Button>

      {/* Edit Restaurant Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle>Edit Instructor Detail</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Restaurant Name"
            fullWidth
            value={restaurant.name}
            onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Restaurant Address"
            fullWidth
            value={restaurant.address}
            onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={restaurant.description}
            onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Contact Number"
            fullWidth
            value={restaurant.contactNumber}
            onChange={(e) => setRestaurant({ ...restaurant, contactNumber: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Opening Hours"
            fullWidth
            value={restaurant.openingHours}
            onChange={(e) => setRestaurant({ ...restaurant, openingHours: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditRestaurant} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Menu Dialog */}
      <Dialog
        open={openAddMenuDialog}
        onClose={() => setOpenAddMenuDialog(false)}
      >
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Menu Name"
            fullWidth
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={newMenu.category}
            onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            type="number"
            value={newMenu.price}
            onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddMenuDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddMenu} color="primary">
            Add Menu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstructorDetail;
