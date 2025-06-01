var quizModel = require("../models/quizModel");

function registrarRespostas(req, res) {
    var idCasaServer = req.body.idCasaServer;
    var idUserServer = req.body.idUserServer;
    var idAreaMagicaServer = req.body.idAreaMagicaServer;

    if (!idCasaServer) {
        res.status(400).send("Sua casa está undefined")
        return;
    }

    if (!idUserServer) {
        res.status(400).send("Seu user está undefined")
        return;
    }

    if (!idAreaMagicaServer) {
        res.status(400).send("Sua casa está undefined")
        return;
    }

    // UTILIZADO PARA ATUALIZAR OS DADOS DOS USUÁRIOS DA ÁREA MÁGICA E A CASA SELECIONADA AO MESMO TEMPO
    Promise.all([
        quizModel.atualizarAreaMagicaUsuario(idUserServer, idAreaMagicaServer),
        quizModel.atualizarCasaUsuario(idUserServer, idCasaServer)
    ])
        .then(() => {

            return quizModel.inserirResultado(idUserServer, idCasaServer, idAreaMagicaServer);
        })
        .then(function (resposta) {
            res.status(201).json({
                mensagem: "Resposta enviada ao banco de dados com sucesso!",
                resultado: resposta
            });

        })
        .catch(function (erro) {
            console.error("Erro ao registrar a resposta:", erro.sqlMessage);
            res.status(500).json({
                erro: "Erro ao registrar a resposta",
                detalhe: erro.sqlMessage
            });
        });
}

function finalizarQuiz(req, res) {
    var idUserServer = req.body.idUserServer;
    var idCasaServer = req.body.idCasaServer;
    var idAreaMagicaServer = req.body.idAreaMagicaServer;

    if (!idUserServer || !idCasaServer) {
        res.status(400).send("Dados incompletos para finalizar o quiz!");
    } else {
        quizModel.atualizarCasaUsuario(idUserServer, idCasaServer)
            .then(() => {

                return quizModel.atualizarAreaMagicaUsuario(idUserServer, idAreaMagicaServer);
            })
            .then(() => {

                return quizModel.inserirResultado(idUserServer, idCasaServer, idAreaMagicaServer);
            })
            .then(() => {
                res.status(200).json({ mensagem: "Quiz finalizado com sucesso!" });
            })
            .catch((erro) => {
                console.log(erro);
                res.status(500).json({ erro: "Erro ao finalizar o quiz" });
            });
    }
}

function distribuicao(req, res) {
    quizModel.distribuicaoResultadoPorCasa()
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado");
            }
        })
        .catch((erro) => {
            console.log("Erro ao buscar distribuição por casa: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
}

function interesses(req, res) {
    quizModel.interesseAreaMagica()
        .then((resultado) => {
            if ((resultado.length > 0)) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado");
            }
        })
        .catch((erro) => {
            console.log("\nHouve um erro ao buscar os dados dos interesses mágicos! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
}

module.exports = {
    registrarRespostas,
    finalizarQuiz,
    distribuicao,
    interesses
}