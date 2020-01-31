const {
  users,
  addUser,
  deleteUser,
  getUser,
  getUsersInRoom,
} = require('./users');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

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
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.emit('message', {
      user: 'System Admin',
      text: `${user.name}, welcome to the chat room ${user.room}!`,
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'System Admin',
      text: `${user.name} has joined the chat.`,
    });

    socket.join(user.room);

    const users = getUsersInRoom(user.room);
    io.to(user.room).emit('updateUsers', users);
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log(`User on socket ${socket.id} had disconnected from the server`);
    const user = deleteUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'System Admin',
        text: `${user.name} has left the chat.`,
      });
      const users = getUsersInRoom(user.room);
      io.to(user.room).emit('updateUsers', users);
    }
    console.log(`In the socket disconnect event`);
  });
});
