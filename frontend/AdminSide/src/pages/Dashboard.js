import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import OrderIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RevenueIcon from '@mui/icons-material/AttachMoney';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Dummy data for charts
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 6000 },
];

const orderData = [
  { name: 'Food', value: 400 },
  { name: 'Beverages', value: 300 },
  { name: 'Desserts', value: 200 },
];

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, padding: 3 ,mt:10,borderRadius:3,boxShadow:4  }}>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Stats Overview */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h6" color={theme.palette.primary.main}>
                1,230
              </Typography>
              <IconButton>
                <OrderIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Courses</Typography>
              <Typography variant="h6" color={theme.palette.primary.main}>
                $12,345
              </Typography>
              <IconButton>
                <RevenueIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Instructors</Typography>
              <Typography variant="h6" color={theme.palette.primary.main}>
                75
              </Typography>
              <IconButton>
                <RecentActorsIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default Dashboard;
