//Styles
import {Wrapper} from './LandingPage.styles'
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../Redux/Reducers';
// import { useEffect } from 'react';
import {Typography} from '@mui/material'

const LandingPage: React.FC = () => {

    // const theme = useTheme();
    // const navigate = useNavigate();

    // const userStatus = useSelector((state: RootState) => state.userStatus);

    // useEffect(() => {
    //     if (userStatus) {
    //         navigate('/home');
    //     }
    // }, []);
    return (
        <Wrapper>
            <Typography variant='h1'>hi</Typography>
        </Wrapper>
    )
}
export default LandingPage