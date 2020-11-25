import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getUser, removeUserSession } from './utils/Common';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

const useStyles = makeStyles((theme) => ({
  App: {
    minHeight: '100vh',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.black,
    padding: theme.spacing(1, 5),
  },
  content: {
    padding: theme.spacing(13, 0, 6),
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
    if (!user) return;
  }, [user]);

  // handle click event of logout button
  const handleLogout = () => {
    setUser(null);
    removeUserSession();
  }

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/">{user}</NavLink>
            <input type="button" onClick={handleLogout} value="Logout" />
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PublicRoute path="/login" component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
