const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
    find,
    findById,
    add,
    remove,
    update,
    findUserPosts,
    findPostsById,
    addPost,
};

