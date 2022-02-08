import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const Wrapper = styled('div')({
  maxHeight: '80%',
  position: 'relative',
  display:'flex',
  flexDirection: 'column',
  overflow: 'hidden'
})

export const StyledBox = styled(Box)(({theme})=> ({
  maxHeight: '70vh',
  overflowX: 'hidden',
  overflowY: 'scroll',
  position: 'relative',
  flexDirection: 'column',
  display: 'flex',



}))