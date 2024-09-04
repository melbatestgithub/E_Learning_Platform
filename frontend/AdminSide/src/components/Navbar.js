import React from 'react'
import { Menu as MenuIcon, Person as PersonIcon,Search as SearchIcon  } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, Box,useTheme, TextField ,InputAdornment,Avatar, Badge} from '@mui/material';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import avatar from '../assets/avatar.jpg'
const Navbar = () => {

  const theme=useTheme()
  return (
    <AppBar
    position='fixed'
    sx={{
      width: `calc(100% - 250px)`, // Adjust width to leave space for the sidebar
      // Move Navbar to the right
      backgroundColor: 'white',
      zIndex: theme.zIndex.drawer + 1, // Ensure Navbar appears above Sidebar
    }}
    >
       <Toolbar>
        <IconButton
         
          aria-label="menu"
          edge="start"
          
        >
          <MenuIcon  />
        </IconButton>
        <Box variant="h6" sx={{color:"#000",display:"flex",flexDirection:"column",alignItems:"start"}}>
       <Typography variant='h5' sx={{fontWeight:"bold"}}>Dashboard</Typography>  
       <Typography sx={{color:theme.palette.primary.main}}>Welcome To Admin Page</Typography>  
        </Box> 
        <Box sx={{ flexGrow: 1 }} />
        <Box  >
          <TextField
          type='search'
          placeholder='Search...'
          InputProps={{
            startAdornment:(
              <InputAdornment position='start'>
              <SearchIcon/>
              </InputAdornment>
            )
          }}
          sx={{width:300,background:"#EEEDEB",borderRadius:6 ,border:"none", '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none', // Remove the border
            },
          },}} />
        </Box>
        <Box sx={{margin:".2rem .8rem",display:"flex",alignItems:'center',gap:2}}>
        <IconButton color="inherit">
          <Badge badgeContent={2 } color="error">
          <NotificationsActiveOutlinedIcon sx={{color:theme.palette.primary.main}}/>
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={3}  color="error">
          <MailOutlineOutlinedIcon sx={{color:theme.palette.primary.main}}/>
          </Badge>
        </IconButton>
        <Avatar
            src={avatar}// URL of the image
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%', // Make it round
              bgcolor: theme.palette.grey[300], // Optional: background color
            }}
          >
            {/* Optionally, you can add initials or an icon inside the Avatar */}
          </Avatar>
        </Box>
       
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
