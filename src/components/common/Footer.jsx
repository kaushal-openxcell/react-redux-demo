import { Box, Typography } from '@mui/material'
import { DATETIME } from '../../constants'

export const Footer = (props) => {
  return (
    <Box sx={{ justifyContent:'end', textAlign:'left', ...props }}>
      <Typography variant="subtitle2" sx={{ justifyContent:'end', marginBottom:'30px',  color:'#979797' }}>
          @{DATETIME.YEAR} All Rights Reserved. Engage Pulse Cookie Preferences, Privacy and Terms
      </Typography>
    </Box>
  )
}
