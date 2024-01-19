// Acesse o banco de dados desejado (vamos criar um chamado "estacionamento")
use estacionamento

// Crie a coleção "shoppingGarage" e insira alguns documentos de exemplo
db.createCollection("shoppingGarage")

// Inserir documentos na coleção
db.registros.insertMany([
  {
    nome: "João",
    carro: "Toyota Corolla",
    placa: "ABC1234",
    horaEntrada: ISODate("2024-01-16T12:30:00Z"),
    pagar: false
  },
  {
    nome: "Sadie",
    carro: "Honda Civic",
    placa: "XYZ5678",
    horaEntrada: ISODate("2024-01-16T13:45:00Z"),
    pagar: true
  }
])

// Verificar os documentos na coleção
db.shoppingGarage.find().pretty()
