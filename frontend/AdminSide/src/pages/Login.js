import React,{useState} from 'react'
import { Box, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Snackbar, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import delivery1 from '../assets/deliveryLogin.jpg'
import delivery2 from '../assets/delivery2.jpg'
import axios from 'axios'
import { useTheme } from '@emotion/react';
const Login = () => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState('')

const navigate=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault()
  try {
    const res=await axios.post("http://localhost:5600/user/auth/login",{email,password})
   localStorage.setItem('token',res.data.token)
   navigate('/')
  } catch (error) {
    setError("Incorrect Email or password")
  }
  }
  const theme=useTheme()
  return (
   <Grid container sx={{height:"100vh"}}>
    <Grid item xs={12} md={6} sx={{
      backgroundImage:`url(${delivery1})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}/>

       <Grid item xs={12} md={6} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography gutterBottom sx={{ marginTop: "1rem" }}>
              <Typography variant='p' sx={{ fontSize: "1.5rem", color: theme.palette.primary.main }}>Login as Adminstrator </Typography>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'gray',
                  marginTop: '4px'
                }}
              />
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                margin="normal"
               onChange={(e)=>setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                margin="normal"
               onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <Box sx={{display:"flex",  mb:2,alignItems:"center",gap:8}} >
              <FormControlLabel
                control={<Checkbox name="rememberMe" color="primary"   />}
                label="Remember me"
             
              />
              <Typography>Forgot Password</Typography>
              </Box>
              <Button  fullWidth sx={{ mb: 1 ,background:theme.palette.primary.button,color:'white ',borderRadius:"20px",'&:hover':{
                background:theme.palette.primary.hover
              }}} type="submit" >
                Login
              </Button>
             {error&& <Typography sx={{color:'red'}}>{error}</Typography>} 
            </form>

          </Box>
        </Grid>
   </Grid>
    
  )
}

export default Login
