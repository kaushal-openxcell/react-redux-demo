import { useState } from 'react';
import { Dialog, DialogTitle, Typography, IconButton, DialogContent, Box, Divider, Avatar, Stack } from '@mui/material'
import { Close } from '@mui/icons-material';
import defaultProfile from "../../Assets/image/navbarUser.png"

export const LikesCount = ({ likes, users, logInUser }) => {
  const [dialog, setDialog] = useState(false);
  const handleDialogOpen = () => setDialog(true);
  const handleDialogClose = () => setDialog(false);
  const likesString = () => {
    if(likes.length > 1){
      const user = users.filter((user) => user.id === likes[0])
      let user_name = user[0].id === logInUser.id ? 'You' : `${user[0].first_name}`
      return `Liked by ${user_name} and ${(likes.length - 1)} ${(likes.length - 1) > 1 ? 'others' : 'other'}`
    }else if(likes.length === 1){
      const user = users.filter((user) => user.id === likes[0])
      let user_name = user[0].id === logInUser.id ? 'You' : `${user[0].first_name}`
      return `Liked by ${user_name}`
    }else{
      return '0 likes'
    }
  }
  return (
    <>
      <span onClick={handleDialogOpen}>
        {likesString()}
      </span>

      <Dialog
        open={dialog}
        onClose={handleDialogClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle sx={{ m: 0, p: 2, background:'#1976d2', color:'#fff', textAlign:'center'}}>
          {dialog ? (
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          ) : null}
          Liked By
        </DialogTitle>
        <DialogContent sx={{ width:'320px', height:'200px', overflowY:'auto'}}>
          {
            likes?.length > 0 
            ?
              likes.map((like, index) =>  {
                let user = users.filter((user) => user.id === like)
                return (
                  <Box key={index}>
                    <Stack m={2} direction="row" gap={1} alignItems="center">
                        <Avatar src={user[0]?.profilePic || defaultProfile} sx={{ height:'30px', width:'30px', background:'#E5E5E5'}}/>
                        {user[0].id === logInUser.id ? 'You' : `${user[0].first_name} ${user[0].last_name}`}
                    </Stack>
                    <Divider />
                  </Box>
                )
              })
            :
              <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant='body1' color={(theme) => theme.palette.grey[500]} textAlign="center" m={2}>
                  No likes
                </Typography>
              </Box>
          }
        </DialogContent>
      </Dialog>
    </>
  )
}
