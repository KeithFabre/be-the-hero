
//para criar
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
      table.string('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable() //2 para fixar o tamanho do texto
  })
};

//para voltar atrás na criação da tabela
exports.down = function(knex) {
  knex.schema.dropTable('ongs') //deleta
};
