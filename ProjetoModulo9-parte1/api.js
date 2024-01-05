const Hapi = require('@hapi/hapi')
const rotasMongoDB = require('./RoutesMongoDB')
const init = async () => {
  const server = Hapi.server({
    port: 2024,
    host: 'localhost'
  })
  const rotas = await rotasMongoDB()
  server.route(rotas)

  try{
    await server.start()
    console.log('Servidor iniciado com sucesso!')
  }catch(error){
    console.log('Não foi possivel iniciar o servidor!')
  }
}

process.on('unhandledRejection', (error) => {
  console.log('Error: ', error)
  process.exit(1)
})

init()