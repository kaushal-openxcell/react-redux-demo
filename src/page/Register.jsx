import { useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import * as validation from '../YupValidation';

import { Box, Stack, Avatar, Typography, FormLabel, TextField, Button, Grid, RadioGroup, FormControlLabel, Radio, Checkbox, InputAdornment, IconButton } from '@mui/material'
import { RadioButtonUnchecked, CheckCircle, VisibilityOff, Visibility } from '@mui/icons-material';
import { BlueBox } from '../components/common/BlueBox'
import registerImage from '../Assets/image/rocket.png'
import defaultProfile from '../Assets/image/defaultProfile.png'
import { UUID, TO_BASE_64 } from '../constants';
import '../Assets/css/common.css';

import { register } from '../redux/actions/action';
import { Footer } from '../components/common/Footer';

export const Register = () => {
  const [image, _setImage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const dispatch = useDispatch();

  const handleOnChange = async (event) => {
    const newImage = event.target?.files?.[0];
    if (newImage) {
      _setImage(URL.createObjectURL(newImage));
      formik.setFieldValue("profilePic",await TO_BASE_64(newImage));
    }
  };

  const validationSchema = yup.object().shape({
    firstname : validation.YUP_VALIDATION.FIRST_NAME,
    lastname : validation.YUP_VALIDATION.LAST_NAME,
    email : validation.YUP_VALIDATION.EMAIL,
    phone : validation.YUP_VALIDATION.PHONE,
    password : validation.YUP_VALIDATION.PASSWORD,
    confirmPassword : validation.YUP_VALIDATION.CONFIRM_PASSWORD,
    dob : validation.YUP_VALIDATION.DATE.DOB,
    tNc : validation.YUP_VALIDATION.TNC,
	});

  
  const onRegisterSubmit = async () => {
    try {
      const payload = {
        id : UUID,
        first_name : formik.values.firstname,
        last_name : formik.values.lastname,
        email : formik.values.email,
        phone : formik.values.phone,
        password : formik.values.password,
        dob : formik.values.dob,
        gender : formik.values.gender,
        profilePic : formik.values.profilePic,
      }
      formik.resetForm();
      _setImage(null);
      dispatch( register(payload) );
    } catch (e) {
      console.log('Error : ',e)
    }
}

  const formik = useFormik({
		initialValues: {
			firstname : '',
			lastname : '',
      email : '',
      phone : '',
      password : '',
      confirmPassword : '',
      dob : '',
      gender : '',
      profilePic: '',
      tNc : false
		},
		validationSchema,
    onSubmit: onRegisterSubmit,
	});

  return (
    <Box sx={{ display:'flex', flexDirection:'row', height:'100%' }}>
      <BlueBox flex="0 0 35%">
        <Box sx={{ display:"flex", flexDirection:'column', alignItems:'center', justifyContent:"center", width:'100%' }}>
          <Box sx={{ display:"flex", flex:1, flexDirection:'column', justifyContent:"center"}}>
            <Typography variant="h5" style={{ color:'#FFF', lineHeight:'40px' }} fontWeight="bold" textAlign='left' px={7}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>
          </Box>
          <Box sx={{ display:'flex', justifyContent:'end' }}>
            <img src={registerImage} alt="Register" style={{ width:'100%' }} />
          </Box>
        </Box>
      </BlueBox>
      <Box sx={{ overflowY:'scroll', flex:'0 0 65%', flexDirection:"column", justifyContent:"space-between", textAlign:'left', boxSizing:'border-box'}} pt={5} px={8}>
        <Typography variant="h4" fontWeight='bold'>
          Create your account
        </Typography>
        <Typography variant="h6" style={{ color:'#979797' }}>
          We need some details to setup your account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack mt={5} gap={5} mb={6}>
            <Stack sx={{ display:'flex', flexDirection:'row'}}>
              <Avatar alt="Profile Image" src={image || defaultProfile} sx={{ width:'100px', height:'100px', border:'2px solid #979797' }}/>
              <Box sx={{ display:'flex', alignItems:'center'}} pl={4}>
                <Button variant='outlined' component="label" sx={{ color:'#333', borderColor:'#333', '&:hover':{ borderColor:'#333' } }}>
                  Upload Image 
                  <input type="file" hidden name="profilePic" onChange={handleOnChange} accept="image/*" />
                </Button>
              </Box>
            </Stack>
            <Grid container columnSpacing={4} rowSpacing={4}>
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-form-control-label-placement">First Name *</FormLabel>
                  <TextField 
                    placeholder='Enter your first name' 
                    name="firstname" 
                    fullWidth
                    className='textBox'
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname ? formik.errors.firstname  : ''}
                  />
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-form-control-label-placement">Last Name *</FormLabel>
                  <TextField 
                    placeholder='Enter your last name' 
                    name="lastname" 
                    fullWidth
                    className='textBox'
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname ? formik.errors.lastname : ''}
                  />
                </Box>
              </Grid> 
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-form-control-label-placement">Email *</FormLabel>
                  <TextField 
                    placeholder='Enter your email' 
                    name="email"
                    type="email" 
                    fullWidth
                    className='textBox'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? formik.errors.email : ''}
                  />
                </Box>
              </Grid> 
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-form-control-label-placement">Phone *</FormLabel>
                  <TextField 
                    placeholder='Enter your phone number' 
                    name="phone"
                    type="tel" 
                    fullWidth
                    className='textBox'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone ? formik.errors.phone : ''}
                  />
                </Box>
              </Grid>   
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-form-control-label-placement">Password *  </FormLabel>
                  <TextField 
                    placeholder='Enter your password' 
                    name="password" 
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    className='textBox'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password ? formik.errors.password : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end" 
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid> 
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-form-control-label-placement">Confirm Password *</FormLabel>
                  <TextField 
                    placeholder='Enter your password' 
                    name="confirmPassword" 
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    className='textBox'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end" 
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Grid> 
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-form-control-label-placement">Date of birth *</FormLabel>
                  <TextField 
                    name="dob" 
                    type="date"
                    fullWidth
                    className='textBox'
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob ? formik.errors.dob : ''}
                  />
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup 
                    row 
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    sx={{ display:'flex', alignItems:'center', marginTop:'10px'}}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid item sm={12}>
                <Box>
                  <FormControlLabel 
                    onBlur={formik.handleBlur}
                    label={<Typography variant='subtitle2' sx={{color:'#979797'}}>I agree to the terms of services</Typography>} 
                    control={<Checkbox icon={<RadioButtonUnchecked />} checkedIcon={<CheckCircle />} />}
                    name='tNc'
                    value={formik.values.tNc}
                    onChange={formik.handleChange}
                    error={formik.touched.tNc && formik.errors.tNc}
                    className='tNc'
                  />
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box>
                  <Button type="submit" variant="contained" color="warning" sx={{ width:'100%' }}> Get Started </Button>
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Footer />
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}
