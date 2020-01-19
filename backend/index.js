const express= require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(PORT, ()=> console.log(`Server started! Listening on port ${PORT}.`))
