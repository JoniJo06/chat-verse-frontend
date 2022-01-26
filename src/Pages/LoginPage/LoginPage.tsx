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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Reducers';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

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

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { userLogin, userStatusSet } = bindActionCreators(actionCreators, dispatch);
  const userStatus = useSelector((state: RootState) => state.userStatus);

  useEffect(() => {
    const fn = async () => {
      if(await userStatus)
        navigate('/home')
    }
    fn();
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
        password: formData.password
      })
      .then((res) => {
        userLogin(res.data.token);
        userStatusSet(res.data.status);
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
export default LoginPage;
