import { Stack, CardMedia, Card, Box } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Fancybox } from './Fancybox';

export const MediaPreview = ({ files, deleteMedia, create, fancyBoxName }) => {
  return (
    <Stack gap={2} direction="row" mt={2} sx={{ overflowX:'auto', paddingTop:'10px'}}>
      <Fancybox options={{ infinite: false }}>
        {(files || []).map((file, index) => (  
            <Box sx={{ position:'relative'}} className="mediaBox" key={index}>
              <Card
                sx={{ position:'relative'}}
              >
                <CardMedia 
                  data-fancybox={fancyBoxName}
                  data-type={file.type === 'image' ? "image" : "html5video"}
                  component={file.type === 'image' ? "img" : "video"} 
                  href={create ? file.src : file.base64} 
                  src={create ? file.src : file.base64} 
                  alt={file.type === 'image' ? "media_img" : "media_video"} 
                  sx={{ height:'100px', width:'100px', zIndex:'1000'}}
                />
                {file.type === 'video' && <PlayCircleIcon sx={{position:'absolute', top:'37px', right:'37px', fontSize:'2rem', color:'#ed6c02'}} />}
              </Card>
              {
                create &&
                <CancelIcon 
                className='mediaCancelIcon'
                onClick={() => deleteMedia(file.id)}
                sx={{ position:'absolute', top:'-10px', right:'-10px', zIndex:'1000', color:'#ed6c02' }} 
                />
              }
            </Box>
        ))}
      </Fancybox>
    </Stack>
  )
}
