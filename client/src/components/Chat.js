import React, { useState, useEffect } from 'react';
import { Header, Footer } from './Layouts';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import queryString from 'query-string';
import ioClient from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

let socket;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  leftPane: {
    margin: theme.spacing(1),
    width: '20vw',
    height: '70vh',
    backgroundColor: '#effaff',
    color: '#333',
  },
  rightPane: {
    margin: theme.spacing(1),
    width: '60vw',
    height: '70vh',
    backgroundColor: '#effaff',
    color: '#333',
  },

  textInputPane: {
    margin: theme.spacing(1),
    width: '82vw',
    height: '20vh',
    backgroundColor: '#effaff',
    color: '#333',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '80vw',
  },
}));

const Chat = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
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
      <Header clickHandler={logOut} logStatus={true} />

      <div className={classes.root}>
        <Paper className={classes.leftPane} elevation={2}>
          <div color={'blue'}>John</div>
        </Paper>

        <Paper className={classes.rightPane} elevation={2}>
          <ScrollToBottom>
            {messages.map((msg, i) => {
              return (
                <div key={i}>
                  <p>
                    {msg.user}: {msg.text}
                  </p>
                </div>
              );
            })}
          </ScrollToBottom>
        </Paper>

        <Paper className={classes.textInputPane} elevation={2}>
          <div>
            <TextField
              required
              id='filled-multiline-static'
              multiline
              variant='outlined'
              rows='4'
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
          </div>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
