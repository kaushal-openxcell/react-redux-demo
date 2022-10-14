import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from 'yup';

import { Stack, Box, Typography, FormLabel, TextField, Button } from "@mui/material"
import { BlueBox } from "../components/common/BlueBox"

import resetPasswordImg from '../Assets/image/Group1299.png'

import { resetPassword } from "../redux/actions/action";
import { Footer } from "../components/common/Footer";

export const ResetPassword = () => {
  const param = useParams();
  const users = useSelector(state => state.users);
  
  useEffect(() => {
    const userExists = users.filter((user) => (user.id === param.id && user.verify === true))
    if(userExists.length === 0){
      navigate('/login')
    }
  })
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    password : yup.string()
        .min(6, `Password should be minimum 6 characters!`)
        .max(15, `Password should be maximum 15 characters!`)
        .required('Password is required!'),
    confirmPassword : yup.string()
        .oneOf([yup.ref('password'), null], 'Password must match!')
        .required('Confirm Password is required!'),
  });

  const onResetPasswordSubmit = () => {
    const user = users.filter((user) => (user.id === param.id && user.verify === true))
    if(user && user[0]){
      dispatch( resetPassword(resetPasswordForm.values) )
      navigate('/login');
    }
  }

  const resetPasswordForm = useFormik({
    initialValues:{
      id:param.id,
      password:'',
      confirmPassword:''
    },
    validationSchema,
    onSubmit: onResetPasswordSubmit
  })

  return (
    <Stack direction='row' sx={{ height:'100%' }}>
      <BlueBox flex="0 0 30%">
        <Box sx={{ display:"flex", flexDirection:'column', alignItems:'center', justifyContent:"space-evenly", width:'100%' }}>
          <Box sx={{ display:"flex", alignItems:'center', justifyContent:"center"}}>
            <Typography variant="h5" style={{ color:'#FFF', lineHeight:'40px' }} fontWeight="bold" textAlign='left' px={7}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>
          </Box>
          <Box sx={{ display:'flex', justifyContent:'center' }}>
            <img src={resetPasswordImg} alt="Register" style={{ width:'100%' }} />
          </Box>
        </Box>
      </BlueBox>
      <Box sx={{flex:'0 0 35%', display:"flex", flexDirection:"column", justifyContent:"space-between",  marginTop:"80px", paddingInline:"80px"}} >
        <Box sx={{ display:"flex", flexDirection:"column",  marginTop:'20px', textAlign:"left"}}>
          <Typography variant="h4" fontWeight='bold'>
            Reset Password
          </Typography>
          <Typography variant="h6" style={{ color:'#979797' }} mt={2}>
            Please enter your new password.
          </Typography>
          <form onSubmit={resetPasswordForm.handleSubmit}>
            <Stack mt={6} gap={2}>
              <Box>
                <FormLabel id="demo-form-control-label-placement">New Password</FormLabel>
                <TextField 
                  placeholder='Enter new password' 
                  name="password" 
                  type="password"
                  fullWidth
                  value={resetPasswordForm.values.password}
                  onChange={resetPasswordForm.handleChange}
                  error={resetPasswordForm.touched.password && !!resetPasswordForm.errors.password}
                  helperText={resetPasswordForm.touched.password ? resetPasswordForm.errors.password : ''}
                  sx={{ mt:"6px", "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
                />
              </Box>
              <Box mb={4}>
                <FormLabel id="demo-form-control-label-placement">Confirm Password</FormLabel>
                <TextField 
                  placeholder='Enter confirm password' 
                  name="confirmPassword" 
                  type="password"
                  fullWidth
                  value={resetPasswordForm.values.confirmPassword}
                  onChange={resetPasswordForm.handleChange}
                  error={resetPasswordForm.touched.confirmPassword && !!resetPasswordForm.errors.confirmPassword}
                  helperText={resetPasswordForm.touched.confirmPassword ? resetPasswordForm.errors.confirmPassword : ''}
                  sx={{ mt:"6px", "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
                />
              </Box>
              <Button variant="contained" color="warning" type="submit"> Save </Button>
            </Stack>
          </form>
        </Box>
        <Footer />
      </Box>
    </Stack>
  )
}
