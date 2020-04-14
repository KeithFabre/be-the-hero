//Teste de integração vai fazer uma chamada API para testar a aplicação como um todo
//supertest é a biblioteca responsável pelas chamadas API em teste
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

//testando as funcionalidades da ong
describe('ONG', () => {
    //antes de cada teste executa migrations
    beforeEach(async () => {
        await connection.migrate.rollback() //desfazendo as migrations para zerar o db antes de começar o teste
        await connection.migrate.latest()
    })

    //depois de todos os testes desfaz a conexão do teste com o banco
    afterAll(async () => {
        await connection.destroy()
      })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD3",
                email: "contato@contato.com",
                whatsapp: "21912345678",
                city: "Paracambi",
                uf: "RJ"
            })
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})