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

function findById(id) {
    return db('users')
        .where({ id }) // <-- What does this id refer to? I don't believe that it is referring
        .first();      // to the 'id' parameter being passed in, but instead, I think that it
}                      // refers to the possible matching 'id' of an existing object in 'users'.

async function add(user) {
    const [id] = await db('users').insert(user); // <-- What is square brackets around 'id' mean?
                                               
    return findById(id);
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes, '*'); // returns the count of users that were successfully updated

function findUserPosts(userId) {
    return db('posts as p')
        .join('users as u', 'p.user_id', 'u.id')
        .select('p.id', 'p.text', 'u.id as userId', 'u.name as user')
        .where({ user_id: userId });
}

function findPostsById(id) {
    return db('posts')
        .where({ id })
        .first();
}

async function addPost(post) {
    const [id] = await db('posts').insert(post); // the square brackets destructures 'id' from the returned array

    return findPostsById(id);
}
