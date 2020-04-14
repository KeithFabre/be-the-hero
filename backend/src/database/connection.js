const knex = require('knex')
const configuration = require('../../knexfile')

//variável ambiente para teste e desenvolvimento
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(config)

module.exports = connection
