var database = require("../database/config")

function verificarCasa() {
    var instrucaoSql = `select id_selecao_casa from usuarios;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    verificarCasa
}