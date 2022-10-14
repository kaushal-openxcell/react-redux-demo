import { Box } from "@mui/material"

export const BlueBox = ({ flex, children }) => {
  return (
    <Box sx={{display:"flex", backgroundColor:"#2F80ED", flex:flex, height:'100%'}}>
      { children }
    </Box>
  )
}
