import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Footer } from './Layouts';
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
}));

const Login = () => {
  const [username, setUsername] = useState('');
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
              id='standard-required'
              label='Normal'
              className={classes.textField}
              helperText='You need to enter a username to enter the chat room'
              placeholder='Enter username'
              margin='normal'
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <Link
            onClick={event => (!username ? event.preventDefault() : null)}
            to={`/chat?name=${username}`}
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
      <Footer />
    </div>
  );
};

export default Login;
