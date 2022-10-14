import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { resentOtp, verifyOtp } from '../redux/actions/action'

import{ Stack, Box, Snackbar, Alert, Typography, Button } from '@mui/material'
import { BlueBox } from '../components/common/BlueBox';
import { Footer } from '../components/common/Footer';
import resetPassword from '../Assets/image/Group1299.png'
import { MuiOtpInput } from 'mui-one-time-password-input'

export const VerifyOtp = () => {
  const [response, setResponse] = useState({status:false, type:'', msg:'' })

  const [otp, setOtp] = useState('')
  const users = useSelector(state => state.users);
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const userExists = users.filter((user) => user.id === param.id)
    if(userExists.length === 0){
      navigate('/forgot-password')
    }
  })
  
  const handleChange = (value) => {
    setOtp(value)
  } 
  
  const handelChangeEmail = () => {
    navigate('/forgot-password')
  } 
  
  const handelResentOtp = () => {
    dispatch ( resentOtp({id:param.id}) )
    setResponse({status:true, type:'success', msg:'OTP Sent Successfully'});
  } 
  
  const handleVerifyOtp = () => {
    const userExists = users.filter((user) => (user.id === param.id && user.otp === otp))
    if(userExists.length === 0){
      setResponse({status:true, type:'error', msg:'Invalid OTP'});
    }else{
      dispatch ( verifyOtp({id:param.id}) )
      navigate('/reset-password/'+param.id)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setResponse({status:false, type:'', msg:''});
    }, 4000);
  }, [response.status])

  return (
    <Stack direction='row' sx={{ height:'100%' }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={response.status}
        autoHideDuration={2000}
      >
        {response.status ? <Alert variant="filled" severity={response.type.toString()}>{response.msg}</Alert> : null}
      </Snackbar>
      <BlueBox flex="0 0 30%">
        <Box sx={{ display:"flex", flexDirection:'column', alignItems:'center', justifyContent:"space-evenly", width:'100%' }}>
          <Box sx={{ display:"flex", alignItems:'center', justifyContent:"center"}}>
            <Typography variant="h5" style={{ color:'#FFF', lineHeight:'40px' }} fontWeight="bold" textAlign='left' px={7}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>
          </Box>
          <Box sx={{ display:'flex', justifyContent:'center' }}>
            <img src={resetPassword} alt="Register" style={{ width:'100%' }} />
          </Box>
        </Box>
      </BlueBox>
      <Box sx={{flex:'0 0 50%', display:"flex", flexDirection:"column", justifyContent:"space-between",  marginTop:"80px", paddingInline:"80px"}} >
        <Box sx={{ display:"flex", flexDirection:"column",  marginTop:'20px', textAlign:"left"}}>
          <Typography variant="h4" fontWeight='bold'>
            Verification
          </Typography>
          <Typography variant="h6" style={{ color:'#979797' }} mt={2}>
            We have sent you OTP on your email address
          </Typography>
          <form>
            <Stack mt={6} gap={2} sx={{ width:'50%' }}>
              <Box>
                <MuiOtpInput 
                  value={otp} 
                  onChange={handleChange} 
                  sx={{ gap:4 }} 
                  TextFieldsProps={{ placeholder: '-', sx:'width:100px', type:'number' }}
                />
              </Box>
              <Box sx={{ display:'flex', gap:4, flexDirection:'column'}}>
                <Button color="warning" onClick={handelResentOtp}> Resend </Button>
                <Button disabled={(otp && otp.length === 4) ? false : true} variant="contained" color="warning" onClick={handleVerifyOtp}> Verify </Button>
                <Button color="warning" variant="outlined" onClick={handelChangeEmail}> Change Email </Button>
              </Box>
            </Stack>
          </form>
        </Box>
        <Footer />
      </Box>
    </Stack>
  )
}
