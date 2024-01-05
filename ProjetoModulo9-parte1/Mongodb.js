const { MongoClient } = require('mongodb')

async function ObterDadosMongoDB() {
  const url = 'mongodb://admin:senhaadmin@localhost:27017/herois?authSource=admin'
  const nomeDB = 'herois'
  
  const client = new MongoClient(url)

  try{
    await client.connect()
     console.log('Conectado ao MongoDB com sucesso!')
     const SelecionarBanco = client.db(nomeDB)
     const colecao = SelecionarBanco.collection('herois')
     const dadosRequisitados = await colecao.find({}).toArray()
     return dadosRequisitados
  }finally{
    await client.close()
  }
}

module.exports = ObterDadosMongoDB