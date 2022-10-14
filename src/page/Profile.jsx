import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { updateProfile } from "../redux/actions/action";
import * as yup from 'yup';
import * as validation from '../YupValidation';

import { Avatar, Box, Button, Divider, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import ProfileIcon from '../Assets/image/profile-icon.png'
import defaultPic from '../Assets/image/defaultProfile.png'
import { ProfileCard } from "../components/common/ProfileCard";
import { TO_BASE_64 } from "../constants";

export const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedInUser)
  const [image, _setImage] = useState(user.profilePic)

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
    dob : validation.YUP_VALIDATION.DATE.DOB,
	});

  const updateProfileSubmit = async () => {
    try {
      const payload = {
        id : user.id,
        first_name : formik.values.firstname,
        last_name : formik.values.lastname,
        email : formik.values.email,
        phone : formik.values.phone,
        password : formik.values.password,
        dob : formik.values.dob,
        gender : formik.values.gender,
        profilePic : formik.values.profilePic,
      }
      dispatch( updateProfile(payload) );
    } catch (e) {
      console.log('Error : ',e)
    }
  }

  const formik = useFormik({
		initialValues: {
			firstname : user.first_name,
			lastname : user.last_name,
      email : user.email,
      phone : user.phone,
      dob : user.dob,
      gender : user.gender,
      profilePic: user.profilePic,
		},
		validationSchema,
    onSubmit: updateProfileSubmit
	});

  return (
    <Stack sx={{ background:'#E5E5E5', height:'100%' }}>
      <Stack direction="row" justifyContent="left" alignItems="center" spacing={2} p={1} pl={2} sx={{ background:'#fff' }}>
        <Avatar src={ProfileIcon} alt="profile icon"/>
        <Typography variant="h6" fontWeight="bold">
          Profile
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" sx={{ height:'100%', overflowY:'auto' }} p={2} gap={3}>
        <ProfileCard user={user} flex='0.7' />
        <Box sx={{ flex:'2', textAlign:'left' }} className='box'>
          <form style={{ paddingInline:'50px', width:'70%'}} onSubmit={formik.handleSubmit}>
            <Stack mt={3}>
              <Stack sx={{ display:'flex', flexDirection:'row'}}>
                <Avatar alt="Profile Image" src={image || defaultPic} sx={{ width:'100px', height:'100px', border:'2px solid #979797' }}/>
                <Box sx={{ display:'flex', alignItems:'center'}} pl={4}>
                  <Button variant='outlined' component="label" sx={{ color:'#333', borderColor:'#333', '&:hover':{ borderColor:'#333' } }}>
                    Upload Image 
                    <input type="file" hidden name="profilePic" onChange={handleOnChange} accept="image/*" />
                  </Button>
                </Box>
              </Stack>
              <Grid container columnSpacing={4} rowSpacing={2} mt={2}>
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
                <Grid item sm={6}>
                  <Box>
                    <Button type="submit" variant="contained" color="warning" sx={{ width:'100%' }}> Save </Button>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Stack>
  )
}
