import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../redux/actions/action';

import { Typography, Box, Stack } from "@mui/material"
import { Post } from "../components/common/Post";

export const Dashboard = () => {
  const dispatch = useDispatch()
  
  const posts = useSelector(state => state.posts);
  
  const handleDeleteSubmit = (id) => {
    dispatch( deletePost({id:id}) );
  }

  return (
    <Stack sx={{ display:'flex', flexDirection:'row', textAlign:'left', background:"#E5E5E5", height:'100%', overflow:'hidden'}}>
      <Box px={8} py={4} sx={{ overflowY:'auto', width:'100%'}}>
        <Typography variant="h4" fontWeight='bold' mb={5}>
          Post List
        </Typography>
        <Stack direction="column" alignItems="center" gap={2}>
          { posts.length > 0 
            ?
              posts.map((post, index) => 
                <Post key={index} post={post} handleOnClick={handleDeleteSubmit}/>
              )
            :
              <Typography variant="subtitle1" sx={{ color:'#979797'  }} mt={15}>
                No posts
              </Typography>
          }
        </Stack>
      </Box>
    </Stack>
  )
}
