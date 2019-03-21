exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(users) {
      users.increments();
      users
        .string('name')
        .notNullable()
        .unique();
    })
    .createTable('posts', function(posts) {
      posts.increments();
      posts.text('text').notNullable();

      posts
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts').dropTableIfExists('users');
};
