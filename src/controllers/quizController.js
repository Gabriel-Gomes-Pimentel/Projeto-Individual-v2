var usuarioModel = require("../models/quizModel");
// var aquarioModel = require("../models/aquarioModel");

function selecionar(res) {

    usuarioModel.selecionar()
        .then(
            function (resultadoSelecionar) {
                console.log(`\nResultados encontrados: ${resultadoSelecionar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoSelecionar)}`); // transforma JSON em String

                if (resultadoSelecionar.length == 1) {
                    // console.log(resultadoSelecionar);

                    // aquarioModel.buscarAquariosPorEmpresa(resultadoSelecionar[0].empresaId)
                    //     .then((resultadoAquarios) => {
                    // if (resultadoAquarios.length > 0) {
                    res.json({
                        casa: resultadoSelecionar[0].casa,
                        total_usuarios: resultadoSelecionar[0].total_usuarios,

                        // aquarios: resultadoAquarios
                    });
                    // } else {
                    //     res.status(204).json({ aquarios: [] });
                    // }

                    // } else if (resultadoSelecionar.length == 0) {
                    //     res.status(403).send("Email e/ou senha inválido(s)");
                    // } else {
                    //     res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    // } 
                }
            })
    // .catch(
    //     function (erro) {
    //         console.log(erro);
    //         console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
    //         res.status(500).json(erro.sqlMessage);
    //     }
    // );
}

module.exports = {
    selecionar

}