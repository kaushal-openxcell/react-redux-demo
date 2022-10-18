import { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { createPost } from '../redux/actions/action'

import { Box, Button, Divider, FormLabel, Stack, TextField, Typography } from '@mui/material'
import { DATETIME, RANDOM_NUMBER, TO_BASE_64 } from '../constants'
import { MediaPreview } from '../components/common/MediaPreview'

export const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [media, _setMedia] = useState([])

  const handleOnChange = async (event) => {
    const newMedia = event.target.files
    for (let i = 0; i < newMedia.length; i++) {
      
      const tempFileObj = {
        id: RANDOM_NUMBER(10),
        type: (newMedia[i].type.includes('image')) ? 'image' : 'video',
        src: URL.createObjectURL(newMedia[i]), 
        base64: await TO_BASE_64(newMedia[i])
      }
      _setMedia((prevState) => [...prevState, tempFileObj])
    }
  };
  
  const deleteMedia = (id) => {
    const newMedia = media.filter((file) => file.id !== id);
    _setMedia(newMedia)
  }
  
  const validationSchema = yup.object().shape({
    post : yup.string()
              .min(30, `Post description should be minimum 30 characters!`)
              .max(5000, `Post description should be maximum 5000 characters!`)
              .required('Post description is required!'),
	});

  const submitPost = () => {
    const postValues = {
      post: createPostForm.values.post,
      createdDate: DATETIME.MONTH+'/'+DATETIME.DATE+'/'+DATETIME.YEAR,
      createdTime: new Date().getHours()+':'+new Date().getMinutes(),
      media: media
    }
    dispatch( createPost(postValues) );
    navigate('/dashboard');
  }
  
  const createPostForm = useFormik({
    initialValues:{
      post:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, sed perspiciatis eius mollitia veniam corporis! Consequuntur, optio veniam explicabo laborum tenetur accusamus eligendi! Nulla voluptatibus odio optio harum placeat voluptatum.'
    },
    validationSchema,
    onSubmit: submitPost
  })

  return (
    <Stack sx={{ textAlign:'left'}} px={8} py={2}>
      <Typography variant="h4" fontWeight='bold'>
        Create Post
      </Typography>
      <Box sx={{ width:{ xs:'100%', lg:'50%'}}}>
        <form onSubmit={createPostForm.handleSubmit}>
          <Stack mt={4} gap={2}>
            <Box>
              <FormLabel id="demo-form-control-label-placement">Description</FormLabel>
              <TextField 
                placeholder='Enter post description'
                multiline
                rows={8}
                name="post"
                fullWidth
                value={createPostForm.values.post}
                onChange={createPostForm.handleChange}
                error={createPostForm.touched.post && !!createPostForm.errors.post}
                helperText={createPostForm.errors.post ? createPostForm.errors.post : ''}
                sx={{ mt:"6px", "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "#FF7F00" } } }}
              />
            </Box>
            <Box>
              <Button variant="contained" component="label" color="warning">
                Add Media
                <input type="file" hidden name="media" multiple onChange={handleOnChange} accept="image/*, video/*" />
              </Button>
              <MediaPreview files={media} deleteMedia={deleteMedia} create fancyBoxName="media_files"/>
            </Box>
            <Divider />
            <Box sx={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center' }} gap={2}>
              <Button variant='outlined' color='warning' href="/dashboard"> Cancel </Button>
              <Button variant='contained' color='warning' type="submit"> Create Post </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Stack>
  )
}
