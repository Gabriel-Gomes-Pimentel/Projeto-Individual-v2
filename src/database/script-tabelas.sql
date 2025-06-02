CREATE DATABASE HarryPotter;
USE HarryPotter;


/* ============================== TABELA SELECAO_CASA ==================================================
-- Finalidade: Armazena as 4 casas da escola de magia Castelobruxo (equivalente a Hogwarts).
-- Exemplo de uso: Cada usuário será associado a uma dessas casas após fazer o quiz de seleção.
=========================================================================================================
*/
CREATE TABLE selecao_casa (
    id INT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL
);

-- Inserindo as 4 casas do Castelobruxo
INSERT INTO selecao_casa (id, nome) VALUES
(1, 'Grifinoria'), 
(2,'Corvinal'), 
(3,'Sonserina'), 
(4,'LufaLufa');

/* ============================== TABELA AREA_MAGICA =====================================================
-- Finalidade: Armazena diferentes áreas do conhecimento mágico (Poções, Herbologia, Magizologia e Feitiços).
-- Exemplo de uso: Cada usuário seleciona a área da magia com que mais se identifica.
=========================================================================================================
*/
CREATE TABLE area_magica (
    id INT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL
);

INSERT INTO area_magica (id, nome) VALUES 
(1,'Herbologia'),
(2,'Magizologia'),
(3,'Feitiços'),
(4,'Poções');

/* ============================== TABELA USUARIOS ========================================================
-- Finalidade: Representa os bruxos que jogam e fazem o quiz e interagem com o site.
-- Cada usuário está relacionado a uma única casa e a uma única área mágica.
-- autenticado: indica se o usuário está logado (1 = sim, 0 = não).
=========================================================================================================
*/
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    id_selecao_casa INT,
    id_area_magica INT,
    autenticado TINYINT(1) DEFAULT 0,
    CONSTRAINT fkUsuariosSelecaoCasa FOREIGN KEY (id_selecao_casa)
        REFERENCES selecao_casa (id),
    CONSTRAINT fkUsuariosAreaMagica FOREIGN KEY (id_area_magica)
        REFERENCES area_magica (id)
);

/* ============================== MATERIA_MAGICA ============================== */
CREATE TABLE materia_magica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

INSERT INTO materia_magica (nome) VALUES
('Poções'),
('Feitiços'),
('Transfiguração'),
('Defesa Contra as Artes das Trevas'),
('Astronomia');

/* ============================== TABELA N:N USUARIO_MATERIA ============================== 
Um usuário pode estudar várias matérias.
Uma matéria pode ser estudada por vários usuários.
*/
CREATE TABLE usuario_materia (
    id_usuario INT,
    id_materia INT,
    PRIMARY KEY (id_usuario, id_materia),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_materia) REFERENCES materia_magica(id)
);

/*======================================QUERIES===========================================================
1- Porcentagem de usuários por casa
2- Radar: interesses por área mágica de cada casa
3-listar usuários com matérias que estudam
==========================================================================================================
*/
-- 1
SELECT 
    c.nome AS casa,
    COUNT(u.id) AS total_usuarios
FROM selecao_casa c
LEFT JOIN usuarios u ON u.id_selecao_casa = c.id
GROUP BY c.id;

-- 2 
SELECT 
    c.nome AS casa,
    a.nome AS areaMagica,
    COUNT(u.id) AS total_interesse
FROM usuarios u
LEFT JOIN selecao_casa c ON u.id_selecao_casa = c.id
LEFT JOIN area_magica a ON u.id_area_magica = a.id
GROUP BY c.nome, a.nome;

-- 3
SELECT 
    u.nome AS usuario,
    m.nome AS materia
FROM usuario_materia um
JOIN usuarios u ON um.id_usuario = u.id
JOIN materia_magica m ON um.id_materia = m.id
ORDER BY u.nome;

-- Consulta para listar usuários com suas casas
  SELECT u.id, u.nome, u.email, u.id_selecao_casa,sa.nome as nomeCasa
        FROM usuarios as u
			left JOIN selecao_casa as sa
        ON sa.id = u.id_selecao_casa;
        
        -- Consulta simples para listar as casas dos usuários
        select id_selecao_casa from usuarios;
        
       
      