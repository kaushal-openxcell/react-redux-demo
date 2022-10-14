import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/action';
import { Button, Avatar, Box, Stack, Typography } from '@mui/material'
import defaultPic from '../../Assets/image/defaultProfile.png'
import { EmailOutlined, CallOutlined, MaleOutlined, FemaleOutlined, CakeOutlined } from '@mui/icons-material';

export const ProfileCard = ({ user, flex, }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch( logout() );
    navigate('/')
  }
  return (
    <Box sx={{ flex:flex, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', boxSizing:'border-box' }} className='box' p={1} gap={4}>
      <Avatar src={user.profilePic ? user.profilePic : defaultPic} sx={{ width:"150px", height:"150px" }}/>
      <Typography variant="h6" fontWeight="bold">
        {user.first_name} {user.last_name}
      </Typography>
      <Stack gap={1} mt={2}>
        <Typography variant="subtitle1" className='subTitleWithIcon' align="left">
          <EmailOutlined sx={{ marginRight:'10px'}}/>
          {user.email}
        </Typography>
        <Typography variant="subtitle1" className='subTitleWithIcon' align="left">
          <CallOutlined sx={{ marginRight:'10px'}}/>
          {user.phone}
        </Typography>
        <Typography variant="subtitle1" className='subTitleWithIcon' align="left" textTransform='capitalize'>
          {user.gender === 'male' ? <MaleOutlined sx={{ marginRight:'10px'}}/> : <FemaleOutlined sx={{ marginRight:'10px'}}/>}
          {user.gender}
        </Typography>
        <Typography variant="subtitle1" className='subTitleWithIcon' align="left">
          <CakeOutlined sx={{ marginRight:'10px'}}/>
          {user.dob}
        </Typography>
      </Stack>
      <Stack gap={2} mt={2} mb={2}>
        <Button variant="outlined" size="large" color="warning" href='/change-password'>Change Password</Button>
        <Button variant="outlined" size="large" color="warning" onClick={handleLogout}>Logout</Button>
      </Stack>
    </Box>
  )
}
