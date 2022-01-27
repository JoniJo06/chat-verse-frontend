import React, { useEffect } from 'react';
import {} from './LoginPage.styles';
import {
  Grid,
  TextField,
  Paper,
  Avatar,
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { ApplicationState } from '../../Redux';
// import { UserToken } from '../../Redux/Types';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setUserToken, setUserStatus } from '../../Redux/Actions';

const paperStyle = {
  padding: 20,
  minWidth: 200,
  maxWidth: 600,
  margin: '20px auto',
};
const avatarStyle = { backgroundColor: '#1bbd7e' };
const btnstyle = { margin: '20px 0' };

type LoginFormData = {
  username: string;
  password: string;
};

interface PropsFromState {
  userStatus: string;
  userStatusLoading: boolean;
  errors?: string;
}

interface PropsFromDispatch {
  setUserToken: (token: string) => void;
  setUserStatus: (status: string) => void;
}

type AllProps = PropsFromState & PropsFromDispatch

// eslint-disable-next-line @typescript-eslint/no-shadow
const LoginPage: React.FC<AllProps> = ({ userStatus, setUserToken, setUserStatus }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      if (userStatus)
        navigate('/home');
    };
    void fn();
  }, []);

  const handleChange = (e: any) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_BACKEND_URL + '/users/login', {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        setUserToken(res.data.token);
        setUserStatus(res.data.status);
        navigate('/home');
      })
      .catch((err) => console.log(err.message));

    setFormData((prev) => {
      let temp = prev;
      Object.keys(temp).forEach((param: string) => {
        temp = { ...temp, [param]: '' };
      });

      return temp;
    });
  };

  return (
    <Grid container padding='20px'>
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid item style={{ display: 'grid', placeItems: 'center' }}>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h2'>Sign In</Typography>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <TextField
                label='username'
                placeholder='Enter username'
                type='text'
                name='username'
                fullWidth
                required
                onChange={handleChange}
                value={formData.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='password'
                placeholder='Enter password'
                type='password'
                name='password'
                fullWidth
                required
                onChange={handleChange}
                value={formData.password}
              />
            </Grid>
          </Grid>

          {/*<FormControlLabel*/}
          {/*  control={<Checkbox name="checkedB" color="primary" />}*/}
          {/*  label="Remember me"*/}
          {/*/>*/}
          <Button
            type='submit' color='primary' variant='contained' style={btnstyle} fullWidth
          >
            Sign in
          </Button>
        </form>
        {/*<Typography>*/}
        {/*  <Link href="#">Forgot password ?</Link>*/}
        {/*</Typography>*/}
        <Typography>
          {' '}
          Do you haven't an account ?
          <NavLink
            style={{
              color: theme.palette.mode === 'dark' ? 'lightblue' : 'darkblue',
            }} to='/signup'
          >
            Sign up
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = ({ userStatus }: ApplicationState) => ({
  userStatus: userStatus.data.userStatus,
  userStatusLoading: userStatus.loading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    setUserToken: (token: string) => dispatch(setUserToken(token)),
    setUserStatus: (status: string) => dispatch(setUserStatus(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
