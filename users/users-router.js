const express = require('express');

const Users = require('./users-model.js');

const router = express.Router();

// this only runs if the url has /api/users in it
router.get('/', async (req, res) => {
    try {
        const users = await Users.find(req.query); 
        res.status(200).json(users);
    } catch (error) {
        // logs error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the users',
        });
    }
});

const error = {
    title: 'Wrong Credentials',
    description: 'The credentials are incorrect',
    recoveryInstructions: 'Please verify your information and try again.',
};

