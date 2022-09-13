import * as React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SignIn } from '../SignIn_Up/SignIn';
import { SignUp } from '../SignIn_Up/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { clearCurrentUser } from '../../store/usersSlice';

const drawerWidth = 240;
const navItems = ['Tests', 'Login', 'SignUp'];

function EndUserHeader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [action, setAction] = React.useState('');
  const currentUser = useSelector(state => state.users.currentUser);
  const currentOrganization = useSelector(state => state.organization.currentOrganization);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    dispatch(clearCurrentUser());
    setAction('Login');
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {currentOrganization? currentOrganization.name : null}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => setAction(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {currentOrganization? currentOrganization.name : null}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {currentUser.id? navItems.filter(item => item === 'Tests').map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => setAction(item)}>
                {item}
              </Button>
            )) : 
            navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => setAction(item)}>
                {item}
              </Button>
            ))}
            
          </Box>
          {currentUser.id? (<>
            <IconButton 
              id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClickMenu}
              color="inherit" 
              size="small"
              >
                <AccountCircleIcon/>
                {` ${currentUser.firstName} ${currentUser.lastName} `}
            </IconButton>
            <Menu
              // size="small"
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu></>) : null}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3, margin: "auto" }}>
        <Toolbar />
        {action === 'Login'? <SignIn /> : null}
        {action === 'SignUp'? <SignUp /> : null}
        {props.content}
      </Box>
    </Box>
  );
}

// EndUserHeader.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window: PropTypes.func,
//   };
  
export default EndUserHeader;