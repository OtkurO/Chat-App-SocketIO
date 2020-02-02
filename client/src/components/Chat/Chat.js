import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper } from '@material-ui/core';
import queryString from 'query-string';
import ioClient from 'socket.io-client';

let socket;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiOutlinedInput-multiline': {
      '& fieldset': {
        borderColor: '#5557bb',
        borderWidth: 1,
        borderRadius: '10px',
      },
    },
    '&  .MuiFormHelperText-root': {
      color: '#fff',
    },
    '&  #outlined-multiline-static-label': {
      color: '#fff',
    },
  },
  a: {
    textDecoration: 'none',
  },
  leftPane: {
    position: 'fixed',
    margin: 0,
    paddingTop: '65px',
    width: '20%',
    height: '100vh',
    backgroundColor: '#333339',
    color: '#fff',
  },
  nameInList: {
    borderTop: '1px solid #7777aa30',
    borderBottom: '1px solid #7777aa30',
    paddingLeft: '15px',
  },
  rightPane: {
    marginLeft: '20%',
    paddingTop: '60px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'colomn',
    width: '80%',
    height: '100vh',
  },
  rightUpperPane: {
    paddingLeft: '15px',
    width: '100%',
    height: '72vh',
    backgroundColor: '#00000000',
    color: '#fff',
  },

  textInputDiv: {
    borderTop: '1px solid #7777aa30',
    paddingLeft: '10px',
    paddingTop: '10px',
    width: '100%',
    height: '20vh',
    backgroundColor: '#313131',
  },

  textField: {
    margin: '0',
    width: 'calc(100% - 75px)',
  },
  button: {
    margin: '4px',
    width: '62px',
    height: '40px',
    color: '#fff',
    backgroundColor: '#5557bb',
  },
}));

const Chat = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'http://192.168.68.113:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = ioClient(ENDPOINT);

    setUsername(name);
    setRoom(room);

    socket.emit('join', { name, room }, err => console.log(err));

    return () => {
      socket.emit('disconnect');
      socket.close();
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

  const logOut = event => {
    socket.emit('disconnect');
    socket.close();
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
        <div className={classes.rightPane}>
          <div className={classes.rightUpperPane}>
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
          </div>

          <div className={classes.textInputDiv}>
            <TextField
              required
              id='outlined-multiline-static'
              multiline
              variant='outlined'
              rows='3'
              inputProps={{ style: { color: 'white' } }}
              label='Message:'
              className={classes.textField}
              value={message}
              helperText='*For new line press "Shift+Enter"; To send press "Enter" or button.'
              onChange={event => {
                setMessage(event.target.value);
              }}
              onKeyPress={event =>
                event.key === 'Enter' && !event.shiftKey
                  ? sendMessage(event)
                  : null
              }
            />
            <Button
              size='small'
              variant='contained'
              color='primary'
              className={classes.button}
              type='submit'
              onClick={event => sendMessage(event)}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
