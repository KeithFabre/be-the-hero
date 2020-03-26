const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        //page = 1 por padrão
        const { page = 1 } = request.query

        //total de casos (retorna array, [count] para primeira posição) 
        const [count] = await connection('incidents').count()
        //console.log(count) retorn 'count(*)':quantidade


        const incidents = await connection('incidents').select('*')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //relaciona dados das duas tabelas
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value } = request.body

        //id no cabeçalho da req porque faz parte da autenticação
        const ong_id = request.headers.authorization

        //destructuring: primeira chave do array gerada de uma posição é armazenada em id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id) //id do incidente
            .select('ong_id') //confirma se ong_id da ong é compatível
            .first() //apenas 1 resultado

        if (incident.ong_id != ong_id) {
            //401: não autorizado
            return response.status(401).json({ error: 'Unauthorized operation.' })
        }

        await connection('incidents').where('id', id).delete()

        //204: resposta com sucesso mas sem conteúd
        return response.status(204).send()
    }
}