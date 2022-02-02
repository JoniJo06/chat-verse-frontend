import {styled} from '@mui/material/styles';
import { Paper, Box } from '@mui/material'

export const Wrapper = styled(Paper)(({theme}) => ({
  width: '30vw',
  maxWidth: '200px',
  height: '100%',
  borderRadius: 0,
  borderLeft: theme.palette.mode === 'dark' ? '1px solid white' : '1px solid black'
}));

export const ChatCollectionOptions = styled(Paper)(({theme}) => ({
  borderBottom: theme.palette.mode === 'dark' ? '1px solid white' : '1px solid black',
  height: '50px',
  display: 'flex',
  justifyContent: 'space-around',
  alignContent: 'center',
}))



