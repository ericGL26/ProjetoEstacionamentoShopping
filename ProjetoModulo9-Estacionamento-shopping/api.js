const Hapi = require('@hapi/hapi')
const mongoose = require('mongoose')
const CriarRotasApiShopping = require('./shoppingRoutes')
const Rotas = CriarRotasApiShopping()

const init = async () => {
    const server = Hapi.server({
        port: 1145,
        host: 'localhost'
    });
    
    await mongoose.connect('mongodb://admin:ericdb2024@localhost:27017/ericdb', {
    })

    server.route(Rotas)

    await server.start()
    console.log('Servidor rodando na porta', server.info.uri)
}

process.on('unhandledRejection', (error) => {
    console.log('Error:', error)
    process.exit(1)
})

init()
