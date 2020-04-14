//cria tabela
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists("ongs", function(table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf").notNullable();
  });
};

//deleta tabela
exports.down = function(knex) {
  return knex.schema.dropTable("ongs");
};