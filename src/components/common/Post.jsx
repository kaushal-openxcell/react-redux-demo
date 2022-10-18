import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from '@mui/material'
import defaultProfile from "../../Assets/image/navbarUser.png"
import { DeleteOutlineTwoTone } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { MediaPreview } from './MediaPreview';
import { dislikePost, likePost } from '../../redux/actions/action';
import { LikesCount } from './LikesCount';

export const Post = ({ post, handleOnClick }) => {
  const [liked, setLiked] = useState(false)

  const dispatch = useDispatch();
  
  const logInUser = useSelector(state => state.loggedInUser)
  const users = useSelector(state => state.users)
  const postUser = users.filter((user) => user.id === post.createdBy)
  
  const isLiked  = post?.likes?.filter((user) => user === logInUser.id)
  if(isLiked.length > 0 && !liked){
    setLiked(true);
  }

  const handleLike = () => {
    liked 
    ? dispatch( dislikePost ({id: post.id, user_id: logInUser.id}) )
    : dispatch( likePost ({id: post.id, user_id: logInUser.id}) )
    
    setLiked(!liked);
  }

  return (
    <Card sx={{ width:'100%', padding:'8px' }}>
      <CardHeader
        avatar={
          <Avatar 
            src={postUser[0].profilePic || defaultProfile} 
            sx={{height:'60px', width:'60px', background:'#E5E5E5'}} 
            aria-label="profilePic" 
          />
        }
        action={
          post.createdBy === logInUser.id && 
          <IconButton aria-label="settings" onClick={() => handleOnClick(post.id)}>
            <DeleteOutlineTwoTone/>
          </IconButton>
        }
        title={ 
          <Typography variant="body1" fontWeight="bold">
            {postUser[0].first_name +' '+ postUser[0].last_name }
          </Typography>
        }
        subheader={
          <Stack direction="row" alignItems="center">
              <CalendarMonthIcon sx={{ fontSize:'1rem', marginRight:'3px'}} />
              {post.createdDate}
              <Divider orientation="vertical" sx={{ margin:'0px 5px'}} />
              <AccessTimeIcon sx={{ fontSize:'1rem', margin:'0px 3px' }}/>
              {post.createdTime}
              <Divider orientation="vertical" sx={{ margin:'0px 5px'}} />
              <IconButton onClick={handleLike} >
                {
                  liked 
                  ? <ThumbUpIcon color="primary" sx={{ fontSize:'1rem'}} />
                  : <ThumbUpOutlinedIcon sx={{ fontSize:'1rem'}} />
                }
              </IconButton>
              <LikesCount likes={post.likes} users={users} logInUser={logInUser} />
          </Stack>
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ whiteSpace:'break-spaces' }}>
          {post.post}
        </Typography>
        <MediaPreview files={post.media} fancyBoxName={`fancyBox_${post.id}`} />
      </CardContent>
    </Card>
  )
}
