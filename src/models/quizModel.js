var database = require("../database/config")

// function autenticar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucaoSql = `
//         SELECT id, nome, email, fk_selecao_casa FROM usuarios WHERE email = '${email}' AND senha = '${senha}';
//     `;

function atualizarCasaUsuario(idUser, idCasa) {
    var instrucaoSql = ` UPDATE usuarios SET fk_selecao_casa = ${idCasa} WHERE id = ${idUser};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function selecionar() {
    // console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = ` SELECT 
    c.nome AS casa,
    COUNT(u.id) AS total_usuarios,
    ROUND(100 * COUNT(u.id) / (SELECT COUNT(*) FROM usuarios), 2) AS porcentagem
FROM selecao_casa c
LEFT JOIN usuarios u ON u.fk_selecao_casa = c.id
GROUP BY c.id;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(idUserServer, idCasaServer) {
    var instrucaoSql = `INSERT INTO partida (id, fk_usuario, fk_idCasa) VALUES (default, ${idUserServer}, ${idCasaServer});`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function distribuicaoPartidaPorCasa() {
    var instrucaoSql = `Select c.nome AS casa, COUNT(p.id) AS total_partidas FROM selecao_casa c LEFT JOIN partida p ON p.fk_idCasa = c.id GROUP BY c.id`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function interesseAreaMagica() {
    var instrucaoSql = `SELECT 
    c.nome AS casa,
    a.nome AS areaMagica,
    COUNT(u.id) AS total_interesse
FROM usuarios u
JOIN selecao_casa c ON u.fk_selecao_casa = c.id
JOIN area_magica a ON u.fk_area_magica = a.id
GROUP BY c.nome, a.nome;`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function rankingCasas() {
//     var instrucaoSql = `SELECT 
//     s.nome AS casa,
//     MAX(p.pontos) AS maior_pontuacao
// FROM partida p
// JOIN usuarios u ON p.fk_usuario = u.id
// JOIN selecao_casa s ON u.fk_selecao_casa = s.id
// GROUP BY s.id
// ORDER BY maior_pontuacao DESC;`;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
// function cadastrar(nome, email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//  e na ordem de inserção dos dados.
//     var instrucaoSql = `
//         INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    selecionar,
    cadastrar,
    interesseAreaMagica,
    distribuicaoPartidaPorCasa,
    atualizarCasaUsuario
};