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

function find(query) {
    let { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
    // limit = Math.min(limit, 10);
    const offset = limit * (page - 1);

    // const response = {
    //     results: data,
    //     pagination: {
    //         page: 2,
    //         limit: 100,
    //         count: 45,
    //         totalRecords: 145,
    //     },
    // };

    let rows = db('users')
        .orderBy(sortby, sortdir)
        .limit(limit)
        .offset(offset);

    return rows;
}