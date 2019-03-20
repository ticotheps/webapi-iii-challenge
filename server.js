const express = require('express');
const helmet = require('helmet');

const server = express();

// middleware
server.use(express.json()); // <== this is a built-in middleware
server.use(helmet()); // <== this is a third party middleware, requires 'yarn add'

module.exports = server;