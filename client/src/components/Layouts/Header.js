import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    backgroundColor: '#ddf',
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
  roomName: {
    flexGrow: 1,
    color: 'black',
    marginRight: theme.spacing(1),
  },
  logoutBtn: {
    backgroundColor: 'primary',
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Chat Room 2020
          </Typography>

          {props.logStatus === true && (
            <div>
              <Typography variant='h7' className={classes.roomName}>
                <strong>{props.userName}</strong>, you are in room:{' '}
                <strong>{props.roomName}</strong>
              </Typography>
              <Link onClick={props.clickHandler} to={`/`}>
                <Button
                  className={classes.logoutBtn}
                  variant='contained'
                  color='primary'
                  type='submit'
                >
                  Log out
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
