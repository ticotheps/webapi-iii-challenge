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
    recoveryInstructions: 'Please verify your information and try again',
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

// Deletes a user from the current list of 'users' in db.
router.delete('/:id', async (req, res) => {
    try {
        const count = await Users.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: 'The user has been deleted' });
        } else {
            res.status(404).json({ message: 'The user could not be found' });
        }
    } catch (error) {
        // logs error to database
        console.log(error);
        res.status(500).json({
            message: 'Error removing the user'
        });
    }
});

// Finds a user by id and then updates that user's information in db.
router.put('/:id', async (req, res) => {
    try {
        const user = await Users.update(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'The user could not be found' });
        }
    } catch (error) {
        // logs error to database
        console.log(error);
        res.status(500).json({
            message: 'Error updating the user',
        });
    }
});

// This is a sub-route or sub-resource that returns all the posts for a specific user that is found by their id
router.get('/:id/posts', async (req, res) => {
    try {
        const posts = await Users.findUserPosts(req.params.id);

        res.status(200).json(posts);
    } catch (error) {
        // logs error to database
        console.log(error);
        res.status(500).json({
            message: 'Error getting the messages for the hub',
        });
    }
});

// Adds a new post to a user
router.post('/:id/posts', async (req, res) => {
    const postInfo = { ...req.body, user_id: req.params.id };

    try {
        const post = await Users.addPost(postInfo);
        res.status(210).json(post);
    } catch (error) {
        // logs error to database
        console.log(error);
        res.status(500).json({
            message: 'Error getting the posts for the user',
        });
    }
});

module.exports = router;