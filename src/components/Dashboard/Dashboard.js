import { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { MainInformation } from './Organization/MainInformation';
import { UsersInfo } from './UsersInfo/UserInfo';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { AdminListItems } from './adminListItems';
import { TestsInfo } from './TestsInfo/TestInfo';
import { EndUserListItems } from './endUserListItems';
import { SectionsWrraper } from './Sections/SectionsWrraper';
import { CreatorListItems } from './creatorListItems';
import { TestsWrraper } from './CreateTests/TestsWrapper';
import { DepartmentsWrraper } from './Departments/DepartmentsWrraper'
import { ExamsWrraper } from './Exams/ExamsWrraper';
import { WaitingForConfirmWrraper } from './Waiting/WaitingForConfirmWrraper';
import { setCurrentOrganization } from '../../store/organizationSlice';
import { useNavigate } from 'react-router';
import { clearCurrentUser } from '../../store/usersSlice';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const mdTheme = createTheme();

function DashboardContent({ dashboardOwner }) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const currentOrganization = useSelector(state => state.organization.currentOrganization);
  const currentUser = useSelector(state => state.users.currentUser);
  const [content, setContent] = useState('nothing');
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(clearCurrentUser());
    navigate('/login');
  }

  useEffect(() => {
    // if (currentUser) {
      dispatch(setCurrentOrganization(currentUser.organization[0]));
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {dashboardOwner.dashboardOwner !== 'enduser'? 
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}>
                {currentOrganization.name}
              </Typography> :
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}>
              </Typography> 
            }
            <IconButton 
              id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClickMenu}
              color="inherit" 
              size="small">
                  {!currentUser.avatar? 
                  <Avatar sx={{ width: 24, height: 24 }} {...stringAvatar(`${currentUser.firstName} ${currentUser.lastName}`)} /> :
                  <Avatar sx={{ width: 24, height: 24 }} alt={`${currentUser.firstName} ${currentUser.lastName}`} src={currentUser.avatar} />}
                  {`${currentUser.firstName} ${currentUser.lastName}`}
            </IconButton>
            <Menu
              size="small"
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
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {dashboardOwner.dashboardOwner === 'admin'? 
            <AdminListItems
              setContent={setContent}
              content={content}
            /> : null}
            {dashboardOwner.dashboardOwner === 'creator'? 
            <CreatorListItems
              setContent={setContent}
              content={content}
            /> : null}
            {dashboardOwner.dashboardOwner === 'enduser'? 
            <EndUserListItems
              setContent={setContent}
              content={content}
            /> : null}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {content === 'maininfo'? <MainInformation /> : <MainInformation display='none'/> }
          {content === 'paymentinfo'? null : null }
          {content === 'users'? <UsersInfo /> : <UsersInfo display='none'/> }
          {/* {content === 'tests'? <MainAdminPage /> : <MainAdminPage display='none'/> } */}
          {content === 'createtests'? <TestsWrraper /> : <TestsWrraper display='none'/> }
          {content === 'applications'? <TestsInfo /> : <TestsInfo display='none'/> }
          {content === 'sections'? <SectionsWrraper /> : <SectionsWrraper display='none'/> }
          {content === 'departments'? <DepartmentsWrraper /> : <DepartmentsWrraper display='none'/> }
          {content === 'exams'? <ExamsWrraper /> : <ExamsWrraper display='none'/> }
          {content === 'waitinglist'? <WaitingForConfirmWrraper display="visible"/> : <WaitingForConfirmWrraper display='none'/> }
          {content === 'nothing'? null : null }
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard({ dashboardOwner }) {
  return <DashboardContent dashboardOwner={dashboardOwner}/>;
}
