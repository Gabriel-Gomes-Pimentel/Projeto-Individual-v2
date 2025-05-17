CREATE DATABASE HarryPotter;
USE HarryPotter;


/* ============================== TABELA SELECAO_CASA ==================================================
-- Finalidade: Armazena as 4 casas da escola de magia Castelobruxo (equivalente a Hogwarts).
-- Exemplo de uso: Cada usuário será associado a uma dessas casas após fazer o quiz de seleção.
=========================================================================================================
*/
CREATE TABLE selecao_casa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

-- Inserindo as 4 casas do Castelobruxo
INSERT INTO selecao_casa (nome) VALUES
('Tapiréu'), 
('Itapara'), 
('Tibouchina'), 
('Araribóia');

/* ============================== TABELA AREA_MAGICA =====================================================
-- Finalidade: Armazena diferentes áreas do conhecimento mágico (Poções, Herbologia, Magizologia e Feitiços).
-- Exemplo de uso: Cada usuário seleciona a área da magia com que mais se identifica.
=========================================================================================================
*/
CREATE TABLE area_magica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

/* ============================== TABELA USUARIOS ========================================================
-- Finalidade: Representa os bruxos que jogam e fazem o quiz e interagem com o site.
-- Cada usuário está relacionado a uma única casa e a uma única área mágica.
-- autenticado: indica se o usuário está logado (1 = sim, 0 = não).
=========================================================================================================
*/
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    fk_selecao_casa INT,
    fk_area_magica INT,
    autenticado TINYINT(1) DEFAULT 0,
    CONSTRAINT fkUsuariosSelecaoCasa FOREIGN KEY (fk_selecao_casa)
        REFERENCES selecao_casa (id),
    CONSTRAINT fkUsuariosAreaMagica FOREIGN KEY (fk_area_magica)
        REFERENCES area_magica (id)
);

/* ============================== TABELA PARTIDA ==========================================================
-- Finalidade: Registra cada vez que um usuário joga o jogo.
-- Cada partida guarda a data/hora e a pontuação obtida.
-- Um usuário pode jogar várias vezes (N:1 com usuarios).
=========================================================================================================
*/
CREATE TABLE partida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    data_partida DATETIME DEFAULT CURRENT_TIMESTAMP,
    pontos INT NOT NULL,
    CONSTRAINT fkPartidaUsuario FOREIGN KEY (fk_usuario)
        REFERENCES usuarios (id)
);

/*======================================QUERIES===========================================================
1- Porcentagem de usuários por casa
2- Radar: interesses por área mágica de cada casa
3- Mostrar o ranking das casas, baseado na maior pontuação individual de um jogador de cada casa.
==========================================================================================================
*/

-- 1
SELECT 
    c.nome AS casa,
    COUNT(u.id) AS total_usuarios,
    ROUND(100 * COUNT(u.id) / (SELECT COUNT(*) FROM usuarios), 2) AS porcentagem
FROM selecao_casa c
LEFT JOIN usuarios u ON u.fk_selecao_casa = c.id
GROUP BY c.id;


-- 2
SELECT 
    c.nome AS casa,
    a.nome AS areaMagica,
    COUNT(u.id) AS total_interesse
FROM usuarios u
JOIN selecao_casa c ON u.fk_selecao_casa = c.id
JOIN area_magica a ON u.fk_area_magica = a.id
GROUP BY c.nome, a.nome;


-- 3
SELECT 
    s.nome AS casa,
    MAX(p.pontos) AS maior_pontuacao
FROM partida p
JOIN usuarios u ON p.fk_usuario = u.id
JOIN selecao_casa s ON u.fk_selecao_casa = s.id
GROUP BY s.id
ORDER BY maior_pontuacao DESC;

