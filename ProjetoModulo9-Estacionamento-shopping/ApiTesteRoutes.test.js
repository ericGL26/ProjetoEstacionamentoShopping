const assert = require("assert");
const axios = require("axios");

describe("Suite de testes da ApiShopping", () => {
  describe("Suite de testes da rota /Registrar", () => {
    it("Teste de verificacao de data invalida", async () => {
      const dados = {
        Nome: "LulaMolusco",
        Carro: "CivicVT",
        Placa: "kjd4k43",
        HoraEntrada: "123123",
      };

      try {
        const resposta = await axios.post(
          "http://localhost:1145/Registrar",
          dados
        );
        assert.equal(resposta.data, "Placa ou data inválida");
        console.log("Resposta: ", resposta.data);
      } catch (error) {
        console.error("Error: ", error);
        throw error; // Isso fará o teste falhar caso haja uma exceção.
      }
    });

    it("Teste de verificacao de placa invalida", async () => {
      const dados = {
        Nome: "LulaMolusco",
        Carro: "CivicVT",
        Placa: "131123123131312312",
        HoraEntrada: "2024-01-30T12:59:17.760Z",
      };

      try {
        const resposta = await axios.post(
          "http://localhost:1145/Registrar",
          dados
        );
        assert.equal(resposta.data, "Placa ou data inválida");
        console.log("Resposta: ", resposta.data);
      } catch (error) {
        console.error("Error: ", error);
        throw error; // Isso fará o teste falhar caso haja uma exceção.
      }
    });

    it("Cadastrando com sucesso", async () => {
      const dados = {
        Nome: "LulaMolusco",
        Carro: "CivicVT",
        Placa: "kjd4k43",
        HoraEntrada: "2024-01-30T10:19:17.760Z",
      };

      try {
        const resposta = await axios.post(
          "http://localhost:1145/Registrar",
          dados
        );
        assert.equal(resposta.data, "Usuário cadastrado com sucesso");
        console.log("Resposta: ", resposta.data);
      } catch (error) {
        console.error("Error: ", error);
        throw error; // Isso fará o teste falhar caso haja uma exceção.
      }
    });

    it.only("Cadastrando carro já dentro da garagem", async () => {
      const dados = {
        Nome: "LulaMolusco",
        Carro: "CivicVT",
        Placa: "kjd4k43",
        HoraEntrada: "2024-01-30T10:19:17.760Z",
      };

      try {
        const resposta = await axios.post(
          "http://localhost:1145/Registrar",
          dados
        );
        assert.equal(resposta.data, "Carro já cadastrado");
        console.log("Resposta: ", resposta.data);
      } catch (error) {
        console.error("Error: ", error);
        throw error; // Isso fará o teste falhar caso haja uma exceção.
      }
    });
  });

  describe("Suite de teste da rota /FecharConta", () => {
    it("Teste de verificao de placa não cadastrada", () => {
      const dados = {
        Placa: "abt1a98",
        HoraSaida: "2024-01-30T12:59:17.760Z",
      };
      axios
        .post("http://localhost:1145/FecharConta", dados)
        .then((resposta) => {
          console.log("Resposta: tututu", resposta.data.mensagem);
          assert.equal(resposta.data.mensagem, "Usuario não encontrado");
        })
        .catch((error) => {
          console.log("Error: ", error);
          throw error;
        });
    });

    // it("Verificar se saída é anterior a data de entrada", async () => {
    //   const dados = {
    //     Placa: "kjd4k43",
    //     HoraSaida: "2024-01-30T12:59:17.760Z",
    //   };
    //   try {
    //     const resposta = await axios.post(
    //       "http://localhost:1145/FecharConta",
    //       dados
    //     );
    //     assert.equal(resposta.data.message, "Conta fechada com sucesso");
    //   } catch (error) {
    //     console.log("Error: ", error);
    //     throw error;
    //   }
    // });

    it("Fechar conta com sucesso", async () => {
      const dados = {
        Placa: "kjd4k43",
        HoraSaida: "2024-01-30T12:59:17.760Z",
      };
      try {
        const resposta = await axios.post(
          "http://localhost:1145/FecharConta",
          dados
        );
        assert.equal(resposta.data.message, "Conta fechada com sucesso");
      } catch (error) {
        console.log("Error: ", error);
        throw error;
      }
    });
  });

  describe("Suite de teste da rota /Pagar", () => {
    it("Pagamento diferente", async () => {
      const dados = {
        Placa: "kjd4k43",
        ValorAPagar: 160,
      };
      const resposta = await axios.post("http://localhost:1145/Pagar", dados);

      try {
        assert.equal(resposta.data, "Falha no pagamento | Valor não confere");
      } catch (error) {
        console.log("Error: ", error);
        throw error;
      }
    });

    it("Pagamento feito com sucesso", async () => {
      const dados = {
        Placa: "kjd4k43",
        ValorAPagar: 16,
      };
      const resposta = await axios.post("http://localhost:1145/Pagar", dados);
      try {
        assert.equal(resposta.data, "Pagamento foi realizado com sucesso");
      } catch (error) {
        console.log("Error: ", error);
        throw error;
      }
    });
  });
});
