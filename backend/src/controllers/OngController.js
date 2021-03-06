const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')


module.exports = {

    //listando ongs
    async index (request, response) {
        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },

    async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body
    
    //gerando ID aleatório da ong
    const id = generateUniqueId()

    await connection('ongs').insert({
        id,
        name,
        email, 
        whatsapp,
        city, 
        uf,
    })
    
    //retorna id para ong se cadastrar
    return response.json({ id })
    }
}