import React, { useState, useEffect } from 'react';
import { Wrapper, Input, AntSwitch } from './ProfilePage.styles';
import {
  Avatar,
  Grid,
  Tab,
  Tabs,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import axios from 'axios';

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  public: boolean;
  slogan: string;
};

interface MainProps {}

interface PropsFromState {
  userToken: string;
}

interface PropsFromDispatch {}

type AllProps = MainProps & PropsFromState & PropsFromDispatch;

const ProfilePage: React.FC<AllProps> = ({ userToken }) => {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    public: false,
    slogan: '',
  });
  const [ edit, setEdit ] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleProfileChange = (e: any) => {
    e.preventDefault();
    if (!edit){
      setEdit(!edit)
    } else {
      setEdit(!edit)
    }
  };

  const changeFormData = (e: any) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const fetchData = () => {
      axios(process.env.REACT_APP_BACKEND_URL + '/users/profile', {
        headers: { JWT_TOKEN: userToken },
      }).then(({ data }) => {
        console.log(data);
      });
    };
    void fetchData();
  }, []);


  

  return (
    <Wrapper>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', mb: '3rem' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='My Profile' />
          <Tab label='Friends' />
        </Tabs>
      </Box>
      <div
        style={{
          position: 'relative',
          width: '150px',
          height: '150px',
          margin: 'auto',
        }}
      >
        <Avatar
          alt='Remy Sharp'
          src='data:image/png;base64,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'
          sx={{ width: 150, height: 150, margin: 'auto', mb: '2rem' }}
        />
        <label htmlFor='icon-button-file'>
          <Input
            accept='image/*'
            id='icon-button-file'
            type='file'
            onChange={(e: any) => console.log(e.target.value)}
          />
          <IconButton
            aria-label='upload picture'
            component='span'
            style={{ position: 'absolute', right: '-20px', bottom: '-15px' }}
          >
            <SettingsIcon />
          </IconButton>
        </label>
      </div>
      <Box sx={{ textAlign: 'center' }}>
        <h1>Ober Kek</h1>
        <Stack justifyContent="center" direction='row' spacing={1} alignItems='center'>
                <Typography>private</Typography>
                <AntSwitch
                checked={formData.public}
                  inputProps={{ 'aria-label': 'ant design' }}
                />
                <Typography>public</Typography>
              </Stack>
      </Box>
      <Box
        sx={{
          width: '50%',
          margin: 'auto',
          padding: '2rem',
          boxSizing: 'borderBox',
        }}
      >
        <form onSubmit={handleProfileChange}>
          <Button variant='contained' sx={{ ml: '2rem' }} type='submit'>
            Edit Profile
          </Button>
          <Grid sx={{ margin: 'auto' }} container spacing={5}>
            <Grid item xs={6}>
              <TextField
                label='First Name'
                value={formData.first_name}
                name='first_name'
                fullWidth
                inputProps={{ readOnly: !edit }}
                onChange={changeFormData}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Last Name'
                value={formData.last_name}
                name='last_name'
                fullWidth
                inputProps={{ readOnly: !edit }}
                onChange={changeFormData}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Email'
                value={formData.email}
                name='email'
                fullWidth
                inputProps={{ readOnly: !edit }}
                onChange={changeFormData}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Phone'
                value={formData.phone}
                name='phone'
                fullWidth
                inputProps={{ readOnly: !edit }}
                onChange={changeFormData}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
              multiline
              maxRows={4}
                label='Slogan'
                value={formData.slogan}
                name='slogan'
                fullWidth
                inputProps={{ readOnly: !edit }}
                onChange={changeFormData}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Wrapper>
  );
};

const mapStateToProps = ({ userToken }: ApplicationState) => ({
  userToken: userToken.data.userToken,
});
const mapDispatchProps = () => ({});

export default connect(mapStateToProps, mapDispatchProps)(ProfilePage);
