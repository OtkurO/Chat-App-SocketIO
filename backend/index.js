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
server.listen(PORT, () =>
  console.log(`Server started! Listening on port ${PORT}.`)
);

io.on('connection', socket => {
  console.log('A new client is connected to chat server!');

  socket.on('disconnet', () => {
    console.log(`User on client ${socket} had disconnected from the server`);
  });
});
