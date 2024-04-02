const assert = require('assert')
const axios = require('axios')

describe('Suite de testes da ApiShopping', () => {
    describe('Suite de testes da rota /Registrar', () => {
        /*
        it('Teste de verificao de tipos de dados', () => {
                const dados = {
                    Nome: 132654347685,
		            Carro: 454,
		            Placa: 54353,
		            HoraEntrada: 2024
                }
            axios.post('http://localhost:1145/Registrar', dados)
            .then((resposta) => {
                console.log('Resposta: ', resposta.data.mensagem)
            })
            .catch((error) => {
                console.log('Error: ', error)
            })

        })
        */
        it('Teste de verificacao de data valida', async () => {
            const dados = {
                Nome: 'LulaMolusco',
                Carro: 'CivicVT',
                Placa: 'kjd4k43',
                HoraEntrada: '2024-01-30T12:59:17.760Z'
            };
        
            try {
                const resposta = await axios.post('http://localhost:1145/Registrar', dados);
                assert.equal(resposta.data.mensagem, 'Usuário cadastrado com sucesso');
                console.log('Resposta: ', resposta.data.mensagem);
            } catch (error) {
                console.error('Error: ', error);
                throw error; // Isso fará o teste falhar caso haja uma exceção.
            }
        });
        

        it('Teste de verificacao de placa valida', (done) => {
            const dados = {
                Nome: 'LulaMolusco',
                Carro: 'CivicVT',
                Placa: 'kjk8s12',
                HoraEntrada: '2024-01-30T12:59:17.760Z'
             }
            axios.post('http://localhost:1145/Registrar', dados)
            .then((resposta) => {
                assert.equal(resposta.data.mensagem, 'Usuário cadastrado com sucesso')
                done()
            })
            .catch((error) => {
                console.log('Erro no teste de verificacao de placa invalida')
                done(error)
            })
        })

    })

    describe.only('Suite de teste da rota /FecharConta', () => {
        /*
        it('Teste de verificao de HoraSaida invalida', () => {
            const dados = {
                Placa: 'jgi3874',
	            HoraSaida: '2024-01-30T12:59:17.760Z'
            }
        axios.post('http://localhost:1145/FecharConta', dados)
        .then((resposta) => {
            console.log('Resposta: ', resposta)
        })
        .catch((error) => {
            console.log('Error: ', error)
        })

       })
       */
       it('Teste de verificao de placa nao cadastrada', () => {
        const dados = {
            Placa: 'kjkszpj',
            HoraSaida: '2024-01-30T12:59:17.760Z'
        }
        axios.post('http://localhost:1145/FecharConta', dados)
        .then((resposta) => {
            console.log('Resposta: ', resposta)
        })
        .catch((error) => {
            console.log('Error: ', error)
        })

       })

    })

    describe('Suite de teste da rota /Pagar', () => {
        it('Teste de verificacao de dados nao nulos', () => {
            const dados = {
                Placa: '',
	           //ValorAPagar: undefined
            }
            axios.post('http://localhost:1145/Pagar', dados)
            .then((resposta) => {
                console.log('Resposta: ', resposta)
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    
        })

        it('Teste de verificacao de placa invalida', () => {
            const dados = {
                Placa: 'jbk',
	            ValorAPagar: 199.90
            }
            axios.post('http://localhost:1145/Pagar', dados)
            .then((resposta) => {
                console.log('Resposta: ', resposta)

            })
            .catch((error) => {
                console.log('Error: ', error)
            })
        })

        it('Teste de verificacao de placa nao cadastrada', () => {
            const dados = {
                Placa: 'jgi3864',
	            ValorAPagar: 199.90
            }
            axios.post('http://localhost:1145/Pagar', dados)
            .then((resposta) => {
                console.log('Resposta: ', resposta)
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
        })

        it('Teste de verificacao de valor monetario invalido', () => {
            const dados = {
                Placa: 'jgi3864',
	            ValorAPagar: 1
            }
            axios.post('http://localhost:1145/Pagar', dados)
            .then((resposta) => {
                console.log('Resposta: ', resposta)
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
        })

    })

})