import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { setCurrentOrganization } from '../../store/organizationSlice';
import { useEffect } from 'react';
import { useMessages } from '../../hooks/messages.hook';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000/">
        Testetic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export function SignIn() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.users.currentUser);
  const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);
  const navigate = useNavigate();
  const { ErrorMessage, WaitingLoading } = useMessages();
  const [success, setSuccess] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [backDrop, setBackDrop] = React.useState(false);
  // const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    if (data.get('remember')) {
      localStorage.setItem('user', JSON.stringify({
        email: userData.email,
        password: userData.password,
      }));
    }
    console.log(JSON.parse(localStorage.getItem('user')))
    
    dispatch(login(userData));
  };

  useEffect(() => {
    if (usersLoadingStatus === 'loaded') {
      dispatch(setCurrentOrganization(currentUser.organization[0]));
      switch (currentUser.role) {
        case 'CREATOR': 
          setSuccess(true);
          navigate('/creator');
          break;
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'END_USER':
          setSuccess(true);
          navigate('/user');
          break;
        default:
      }
    }
    if (usersLoadingStatus === 'error') {
      setBackDrop(false);
      setShowMessage(true);
    }
    if (usersLoadingStatus === 'loading') {
      setBackDrop(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoadingStatus, success]);

  
  if (success) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <ErrorMessage 
            open={showMessage} 
            setShowMessage={setShowMessage}
            message="Користувач з таким емейл не зарєєстрован в сістемі"/>
          <WaitingLoading backDrop={backDrop} setBackDrop={setBackDrop}/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" name="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
