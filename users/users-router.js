const express = require('express');

const Users = require('./users-model.js');

const router = express.Router();

// This only runs if the url has /api/users in it.
// Returns list of users from db.
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

// Returns a single user, by id, from db.
router.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        // logs error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the user',
        });
    }
});

// Adds a new user to the current list of 'users' in db.
router.post('/', async (req, res) => {
    try {
        const user = await Users.add(req.body);
        res.status(201).json(user);
    } catch (error) {
        // logs error to database
        console.log(error);
        res.status(500).json({
            message: 'Error adding the user',
        })
    }
});