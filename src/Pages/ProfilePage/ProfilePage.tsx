import React, { useEffect, useState } from 'react';
import { AntSwitch, Input, Wrapper } from './ProfilePage.styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { ProfilePageTabPanel } from '../../Components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import BlockIcon from '@mui/icons-material/Block';
import RefreshIcon from '@mui/icons-material/Refresh';
import stringAvatar from '../../stringToAvatar';

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  slogan: string;
};

type UserInfoType = {
  profile_pic: string;
  username: string;
  public: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  slogan: string;
  _id: string;
};

interface Friend {
  _id: string;
  profile_pic: string;
  username: string;
}

type FriendsDataType = {
  friend_requests: Friend[];
  pending_requests: Friend[];
  friends: Friend[];
  blocked_users: Friend[];
};

interface MainProps {
}

interface PropsFromState {
  userToken: string;
}

interface PropsFromDispatch {
}

type AllProps = MainProps & PropsFromState & PropsFromDispatch;

const ProfilePage: React.FC<AllProps> = ({ userToken }) => {
  const [ expanded, setExpanded ] = React.useState<string | false>(false);
  const [ tabPage, setTabPage ] = useState<number>(0);
  const [ formData, setFormData ] = useState<FormDataType>({
                                                             first_name: '',
                                                             last_name: '',
                                                             email: '',
                                                             phone: '',
                                                             slogan: '',
                                                           });
  const [ edit, setEdit ] = useState(false);
  const [ usernameEdit, setUsernameEdit ] = useState(false);
  const [ usernameFormData, setUsernameFormData ] = useState('');
  const [ friendsData, setFriendsData ] = useState<FriendsDataType | null>(null);
  const [ fetch, setFetch ] = useState(false);
  const [ togglePublicLoading, setTogglePublicLoading ] = useState(false);
  const [ fetchInfo, setFetchInfo ] = useState(true);
  const [ userInfo, setUserInfo ] = useState<UserInfoType>({
                                                             profile_pic: '',
                                                             username: '',
                                                             public: false,
                                                             first_name: '',
                                                             last_name: '',
                                                             email: '',
                                                             phone: '',
                                                             slogan: '',
                                                             _id: '',
                                                           });

  const handleProfileChange = async (e: any) => {
    e.preventDefault();
    if (!edit) {
      formData.first_name = userInfo.first_name;
      formData.last_name = userInfo.last_name;
      formData.email = userInfo.email;
      formData.phone = userInfo.phone;
      formData.slogan = userInfo.slogan;
      setEdit(!edit);
    } else {
      await axios.put(process.env.REACT_APP_BACKEND_URL + '/users/profile/info', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        slogan: formData.slogan,

      }, { headers: { JWT_TOKEN: userToken } })
        .then(({ data }) => {
          Object.keys(data)
            .forEach((el: string) => {
              //@ts-ignore
              userInfo[el] = data[el];
            });
          toast.success('successful updated');
        })
        .catch(err => console.log(err));
      setFetchInfo(true);
      setEdit(!edit);
    }
  };

  const changeFormData = (e: any) => {
    setFormData((prev: FormDataType) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios(process.env.REACT_APP_BACKEND_URL + '/users/profile/info', {
        headers: { JWT_TOKEN: userToken },
      })
        .then(({ data }) => {
          setUserInfo(data);
        })
        .catch((err) => console.log(err));
      setFetchInfo(false);
    };
    void fetchData();
  }, [ fetchInfo ]);

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setFetch(true);
    setTabPage(newValue);
  };

  const handleChangeUsername = async (e: any) => {
    e.preventDefault();
    if (!usernameEdit) {
      setUsernameFormData(userInfo.username);
      setUsernameEdit(!usernameEdit);
    } else {
      await axios.put(process.env.REACT_APP_BACKEND_URL + '/users/profile/info/username', {
        username: usernameFormData,
      }, { headers: { JWT_TOKEN: userToken } })
        .then(({ data }) => {
          userInfo.username = data.username;
          toast.success('username successful updated');
        })
        .catch(err => console.log(err));
      setFetchInfo(true);
      setUsernameEdit(!usernameEdit);
    }
  };

  const handleExtendedChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const togglePublic = async (e: any) => {
    setTogglePublicLoading(true);
    await axios(
      process.env.REACT_APP_BACKEND_URL + '/users/profile/toggle-public',
      {
        headers: { JWT_TOKEN: userToken },
      },
    )
      .then((res) =>
              setUserInfo((prev: UserInfoType) => {
                return { ...prev, public: res.data.public };
              }),
      )
      .catch((err) => console.log(err));
    setTogglePublicLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends', {
        headers: { JWT_TOKEN: userToken },
      })
        .then((res) => setFriendsData(res.data))
        .catch((err) => console.log(err));
      setFetch(false);
    };
    void fetchData();
  }, [ fetch ]);

  const acceptFriendRequest = async (user_id: string) => {
    await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends/requests/accept/' + user_id, {
      headers: { JWT_TOKEN: userToken },
    })
      .then(() => toast.success('successful'))
      .catch(err => console.log(err));
    setFetch(true)
  };

  const rejectFriendRequest = async (user_id: string) => {
    await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends/requests/reject/' + user_id, {
      headers: { JWT_TOKEN: userToken },
    })
      .then(() => toast.success('successful'))
      .catch(err => console.log(err));
    setFetch(true)
  };

  const cancelPendingFriendRequest = async (user_id: string) => {
    await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends/requests/cancel/' + user_id, {
      headers: { JWT_TOKEN: userToken },
    })
      .then(() => toast.success('successful'))
      .catch(err => console.log(err));
    setFetch(true)
  };

  const removeFriend = async (user_id: string) => {
    await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends/remove/' + user_id, {
      headers: { JWT_TOKEN: userToken },
    })
      .then(() => toast.success('successful'))
      .catch(err => console.log(err));
    setFetch(true)
  };

  const addToBlacklist = async (user_id:string) => {
    await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends/blacklist/add/' + user_id, {
      headers: { JWT_TOKEN: userToken },
    })
      .then(() => toast.success('successful'))
      .catch(err => console.log(err));
    setFetch(true)
  }

  const removeFromBlacklist = async (user_id: string) => {
    await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends/blacklist/remove/' + user_id, {
      headers: { JWT_TOKEN: userToken },
    })
      .then(() => toast.success('successful'))
      .catch(err => console.log(err));
    setFetch(true)
  };

  return (
    <Wrapper>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', mb: '3rem' }}>
        <Tabs value={tabPage} onChange={handleChange} centered>
          <Tab label='My Profile' {...a11yProps(0)} />
          <Tab label='Friends' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <ProfilePageTabPanel value={tabPage} index={0}>
        <div
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            margin: 'auto',
          }}
        >
          {userInfo.profile_pic ? (
            <Avatar
              alt='Remy Sharp'
              src={userInfo.profile_pic}
              sx={{ width: 150, height: 150, margin: 'auto', mb: '2rem' }}
            />

          ) : (
             <Avatar  {...stringAvatar(userInfo.first_name + ' ' + userInfo.last_name, 150, 120)} />
           )}
          <label htmlFor='icon-button-file'>
            <Input
              accept='image/*' id='icon-button-file' type='file' onChange={(e: any) => console.log(e.target.value)}
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
          <form onSubmit={handleChangeUsername}>
            <TextField
              label='Username'
              value={usernameEdit ? usernameFormData : userInfo.username}
              name='username'
              inputProps={{ readOnly: !usernameEdit }}
              onChange={(e: any) => setUsernameFormData(e.target.value)}
            />
            <Button variant='contained' sx={{ mb: '25px' }} type='submit'>
              {!usernameEdit ? 'Change Username' : 'Save Username'}
            </Button>
          </form>
          <Stack
            justifyContent='center' direction='row' spacing={1} alignItems='center'
          >
            <Typography>private</Typography>
            <AntSwitch
              checked={userInfo.public}
              inputProps={{ 'aria-label': 'ant design' }}
              disabled={togglePublicLoading}
              onChange={togglePublic}
            />
            <Typography>public</Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            width: '80%',
            margin: 'auto',
            padding: '2rem',
            boxSizing: 'borderBox',
          }}
        >
          <form onSubmit={handleProfileChange}>
            <Button variant='contained' sx={{ ml: '2rem' }} type='submit'>
              {edit ? 'Save Changes' : 'Edit Profile'}
            </Button>
            <Grid sx={{ margin: 'auto' }} container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='First Name'
                  value={edit ? formData.first_name : userInfo.first_name}
                  name='first_name'
                  fullWidth
                  inputProps={{ readOnly: !edit }}
                  onChange={changeFormData}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Last Name'
                  value={edit ? formData.last_name : userInfo.last_name}
                  name='last_name'
                  fullWidth
                  inputProps={{ readOnly: !edit }}
                  onChange={changeFormData}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Email'
                  value={edit ? formData.email : userInfo.email}
                  name='email'
                  fullWidth
                  inputProps={{ readOnly: !edit }}
                  onChange={changeFormData}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Phone'
                  value={edit ? formData.phone : userInfo.phone}
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
                  value={edit ? formData.slogan : userInfo.slogan}
                  name='slogan'
                  fullWidth
                  inputProps={{ readOnly: !edit }}
                  onChange={changeFormData}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </ProfilePageTabPanel>
      <ProfilePageTabPanel index={1} value={tabPage}>
        <>
          <Tooltip title='refresh'>
            <IconButton onClick={() => setFetch(true)}>
              <RefreshIcon color='secondary' />
            </IconButton>
          </Tooltip>
          <Accordion
            expanded={expanded === 'panel1'} onChange={handleExtendedChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                friend requests
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {friendsData?.friend_requests?.map((el) => {
                return (
                  <div key={el._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body1'>
                      {el.username}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title='accept'>
                        <IconButton onClick={() => acceptFriendRequest(el._id)}>
                          <DoneIcon color='success' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='block'>
                        <IconButton onClick={() => addToBlacklist(el._id)}>
                          <BlockIcon color='warning' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='reject'>
                        <IconButton onClick={() => rejectFriendRequest(el._id)}>
                          <ClearIcon color='error' />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'} onChange={handleExtendedChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} aria-controls='panel2bh-content' id='panel2bh-header'
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                pending requests
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {friendsData?.pending_requests?.map((el) => {
                return (
                  <div key={el._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body1'>
                      {el.username}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title='cancel'>
                        <IconButton onClick={() => cancelPendingFriendRequest(el._id)}>
                          <ClearIcon color='error' />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>

                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'} onChange={handleExtendedChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} aria-controls='panel3bh-content' id='panel3bh-header'
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                friends
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {friendsData?.friends?.map((el) => {
                return (
                  <div key={el._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body1'>
                      {el.username}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title='block'>
                        <IconButton onClick={() => addToBlacklist(el._id)}>
                          <BlockIcon color='warning' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='remove'>
                        <IconButton onClick={() => removeFriend(el._id)}>
                          <DeleteForeverIcon color='error' />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel4'} onChange={handleExtendedChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} aria-controls='panel4bh-content' id='panel4bh-header'
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                blocked users
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {friendsData?.blocked_users?.map((el) => {
                return (
                  <div key={el._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body1'>
                      {el.username}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title='remove'>
                        <IconButton onClick={() => removeFromBlacklist(el._id)}>
                          <ClearIcon color='warning' />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </>
      </ProfilePageTabPanel>
    </Wrapper>
  );
};

const mapStateToProps = ({ userToken }: ApplicationState) => ({
  userToken: userToken.data.userToken,
});
const mapDispatchProps = () => ({});

export default connect(mapStateToProps, mapDispatchProps)(ProfilePage);
