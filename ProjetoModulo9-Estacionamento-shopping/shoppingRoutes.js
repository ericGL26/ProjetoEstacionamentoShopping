const mongoose = require('mongoose')

function CriarRotasApiShopping() {

    const usuarioSchemaRegistros = new mongoose.Schema({
        Nome: {
            type: String,
            required: true
        },
        Carro: {
            type: String,
            required: true
        },
        Placa: {
            type: String,
            required: true
        },
        HoraEntrada: {
            type: Date,
            required: true
        }
    })

    const vagaSchema = new mongoose.Schema({
        VagasLivres: {
            type: Number,
            required: true
        },
        TotalVagas: {
            type: Number,
            required: false
        }
    })

    const Usuario = mongoose.model('Usuario', usuarioSchemaRegistros, 'registros')
    const VagasShopping = mongoose.model('Vaga', vagaSchema, 'Vagas')

    const RotasApiShopping = [
        {
            method: 'POST',
            path: '/Registrar',
            handler: async (request, h) => {
                const Vagas = await VagasShopping.find({})
                const RespostaRotaVaga = Vagas[0].VagasLivres;
                if(RespostaRotaVaga >= 1){
                    try{

                        const { Nome, Carro, Placa, HoraEntrada } = request.payload;
                        const novoUsuario = new Usuario({ Nome, Carro, Placa, HoraEntrada });
                        console.log('nVUSAR', novoUsuario)
                        await novoUsuario.save()
                        return {mensagem: 'Usuário cadastrado com sucesso'}

                    }catch(error){
                        console.log('Deu ruim!, bloco try falhou!', error)
                    }
                }else{
                    console.log('Bloco if ResponstaRotaVaga nao rodou')
                }

            }
        }
    ]
    return RotasApiShopping
}

module.exports = CriarRotasApiShopping