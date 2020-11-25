import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { setUserSession } from '../utils/Common';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(13),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7),
    },
  },
  paper: {
    padding: theme.spacing(5),
    margin: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2, 0, 5),
    textAlign: 'center',
  },
  form: {
    '& > *': {
      marginBottom: theme.spacing(3),
      width: '100%',
    },
  },
  loginBtn: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: 'red',
    textAlign: 'center',
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios.get(`https://parse-wandera.herokuapp.com/parse/login?username=${username}&password=${password}`,
      {
        headers: {
          "X-Parse-Application-Id": "UKB9QAriw4ABOGRwOJ67fXj2Iypx7UQPhj5ZdR66",
          "X-Parse-Rest-Api-Key": "FQ3wONUU2tFb7o8I7nszpAlQkMoxMS6FEbcpXkRz"
        }
      })
      .then(response => {
        setLoading(false);
        setUserSession(response.data.sessionToken, response.data.username);
        props.history.push('/');
      }).catch(error => {
        setLoading(false);
        console.error(error);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h3" color="inherit" className={classes.title}>
          Login
        </Typography>
        <form className={classes.form}>
          <TextField
            type="text"
            id="username"
            label="Username"
            value={username}
            variant="outlined"
            autoComplete="new-password"
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            value={password}
            variant="outlined"
            autoComplete="new-password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            className={classes.loginBtn}
            type="button"
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? 'Loading ...' : 'Login'}
          </Button>
          <Typography variant="h6" color="inherit" className={classes.error}>
            {error && <>{error}</>}
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
