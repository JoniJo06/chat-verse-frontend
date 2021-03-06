import React, { useEffect, useState } from 'react';
// import { ChangeEvent } from 'react';
import {
  AppBar,
  // Badge,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar, Tooltip,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


import {
  MaterialUISwitch,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  Wrapper,
  AccordionContainer,
} from './AppBar.styles';

import { connect } from 'react-redux';
import { toggleDarkMode } from '../../Redux/Actions';
import { ApplicationState } from '../../Redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ProjectEnum } from '../../Enums';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import stringAvatar from '../../stringToAvatar';

interface SearchUser {
  _id: string;
  username: string;
  profile_pic: string;
}

type SearchResultType = {
  user: SearchUser | null;
  users: SearchUser[];
};

interface PropsFromState {
  darkMode: boolean;
  userToken: string;
}

interface PropsFromDispatch {
  toggleDarkModeFunc: () => any;
}

type Props = PropsFromState & PropsFromDispatch;
const PrimarySearchAppBar: React.FC<Props> = ({
  darkMode,
  toggleDarkModeFunc,
  userToken,
  children,
}) => {
  const [searchResult, setSearchResult] = useState<SearchResultType>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const [searchValue, setSearchValue] = useState('')

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(()=> {
    if (!searchValue.trim()) {
      setSearchResult({ user: null, users: [] });
      return;
    }
     axios(
      String(process.env.REACT_APP_BACKEND_URL) +
        `/search?search=${searchValue}&type=user`
    )
      .then((res) => setSearchResult(res.data))
      .catch((err) => console.log(err));

  }, [searchValue])


  const sendFriendRequest = (user: SearchUser | null) => {
    if (!user) return;
    axios(
      process.env.REACT_APP_BACKEND_URL + `/users/friends/requests/${user._id}`,
      { headers: { JWT_TOKEN: userToken } }
    )
      .then(() => toast.success('Wow so easy!'))
      .catch((err) => console.log(err));
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userToken && (
        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
      )}
      {/* <MenuItem onClick={handleMenuClose}>Mein account</MenuItem> */}
      {!userToken ? (
        <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
      ) : (
        <MenuItem onClick={() => location.reload()}>Logout</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='sticky' sx={{height: '7vh'}}>
          <Toolbar>
            {/*<IconButton*/}
            {/*  size='large'*/}
            {/*  edge='start'*/}
            {/*  color='inherit'*/}
            {/*  aria-label='open drawer'*/}
            {/*  sx={{ mr: 2 }}*/}
            {/*>*/}
            {/*  <MenuIcon />*/}
            {/*</IconButton>*/}
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer'}}
              onClick={() => navigate('/home')}
            >
              {ProjectEnum.APP_NAME.toUpperCase()}
            </Typography>
            <Search className='searchContainer'>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search User'
                inputProps={{ 'aria-label': 'search user' }}
                value={searchValue}
                onChange={(e)=> setSearchValue(e.target.value)}
              />
              <Tooltip title='clear'>

              <IconButton onClick={()=> setSearchValue('')}>
              <HighlightOffIcon color='error' />
              </IconButton>
              </Tooltip>
              <AccordionContainer >
                {searchResult?.user && (
                  <Accordion sx={{ mb: 0 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      {searchResult.user.profile_pic ? (
                        <Avatar
                          sx={{ width: 24, height: 24, mr: '5px' }}
                          src={searchResult.user.profile_pic}
                        />
                      ) : (
                        <Avatar {...stringAvatar(searchResult.user.username, 24)} />
                      )}
                      <Typography>{searchResult.user.username}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      {userToken ? (
                        <Button
                          variant='contained'
                          onClick={() => {
                            sendFriendRequest(searchResult.user)
                            setSearchValue('')
                          }}
                        >
                           Send Friendrequest
                        </Button>
                      ) : (
                        <Typography variant='h6'>
                          Sign in to add Friends
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                )}
                {searchResult?.users.map((element) => {
                  return (
                    <Accordion key={element._id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        {element.profile_pic ? (
                          <Avatar
                            sx={{ width: 24, height: 24, mr: '5px' }}
                            src={element.profile_pic}
                          />
                        ) : (
                          <Avatar {...stringAvatar(element.username, 24)} />
                        )}
                        <Typography>{element.username}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {userToken ? (
                          <Button
                            variant='contained'
                            onClick={() => {
                              sendFriendRequest(element)
                              setSearchValue('')
                            }}
                          >
                            Send Friendrequest
                          </Button>
                        ) : (
                          <Button onClick={() => navigate('/login')}>
                            <Typography variant='subtitle2'>
                              Sign in to add Friends
                            </Typography>
                          </Button>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </AccordionContainer>
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* <IconButton
                size='large'
                aria-label='show 4 new mails'
                color='inherit'
              >
                <Badge badgeContent={4} color='error'>
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size='large'
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <Badge badgeContent={17} color='error'>
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <MaterialUISwitch
                sx={{ m: 1 }}
                onChange={() => toggleDarkModeFunc()}
                checked={darkMode}
              />
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {children}
      </Box>
    </Wrapper>
  );
};
const mapStateToProps = ({ darkMode, userToken }: ApplicationState) => ({
  darkMode: darkMode.data.darkMode,
  userToken: userToken.data.userToken,
});
const mapDispatchProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    toggleDarkModeFunc: () => dispatch(toggleDarkMode()),
  };
};

export default connect(mapStateToProps, mapDispatchProps)(PrimarySearchAppBar);
