const express = require('express');
const helmet = require('helmet');

const usersRouter = require('./users/users-router.js');

const server = express();

// GLOBAL (custom) middleware
function ensureUpperCaseName(req, res, next) {
    if ("name" in req.body) {
        req.body.name = req.body.name.toUpperCase();
    }
    next();
}

// middleware
server.use(express.json()); // <== this is a built-in middleware
server.use(helmet()); // <== this is a third party middleware, requires 'yarn add'
server.use(ensureUpperCaseName);

// routing
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to Tico's Web-API-III-Challenge Server</h1>
    <h3>This server is running on http://localhost:6000"</h3>
    `);
});

module.exports = server;