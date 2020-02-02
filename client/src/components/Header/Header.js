import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    backgroundColor: '#5557bb',
    height: '60px',
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    fontSize: '3vw',
  },
  roomName: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    color: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoutBtn: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#77a',
    height: '25px',
  },
  link: {
    textDecoration: 'none',
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <PeopleOutlineRoundedIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Chat Room 2020
          </Typography>

          {props.logStatus === true && (
            <div className={classes.roomName}>
              <Typography variant='subtitle2'>
                <strong>{props.userName}</strong>, you are in room:{' '}
                <strong>{props.roomName}</strong>
              </Typography>
              <Link
                className={classes.link}
                onClick={props.clickHandler}
                to={'/'}
              >
                <Button
                  className={classes.logoutBtn}
                  variant='contained'
                  color='primary'
                  type='submit'
                  size='small'
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
