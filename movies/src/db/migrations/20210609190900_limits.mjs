const up = (knex) => {
    console.log("Executing limits migration");
    return knex.schema.createTable("limits", table => {
        table.increments("id");
        table.integer("userid").unsigned().notNullable();
        table.string("monthyear").notNullable();
        table.integer("quota").notNullable().defaultTo(5);
    });
  };
  
  const down = (knex) => {
    console.log("Reverting limits migration");
    return knex.schema.dropTable("limits");
  };
  
  export {
    up,
    down
  };