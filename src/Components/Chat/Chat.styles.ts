import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const Wrapper = styled(Paper)({
  width: '50vw',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  justifyContent: 'flex-end',

  form: {
    width: '100%',
    padding: '1rem'
  }
});


