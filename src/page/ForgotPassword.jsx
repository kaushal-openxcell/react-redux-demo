import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from 'yup';

import { Stack, Box, Typography, FormLabel, TextField, Button, Snackbar, Alert } from "@mui/material"
import { BlueBox } from "../components/common/BlueBox"

import forgotPassword from '../Assets/image/Group1299.png'

import { setOtp } from "../redux/actions/action";
import { Footer } from "../components/common/Footer";

export const ForgotPassword = () => {
  const [error, setError] = useState(false)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required')
  });

  const onForgotPasswordSubmit = () => {
    const user = users.filter((user) => user.email === forgotPasswordForm.values.email)

    if(user && user[0]){
      dispatch( setOtp(forgotPasswordForm.values) )
      navigate('/verification/'+user[0].id);
    }else{
      setError(true);
    }
  }

  const forgotPasswordForm = useFormik({
    initialValues:{
      email:''
    },
    validationSchema,
    onSubmit: onForgotPasswordSubmit
  })

  return (
    <Stack direction='row' sx={{ height:'100%' }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={error}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">Invalid Email !</Alert>
      </Snackbar>
      <BlueBox flex="0 0 30%">
        <Box sx={{ display:"flex", flexDirection:'column', alignItems:'center', justifyContent:"space-evenly", width:'100%' }}>
          <Box sx={{ display:"flex", alignItems:'center', justifyContent:"center"}}>
            <Typography variant="h5" style={{ color:'#FFF', lineHeight:'40px' }} fontWeight="bold" textAlign='left' px={7}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>
          </Box>
          <Box sx={{ display:'flex', justifyContent:'center' }}>
            <img src={forgotPassword} alt="Register" style={{ width:'100%' }} />
          </Box>
        </Box>
      </BlueBox>
      <Box sx={{flex:'0 0 35%', display:"flex", flexDirection:"column", justifyContent:"space-between",  marginTop:"80px", paddingInline:"80px"}} >
        <Box sx={{ display:"flex", flexDirection:"column",  marginTop:'20px', textAlign:"left"}}>
          <Typography variant="h4" fontWeight='bold'>
            Forgot password?
          </Typography>
          <Typography variant="h6" style={{ color:'#979797' }} mt={2}>
            Please enter your registered email address we'll send you reset instruction
          </Typography>
          <form onSubmit={forgotPasswordForm.handleSubmit}>
            <Stack mt={6} gap={2}>
              <Box mb={6}>
                <FormLabel id="demo-form-control-label-placement">Email</FormLabel>
                <TextField 
                  placeholder='Email' 
                  name="email" 
                  fullWidth
                  value={forgotPasswordForm.values.email}
                  onChange={forgotPasswordForm.handleChange}
                  error={forgotPasswordForm.touched.email && !!forgotPasswordForm.errors.email}
                  helperText={forgotPasswordForm.touched.email ? forgotPasswordForm.errors.email : ''}
                  sx={{ mt:"6px", "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
                />
              </Box>
              <Button variant="contained" color="warning" type="submit"> Send </Button>
            </Stack>
          </form>
        </Box>
        <Footer />
      </Box>
    </Stack>
  )
}
