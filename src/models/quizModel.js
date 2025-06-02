var database = require("../database/config")

function atualizarCasaUsuario(idUser, idCasa) {
    var instrucaoSql = ` UPDATE usuarios SET id_selecao_casa = ${idCasa} WHERE id = ${idUser};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarAreaMagicaUsuario(idUser, idAreaMagica) {
    var instrucaoSql = ` UPDATE usuarios SET id_area_magica = ${idAreaMagica} WHERE id = ${idUser};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function distribuicaoResultadoPorCasa() {
    var instrucaoSql = `SELECT 
    c.nome AS casa,
    COUNT(u.id) AS total_usuarios
FROM selecao_casa c
LEFT JOIN usuarios u ON u.id_selecao_casa = c.id
GROUP BY c.id;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function interesseAreaMagica() {
    var instrucaoSql = `SELECT 
    c.nome AS casa,
    a.nome AS areaMagica,
    COUNT(u.id) AS total_interesse
FROM usuarios u
LEFT JOIN selecao_casa c ON u.id_selecao_casa = c.id
LEFT JOIN area_magica a ON u.id_area_magica = a.id
GROUP BY c.nome, a.nome;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    atualizarCasaUsuario,
    atualizarAreaMagicaUsuario,
    distribuicaoResultadoPorCasa,
    interesseAreaMagica
};