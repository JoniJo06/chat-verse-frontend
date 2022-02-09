import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const Wrapper = styled(Button)(({theme})=>({
  margin: 0,
  width: '100%',
  borderRadius: 0,
  borderBottom: theme.palette.mode === 'dark' ? '1px solid white' : '1px solid black',
  display: 'flex',
  justifyContent: 'flex-start'
}));

