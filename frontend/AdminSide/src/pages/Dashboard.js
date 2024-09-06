import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  CircularProgress
} from '@mui/material';
import OrderIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const theme = useTheme();
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [coursesRes, studentsRes, instructorsRes] = await Promise.all([
          axios.get("https://elearning-server-side.onrender.com/course/count"), 
          axios.get("https://elearning-server-side.onrender.com/user/student/count"), 
          axios.get("https://elearning-server-side.onrender.com/user/instructor/count") 
        ]);

        setTotalCourses(coursesRes.data.count);
        setTotalStudents(studentsRes.data.count);
        setTotalInstructors(instructorsRes.data.count);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3, mt: 10, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h6" color={theme.palette.primary.main}>
                {totalStudents}
              </Typography>
              <IconButton>
                <RecentActorsIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Courses</Typography>
              <Typography variant="h6" color={theme.palette.primary.main}>
                {totalCourses}
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
              <Typography variant="h6">Total Instructors</Typography>
              <Typography variant="h6" color={theme.palette.primary.main}>
                {totalInstructors}
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
