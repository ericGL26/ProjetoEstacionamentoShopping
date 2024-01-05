const Hapi = require('@hapi/hapi');
const assert = require('assert')
const http = require('http')
const { describe, it } = require('mocha')

describe('Testes API-Herois', () => {
  it('Deve retornar todos os dados', (done) => {
    http.get('http://localhost:2024/RetornarValoresMongo', (res) => {
      let data = ""
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        const responseBody = JSON.parse(data);
        const resultado = (responseBody.length = 0) ? console.log('Valores nao retornados') : console.log('Valores retornados com sucesso')
        done()
      })
    })
  })

  it('Deve retornar apenas os 3 usuarios', (done) => {
    http.get('http://localhost:2024/RetornarComSkipELimit?limit=3', (res) => {
      let data = ""
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        const responseBody = JSON.parse(data)
        const expected = 3
        assert.strictEqual(responseBody.length , expected, 'O tamanho da variavel ultrapassa o limite de 3')
        done()
      })
    })
  })

  it('Deve retornar com skip de 3 usuarios', (done) => {
    http.get('http://localhost:2024/RetornarComSkipELimit?skip=3&limit=1', (res) => {
      let data = ""
      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        const responseBody = JSON.parse(data)
        const idTerceiroLugar = responseBody[0]._id
        assert.strictEqual('653bf56dd45cfdc26e2aa3ba', idTerceiroLugar, 'Skip nao funcionou corretamente, id')
        console.log('IDTE', idTerceiroLugar)
        done()
      })
    })
  })

})