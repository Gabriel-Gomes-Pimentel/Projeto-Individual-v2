var quizModel = require("../models/quizModel");

function selecionar(req, res) {
    quizModel.selecionar()
        .then((resultado) => {
            if ((resultado.length > 0)) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado");
            }
        })
        .catch((erro) => {
            console.log("\nHouve um erro ao buscar os dados! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var idCasaServer = req.body.idCasaServer;
    var idUserServer = req.body.idUserServer;

    if (!idCasaServer) {
        res.status(400).send("Sua casa está undefined")
        return;
    }

    if (!idUserServer) {
        res.status(400).send("Seu user está undefined")
        return;
    }

    quizModel.atualizarCasaUsuario(idUserServer, idCasaServer)
        .then(() => {

            return quizModel.cadastrar(idUserServer, idCasaServer);
        })
        .then(function (resposta) {
            res.status(201).json({
                mensagem: "Pontuacao enviada ao banco de dados com sucesso!",
                resultado: resposta
            });

        })
        .catch(function (erro) {
            console.error("Erro ao cadastrar pontuacão:", erro.sqlMessage);
            res.status(500).json({
                erro: "Erro ao cadastrar pontuação",
                detalhe: erro.sqlMessage
            });
        });
}

// function totalBruxos(req, res) {
//     quizModel.totalAlunos()
//         .then((resultado) => {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado[0]);
//             } else {
//                 res.status(204).send("Nenhum dado encontrado");
//             }
//         })
//         .catch((erro) => {
//             console.log("Erro ao buscar total de alunos: ", erro.sqlMessage);
//             res.status(500).json(erro.sqlMessage);
//         })
// }

function distribuicao(req, res) {
    quizModel.distribuicaoPartidaPorCasa()
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

// function ranking (req,res) {
//     quizModel.rankingCasas
// }

module.exports = {
    selecionar,
    interesses,
    cadastrar,
    distribuicao
    // totalBruxos
}