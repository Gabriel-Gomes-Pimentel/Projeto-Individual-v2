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
    }

    if (!idUserServer) {
        res.status(400).send("Seu user está undefined")
    }

    quizModel.cadastrar(idUserServer, idCasaServer).then(function (resposta) {
        res.status(200).send("Pontuacao enviada ao banco de dados com sucesso!")

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
    cadastrar
}