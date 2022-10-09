import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/usersSlice';
import { useNavigate } from 'react-router';
import { useMessages } from '../../hooks/messages.hook';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Testetic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ErrorMessage, WaitingLoading } = useMessages();
  const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);
  const [showMessage, setShowMessage] = React.useState(false);
  const [backDrop, setBackDrop] = React.useState(false);

  const onSubmitUser = (values, { setSubmitting }) => {
    const userData = {
      email: values.email,
      password: values.password,
      name: values.userName,
      firstName: values.firstName,
      lastName: values.lastName,
      active: true,
      role: 'END_USER',
      avatar: '',
    };
    dispatch(register(userData));
    setSubmitting(false);
  }

  React.useEffect(() => {
    if (usersLoadingStatus === 'error') {
      setBackDrop(false);
      setShowMessage(true);
    }
    if (usersLoadingStatus === 'loading') {
      setBackDrop(true);
    }
    if (usersLoadingStatus === 'loaded') {
      setBackDrop(false);
      navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoadingStatus])

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
            message="Користувач з такім емейл вже зарєєстрован в сістемі"/>
          <WaitingLoading backDrop={backDrop} setBackDrop={setBackDrop}/>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik 
            validate={(values) => {
              const errors = {};
              if (!values.userName) errors.userName = "Поле обов'язкове";
              if (!values.email) {errors.email = "Ємейл - обов'язкове поле"
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) errors.email = 'Невалідна ємейл адреса';
              if (!values.password) errors.password = "Поле обов'язкове";
              return errors;
            }}
            onSubmit={onSubmitUser}
            initialValues={{
              firstName: '',
              lastName: '',
              userName: '',
              email: '',
              password: '',
            }}
          >
            {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (
              <Box sx={{ mt: 3 }}>
              <Grid container spacing={2} component={Form}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="firstName"
                    type="firstName"
                    style={{width: "100%"}}
                    label="Ім'я"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    type="lastName"
                    label="Фамілія"
                    name="lastName"
                    style={{width: "100%"}}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    component={TextField}
                    name="userName"
                    type="userName"
                    style={{width: "100%"}}
                    label="Нікнейм"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    style={{width: "100%"}}
                    type="email"
                    label="Ємейл адреса"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    style={{width: "100%"}}
                    name="password"
                    label="Пароль"
                    type="password"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                onClick={submitForm}
                fullWidth
                disabled={Object.values(errors).length !== 0}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  ) 
}
