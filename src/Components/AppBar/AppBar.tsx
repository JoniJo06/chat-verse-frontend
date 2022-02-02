import * as React from 'react';
import {AppBar, Box,Toolbar,IconButton,Typography,Badge, MenuItem, Menu} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import { Search, SearchIconWrapper, StyledInputBase, MaterialUISwitch, Wrapper } from './AppBar.styles';

import { connect } from 'react-redux';
import { toggleDarkMode } from '../../Redux/Actions';
import { DarkMode } from '../../Redux/Types/';
import { ApplicationState} from '../../Redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ProjectEnum } from '../../Enums';
import {useNavigate} from "react-router-dom";


interface PropsFromState {
  data: DarkMode;
  loading: boolean;
  errors?: string;
}

interface PropsFromDispatch {
  toggleDarkMode: () => any;
}

type Props = PropsFromState & PropsFromDispatch
// eslint-disable-next-line @typescript-eslint/no-shadow
const PrimarySearchAppBar: React.FC<Props> = ({ data, toggleDarkMode , children}) => {

  const ToggleDarkMode = () => {
    toggleDarkMode();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate()

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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }} id={menuId} keepMounted transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }} open={isMenuOpen} onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mein account</MenuItem>
      <MenuItem onClick={()=>navigate('/login')}>Login</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }} id={mobileMenuId} keepMounted transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large' aria-label='show 17 new notifications' color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
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
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size='large' edge='start' color='inherit' aria-label='open drawer' sx={{ mr: 2 }}
            >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6' noWrap component='div' sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            {ProjectEnum.APP_NAME.toUpperCase()}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…' inputProps={{ 'aria-label': 'search' }}
              />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size='large' aria-label='show 4 new mails' color='inherit'
              >
              <Badge badgeContent={4} color='error'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large' aria-label='show 17 new notifications' color='inherit'
              >
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <MaterialUISwitch sx={{ m: 1 }} onChange={() => ToggleDarkMode()} checked={data.darkMode} />
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
const mapStateToProps = ({ darkMode }: ApplicationState) => ({
  data: darkMode.data,
  loading: darkMode.loading,
  errors: darkMode.errors
});
const mapDispatchProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    toggleDarkMode: () => dispatch(toggleDarkMode()),
  };
};

export default connect(mapStateToProps, mapDispatchProps)(PrimarySearchAppBar);