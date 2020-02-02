const {
  users,
  addUser,
  deleteUser,
  getUser,
  getUsersInRoom,
} = require('./users');

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const router = require('./router');

app.use(router);
app.use(cors);

server.listen(PORT, () =>
  console.log(
    `Server started! Listening on port ${PORT}. Timestamp: ${Date.now()}`
  )
);

io.on('connection', socket => {
  console.log(
    `A new client is connected to chat server! Socket is: ${socket.id}.`,
    Date.now()
  );

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
      joinTime: Date.now(),
    });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit('message', {
      user: 'System Admin',
      text: `${user.name}, welcome to the chat room ${user.room}!`,
      sendTime: Date.now(),
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'System Admin',
      text: `${user.name} has joined the chat.`,
      sendTime: Date.now(),
    });

    const users = getUsersInRoom(user.room);
    io.to(user.room).emit('updateUsers', users);
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {
      user: user.name,
      text: message,
      sendTime: Date.now(),
    });

    callback();
  });

  socket.on('disconnect', () => {
    console.log(`User on socket ${socket.id} had disconnected from the server`);
    const user = deleteUser(socket.id);

    if (user && user[0]) {
      io.to(user[0].room).emit('message', {
        user: 'System Admin',
        text: `${user[0].name} has left the chat.`,
        sendTime: Date.now(),
      });
      const users = getUsersInRoom(user[0].room);
      io.to(user[0].room).emit('updateUsers', users);
    }
  });
});
