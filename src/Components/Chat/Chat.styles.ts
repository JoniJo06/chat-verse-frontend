import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const Wrapper = styled(Paper)
(({ theme }) =>
   ({
     position: 'relative',
     width: '80%',
     display: 'flex',
     flexDirection: 'column',
     // flexGrow: '1',
     borderRadius: 0,
     // height: `calc((100% - ${theme.mixins.toolbar.minHeight}px) + 10px)`,
     height: '100%',
     alignItems: 'center',
     justifyContent: 'center',
     boxSizing: 'border-box',
     form: {
       width: '100%',
       height: '10%',
       padding: '1rem',
     },

     '.messagesContainer': {
       position: 'relative',
       // height: `calc( 100vh - 100px - ${theme.mixins.toolbar.minHeight}px)`,
       height: '90%',
       overflowY: 'scroll',
       display: 'flex',
       flexDirection: 'column',
       width: '100%',
     },
   }));





