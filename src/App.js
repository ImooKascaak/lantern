import React from 'react';
import { BrowserRouter, Switch, NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BgImage from './assets/table.webp';

import { removeUserSession } from './utils/Common';
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
    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/table.webp)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.black,
    padding: theme.spacing(1, 5),
  },
  content: {
    padding: theme.spacing(10, 0, 0),
    [theme.breakpoints.between('sm', 'md')]: {
      padding: theme.spacing(13, 0, 0),
    }
  },
}));

function App() {
  const classes = useStyles();

  const handleLogout = () => {
    removeUserSession();
  }

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <NavLink exact activeClassName="active" to="/">
              <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="" width="62px" height="50px" />
            </NavLink>
            {/* <NavLink activeClassName="active" to="/login">Login</NavLink> */}
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
