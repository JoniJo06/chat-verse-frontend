//Styles
import {Wrapper} from './LandingPage.styles'
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
    return (
        <Wrapper>
          <Container maxWidth='xl' sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
            <Typography variant='h1'>Everytime Everywhere Chat-Verse*</Typography>
            <Button sx={{height: '20rem'}}  onClick={() => navigate('/login')} ><Typography  variant='h2'>Login</Typography></Button>
            <Typography variant='subtitle1' sx={{fontSize: 9}}>*Don't use chat-verse, we don't take care about security!</Typography>
          </Container>
        </Wrapper>
    )
}
export default LandingPage