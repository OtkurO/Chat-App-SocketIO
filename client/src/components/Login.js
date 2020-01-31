import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Layouts';
import { Container, Button, TextField } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');
  const classes = useStyles();
  return (
    <div className='logInOuterContainer'>
      <Header />

      <Container maxWidth='md'>
        <div className='logInOuterContainer'>
          <h1 className='heading'>Welcome to the Chat Room</h1>
          <div>
            <TextField
              required
              id='standard-required-name'
              label='User Name'
              className={classes.textField}
              helperText='User name required to enter the chat room'
              placeholder='Enter username'
              margin='normal'
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              required
              id='standard-required-room'
              label='Chat Room Name'
              className={classes.textField}
              helperText='Chat room name required to enter the chat room'
              placeholder='Enter room name'
              margin='normal'
              onChange={event => {
                setRoomname(event.target.value);
              }}
            />
          </div>
          <Link
            className={classes.link}
            onClick={event =>
              !username || !roomname ? event.preventDefault() : null
            }
            to={`/chat?name=${username}&room=${roomname}`}
          >
            <Button
              size='large'
              variant='contained'
              color='primary'
              className={classes.button}
              endIcon={<TelegramIcon />}
              type='submit'
            >
              Log In
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Login;
