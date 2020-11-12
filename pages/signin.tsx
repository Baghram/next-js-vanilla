/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from '@components/DashboardLayout';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((themeStyles) => ({
  background: {
    position: 'fixed',
    top: 0,
    width: '100%',
    // minHeight: '100vh',
  },
  paper: {
    marginTop: themeStyles.spacing(20),
    padding: themeStyles.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoTelkom: {
    height: theme.spacing(16),
    width: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: themeStyles.spacing(1),
  },
  submit: {
    margin: themeStyles.spacing(3, 0, 2),
  },
}));

export default function SignIn(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Router = useRouter();
  const classes = useStyles();

  const usernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/userdata/login',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: username,
        password,
      },
    })
      .then((res) => {
        sessionStorage.setItem('token', res.data.token);
        Router.push('/');
      })
      .catch((e) => {
        // eslint-disable-next-line
        console.log(e);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      Router.push('/');
    } else {
      Router.push('/signin');
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.background}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper className={classes.paper}>
            <img
              alt="DigiCorpu"
              src="/images/logo-telkom-warna.png"
              className={classes.logoTelkom}
            />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e: any): any => {
                  usernameInput(e);
                }}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e: any): any => {
                  passInput(e);
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => submitLogin(e)}
              >
                Sign In
              </Button>
            </form>
          </Paper>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
