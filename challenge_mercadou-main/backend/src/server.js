const express = require('express');
const cors = require('cors');
const server = express();
const routes = require('./routes');

server.use(express.json());
server.use('/server', routes);
server.use(cors());

server.get("/", (req, res) => {
  return res.json({ message: 'API works!' });
});

server.listen(3000, () => {
  console.log('🚀 API works at http://localhost:3000/');
})