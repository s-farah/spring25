const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

mongoose.connect('mongodb://localhost:27017/chatDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Message = mongoose.model('Message', { text: String });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', async (socket) => {
  console.log('A user connected');

  const messages = await Message.find();
  socket.emit('previous messages', messages);

  socket.on('chat message', async (msg) => {
    const message = new Message({ text: msg });
    await message.save();
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
