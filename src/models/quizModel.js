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

function inserirResultado(idUser, idCasa, idAreaMagica) {
    var instrucaoSql = `INSERT INTO resultado (id, id_usuario, fk_idCasa, fk_idAreaMagica) VALUES (default, ${idUser}, ${idCasa}, ${idAreaMagica});`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function distribuicaoResultadoPorCasa() {
    var instrucaoSql = `Select c.nome AS casa, COUNT(r.id) AS total_resultado FROM selecao_casa c LEFT JOIN resultado r ON r.fk_idCasa = c.id GROUP BY c.id;`;
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
    inserirResultado,
    interesseAreaMagica,
    distribuicaoResultadoPorCasa,
    atualizarCasaUsuario,
    atualizarAreaMagicaUsuario
};