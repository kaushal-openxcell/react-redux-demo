import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { login, removeError } from '../redux/actions/action';

import { Box, Stack, TextField, Typography, FormLabel, Checkbox, FormControlLabel, Button, Snackbar, Alert } from '@mui/material'
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import { BlueBox } from '../components/common/BlueBox'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import loginImage from '../Assets/image/Group415.png'
import { ROUTER, PASSWORD } from '../constants';
import { Footer } from '../components/common/Footer';


export const Login = () => {
  
  const isUserLogIn = useSelector(state => state.isUserLogIn)
  const error = useSelector(state => state.error)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const validationSchema = yup.object().shape({
    email: yup.string()
              .email('Invalid email!').required("Email is required"),
    password: yup.string()
            .min(PASSWORD.MIN, `Password should be minimum ${PASSWORD.MIN} characters!`)
            .max(PASSWORD.MAX, `Password should be maximum ${PASSWORD.MAX} characters!`)
            .required('Password is required!'),
  })

  const handelOnsubmit = async () => {
    await dispatch( login( loginForm.values ) );
  }
  
  useEffect(()=>{
    if(isUserLogIn){
      navigate('/dashboard')
    }else if(error){
      setTimeout(() => {
        dispatch( removeError() )
      }, 2000);
    }
  },[isUserLogIn, error, dispatch, navigate])

  const loginForm = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema,
    onSubmit: handelOnsubmit
  })

  return (
    <Box sx={{ height:'100%', display:'flex', flexDirection:'row' }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={error}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">Invalid Email & Password !</Alert>
      </Snackbar>
      <BlueBox flex="0 0 70%">
        <Box sx={{ display:"flex", alignItems:"center", height:'100%', width:'80%', margin:'0 auto' }}>
          <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false} width="100%">
              <div>
                  <img src={loginImage} alt="Login" style={{ width:'100%' }} />
              </div>
              <div>
                  <img src={loginImage} alt="Login" style={{ width:'100%' }} />
              </div>
              <div>
                  <img src={loginImage} alt="Login" style={{ width:'100%' }} />
              </div>
          </Carousel>
        </Box>
      </BlueBox>
      <Box sx={{display:'flex', flex:"0 0 30%", flexDirection:"column", justifyContent:"space-between", height:'100%'}}>
        <Box sx={{ paddingInline:'80px', marginTop:'80px', textAlign:"left" }}>
          <Typography variant="h4" fontWeight='bold'>
            Welcome Back !
          </Typography>
          <Typography variant="h6" style={{ color:'#979797' }}>
            Login to your account
          </Typography>
          <form onSubmit={loginForm.handleSubmit}>
            <Stack mt={6} gap={2}>
              <Box>
                <FormLabel id="demo-form-control-label-placement">Email</FormLabel>
                <TextField 
                  placeholder='Email' 
                  name="email" 
                  fullWidth
                  value={loginForm.values.email}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.email && Boolean(loginForm.errors.email)}
                  helperText={loginForm.touched.email ? loginForm.errors.email : ''}
                  sx={{ mt:"6px", "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
                />
              </Box>

              <Box>
                <FormLabel id="demo-form-control-label-placement">Password</FormLabel>
                <TextField 
                  placeholder='Password' 
                  name="password" 
                  type="password"
                  fullWidth
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.password && Boolean(loginForm.errors.password)}
                  helperText={loginForm.touched.password ? loginForm.errors.password : ''}
                  sx={{ mt:"6px", "& .MuiOutlineInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
                />
              </Box>

              <Box sx={{ display:"flex", justifyContent: 'space-between', flexDirection:"row", alignItems:"center", fontSize:"13px", color:'#FF7F00' }}>
                <FormControlLabel 
                  label={<Typography sx={{fontSize:"13px"}}>Remember Me</Typography>} 
                  control={<Checkbox
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />} 
                  />}
                />
                <Link to={ROUTER.PASSWORD.FORGOT} className="text-orange" style={{ fontSize:"13px", textDecoration:"none", color:'#FF7F00' }} >
                  Forgot Password?
                </Link>
              </Box>

              <Button variant="contained" color="warning" type="submit"> Sign In </Button>
            </Stack>
          </form>
        </Box>
        <Footer paddingInline="80px"/>
      </Box>
    </Box>
  )
}
