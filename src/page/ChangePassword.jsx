import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik"
import { changePassword } from "../redux/actions/action";
import * as yup from 'yup';

import { Alert, Box, Button, FormLabel, Snackbar, Stack, TextField, Typography } from "@mui/material"
import { Footer } from "../components/common/Footer"

export const ChangePassword = () => {
  const [error, setError] = useState(false)
  const users = useSelector(state => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    if(error){
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error])
  
  const submitChangePassword = () =>{
    const userExist = users.filter((user) => (user.id === loggedInUser.id && user.password === changePasswordForm.values.oldPassword) )
    if(userExist && userExist.length > 0){
      dispatch( changePassword({ id: loggedInUser.id, password:changePasswordForm.values.password} ) )
      navigate('/profile')
    }else{
      setError(true);
      changePasswordForm.resetForm();
    }
  }

  const validationSchema = yup.object().shape({
    oldPassword : yup.string()
        .min(6, `Old password should be minimum 6 characters!`)
        .max(15, `Old password should be maximum 15 characters!`)
        .required('Old password is required!'),
    password : yup.string()
        .min(6, `New password should be minimum 6 characters!`)
        .max(15, `New password should be maximum 15 characters!`)
        .required('New password is required!'),
    confirmPassword : yup.string()
        .oneOf([yup.ref('password'), null], 'Password must match!')
        .required('Confirm Password is required!'),
  });

  const changePasswordForm = useFormik({
    initialValues:{
      oldPassword:'',
      password:'',
      confirmPassword:'',
    },
    validationSchema,
    onSubmit: submitChangePassword
  })
  return (
    <Stack sx={{ display:'flex', flexDirection:'column', height:'100%', alignItems:'center', justifyContent:'space-between', overflowY:'auto'}}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={error}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">Old password does not match !</Alert>
      </Snackbar>
      <Box sx={{ width:'40%', textAlign:'left'}} mb={2}>
        <Typography variant="h4" fontWeight="bold" mt={10}>
          Change Password
        </Typography>
        <Typography variant="h6" style={{ color:'#979797' }} mt={1}>
          Please enter your new password
        </Typography>
        <form onSubmit={changePasswordForm.handleSubmit}>
          <Stack mt={2} gap={2}>
            <Box>
              <FormLabel id="demo-form-control-label-placement">Old Password</FormLabel>
              <TextField 
                placeholder='Enter old password' 
                name="oldPassword" 
                type="password"
                fullWidth
                value={changePasswordForm.values.oldPassword}
                onChange={changePasswordForm.handleChange}
                error={changePasswordForm.touched.oldPassword && !!changePasswordForm.errors.oldPassword}
                helperText={changePasswordForm.touched.oldPassword ? changePasswordForm.errors.oldPassword : ''}
                sx={{ mt:"6px", "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
              />
            </Box>
            <Box>
              <FormLabel id="demo-form-control-label-placement">New Password</FormLabel>
              <TextField 
                placeholder='Enter new password' 
                name="password" 
                type="password"
                fullWidth
                value={changePasswordForm.values.password}
                onChange={changePasswordForm.handleChange}
                error={changePasswordForm.touched.password && !!changePasswordForm.errors.password}
                helperText={changePasswordForm.touched.password ? changePasswordForm.errors.password : ''}
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
                value={changePasswordForm.values.confirmPassword}
                onChange={changePasswordForm.handleChange}
                error={changePasswordForm.touched.confirmPassword && !!changePasswordForm.errors.confirmPassword}
                helperText={changePasswordForm.touched.confirmPassword ? changePasswordForm.errors.confirmPassword : ''}
                sx={{ mt:"6px", "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
              />
            </Box>
            <Button variant="contained" color="warning" type="submit"> Save </Button>
          </Stack>
        </form>
      </Box>
      <Footer />
    </Stack>
  )
}
