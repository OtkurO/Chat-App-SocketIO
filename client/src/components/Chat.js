import React, { useState, useEffect } from 'react';
import { Header } from './Layouts';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import queryString from 'query-string';
import ioClient from 'socket.io-client';
import SendIcon from '@material-ui/icons/Send';

let socket;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  upperPane: {
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100vw',
    height: '70vh',
  },
  leftPane: {
    margin: 0,
    width: '25%',
    height: '100vh',
    backgroundColor: '#ddf',
    color: '#336',
  },
  rightPane: {
    margin: 'auto',
    width: '75%',
    height: '70vh',
    backgroundColor: '#00000000',
    color: '#fff',
  },

  nameInList: {
    borderBottom: '1px solid black',
    borderTop: '1px solid black',
  },

  textInputPane: {
    marginLeft: '25%',
    width: '75%',
    height: '30vh',
    backgroundColor: '#ddf',
  },
  textField: {
    margin: '1%',
    marginTop: theme.spacing(1),
    width: '98%',
    color: 'primary',
  },
  button: {
    marginLeft: '40%',
    width: '20%',
    color: '#eff',
  },
}));

const Chat = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = ioClient(ENDPOINT);

    setUsername(name);
    setRoom(room);

    socket.emit('join', { name, room }, err => console.log(err));

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on('updateUsers', userList => {
      setUsers(userList);
    });
  }, [users]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
      });
    }
  };

  const logOut = () => {
    socket.emit('disconnect');
    socket.off();
  };

  const classes = useStyles();

  return (
    <div>
      <Header
        clickHandler={logOut}
        logStatus={true}
        roomName={room}
        userName={username}
      />

      <div className={classes.root}>
        <div className={classes.upperPane}>
          <Paper className={classes.leftPane} elevation={3}>
            <div className={classes.nameInList}>
              {users.map((user, i) => {
                return (
                  <div key={i}>
                    <p>{user.name}</p>
                  </div>
                );
              })}
            </div>
          </Paper>

          <Paper className={classes.rightPane} elevation={0}>
            <div>
              {messages.map((msg, i) => {
                return (
                  <div key={i}>
                    <p>
                      {msg.user}: {msg.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </Paper>
        </div>

        <Paper className={classes.textInputPane} elevation={3}>
          <div>
            <TextField
              required
              id='filled-multiline-static'
              multiline
              variant='outlined'
              rows='5'
              label='Message:'
              className={classes.textField}
              value={message}
              helperText='Type or send whatever you want and hit send button.'
              margin='normal'
              onChange={event => {
                setMessage(event.target.value);
              }}
              onKeyPress={event =>
                event.key === 'Enter' ? sendMessage(event) : null
              }
            />

            <Button
              size='large'
              variant='contained'
              color='primary'
              className={classes.button}
              endIcon={<SendIcon />}
              type='submit'
            >
              Send
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Chat;
