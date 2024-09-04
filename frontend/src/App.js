import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Instructors from './pages/InstructorManagement';
import Courses from './pages/CoursesManagement';
import UserManagement from './pages/UserManagement';
import InstructorDetail from './pages/InstructorDetail';

import { Box, ThemeProvider } from '@mui/material';
import theme from './theme'; 

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex',gap:3 }}>
      {!isLoginPage && <Sidebar />} {/* Conditionally render Sidebar */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
        {!isLoginPage && <Navbar />} {/* Conditionally render Navbar */}
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/instructors' element={<Instructors />} />
          <Route path='/instructors/:id' element={<InstructorDetail />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/users' element={<UserManagement />} />
          <Route path='/login' element={<Login />} />
          
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent /> {/* This component uses useLocation */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
