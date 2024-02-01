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

    const CaixaSchema = new mongoose.Schema({
        Saldo: {
            type: Number
        }
    })


    const Usuario = mongoose.model('Usuario', usuarioSchemaRegistros, 'registros')
    const VagasShopping = mongoose.model('Vaga', vagaSchema, 'Vagas')
    const Caixa = mongoose.model('Caixa', CaixaSchema, 'Caixa')


    const RotasApiShopping = [
        {
            method: 'POST',
            path: '/Registrar',
            handler: async (request, h) => {
                   const Vagas = await VagasShopping.find({})
                    const RespostaRotaVaga = Vagas[0].VagasLivres;
                if(RespostaRotaVaga >= 1){
                    try{
                        await VagasShopping.updateOne(
                            { $set: {VagasLivres: RespostaRotaVaga - 1}}
                        )        
                        const { Nome, Carro, Placa, HoraEntrada } = request.payload;
                        const novoUsuario = new Usuario({ Nome, Carro, Placa, HoraEntrada });
                        await novoUsuario.save()
                        
                        return {mensagem: 'Usuário cadastrado com sucesso'}

                    }catch(error){
                        console.log('Deu ruim!, bloco try falhou!', error)
                    }
                }else{
                    console.log('Não há vagas restantes!, Por favor retornar mais tarde..')
                }

            }
        },

        {
            method: 'POST',
            path: '/FecharContaEPagar',
            handler: async (request, h) => {
               try{
                const Requisicao = request.payload;
                const Placa = Requisicao.Placa
                const HoraSaida = new Date(Requisicao.HoraSaida)
                const ResultadoRegistro = await Usuario.find({ Placa: Placa });
                const HoraEntrada = new Date(ResultadoRegistro[0].HoraEntrada)
                 
                const DiferencaDeTempo = HoraSaida.getTime() - HoraEntrada.getTime();
                const horas = Math.floor(DiferencaDeTempo / (1000 * 60 * 60));
                const minutos = Math.floor((DiferencaDeTempo % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((DiferencaDeTempo % (1000 * 60)) / 1000);

                const PrecoPorHora = 6
                const PrecoPorMinuto = 0.10

                const ValorAPagar = horas * PrecoPorHora + PrecoPorMinuto * minutos

                await Caixa.updateOne(
                    { $inc: {Saldo: ValorAPagar}}
                )

                const VagasDB = await VagasShopping.find({})
                const VagasLivresDB = VagasDB[0].VagasLivres;
                await VagasShopping.updateOne(
                    { $set: {VagasLivres: VagasLivresDB + 1}}
                )  

                return `Tempo no estacionamento: ${horas} horas, ${minutos} minutos, ${segundos} segundos, Preço a ser pago: ${ValorAPagar}`
               }catch(error){
                console.log('Deu ruim', error)
               }
            }
        }

    ]
    return RotasApiShopping
}

module.exports = CriarRotasApiShopping