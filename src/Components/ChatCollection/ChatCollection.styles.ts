import {styled} from '@mui/material/styles';
import {Paper} from '@mui/material'

export const Wrapper = styled(Paper)(({theme}) => ({
  width: '30vw',
  maxWidth: '200px',
  minHeight: '93.2vh',
  borderRadius: 0,
  borderLeft: theme.palette.mode === 'dark' ? '1px solid white' : '1px solid black'
}));
