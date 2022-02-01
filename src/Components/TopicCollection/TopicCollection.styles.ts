import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material'

export const Wrapper = styled(Paper)(({theme})=>({
  width: '25vw',
  height: '93.2vh',
  borderRadius: 0,
  borderRight: theme.palette.mode === 'dark' ? '1px solid white' : '1px solid black'
}));

