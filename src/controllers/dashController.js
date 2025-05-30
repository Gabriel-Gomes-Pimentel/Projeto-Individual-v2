var dashModel = require("../models/dashModel");


function verificarCasa(req, res) {
    dashModel.verificarCasa()
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado");
            }
        })
        .catch((erro) => {
            console.log("Erro ao buscar casa selecionada: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
};

module.exports = {
    verificarCasa
};
