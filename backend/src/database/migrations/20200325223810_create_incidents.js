//cria tabela
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('incidents', function(table) {
        table.increments()

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()

        //relacionamento
        table.string('ong_id').notNullable()

        //chave estrangeira (ong_id precisa estar em ongs)
        table.foreign('ong_id').references('id').inTable('ongs')
    })
  };
  
  //deleta tabela
  exports.down = function(knex) {
    knex.schema.dropTable('incidents') 
  };
  