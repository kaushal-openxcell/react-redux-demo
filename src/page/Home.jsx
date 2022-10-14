import { Stack, Typography } from "@mui/material"
import { Box } from '@mui/material'

export const Home = () => {
  return (
    <Stack sx={{ display:'flex', justifyContent:'center', minHeight:'calc(100vh - 70px)'}}>
      <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', width:"100%"}}>
        <Typography variant="h1">
          Welcome to my first react demo
        </Typography>
      </Box>
    </Stack>
  )
}
