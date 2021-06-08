const up = (knex) => {
  console.log("Executing migration");
  return knex.schema.createTable("movies", table => {
      table.increments("id");
      table.string("title").notNullable().unique();
      table.datetime("released").notNullable();
      table.string("genre").notNullable();
      table.string("director").notNullable();
  });
};

const down = (knex) => {
  console.log("Reverting migration");
  return knex.schema.dropTable("movies");
};

export {
  up,
  down
};