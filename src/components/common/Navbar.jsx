import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Stack, Avatar, Typography, Box } from "@mui/material";
import logo from "../../Assets/image/logo.png"
import defaultProfile from "../../Assets/image/navbarUser.png"

export const Navbar = () => {

  const state = useSelector(state => state);

  return (
    <Stack 
      direction='row' 
      alignItems='center' 
      p={2} 
      sx={{ position:'sticky', background: '#242F3A', top:0, justifyContent: 'space-between', zIndex:'100' }}
    >
      <Link to={ state.isUserLogIn === false ? '/' : '/dashboard'} style={{ display:'flex', alignItems: 'center'}}>
        <img src={logo} alt='logo' height={25} />
      </Link>
      {
        state.isUserLogIn === false
        ? 
        <Stack alignItems="right" direction="row" gap={2} mr={2}>
          <Link to='/login' style={{ display:'flex', alignItems: 'center', textDecoration:'none'}}>
            <Button variant="outlined" color="neutral">
                Login
            </Button>
          </Link>
          <Link to='/register' style={{ display:'flex', alignItems: 'center', textDecoration:'none'}}>
            <Button variant="contained" color="warning">
                Register
            </Button>
          </Link>
        </Stack>
        :
        <Stack alignItems="right" direction="row" gap={2} mr={2}>
          <Link to='/create-post' style={{ display:'flex', alignItems: 'center', textDecoration:'none'}}>
            <Button variant="outlined" color="neutral">
                Create Post
            </Button>
          </Link>
          <Box sx={{ display:'flex', flexDirection:'row'}}>
            <Link to='/profile' style={{ display:'flex', alignItems: 'center'}}>
              <Avatar alt="Profile Image" src={state.loggedInUser.profilePic || defaultProfile} sx={{ width:'30px', height:'30px', border:'2px solid #979797', marginRight:'8px' }}/>
              <Typography variant="subtitle2" sx={{ display:'flex', alignItems:'center', color:'#fff', fontWeight:'600'}}>
                  {state.loggedInUser.first_name} {state.loggedInUser.last_name}
              </Typography>
            </Link>
          </Box>
        </Stack>
      }
    </Stack>
  )
}