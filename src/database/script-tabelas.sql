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

/* ============================== TABELA RESULTADO ==========================================================
-- Finalidade: Registra cada vez que um usuário faz o quiz.
-- Cada quiz guarda a casa selecionada e a área mágica escolhida .
-- Um usuário pode fazer o quiz uma única vez (N:1).
=========================================================================================================
*/
CREATE TABLE resultado (
    id INT AUTO_INCREMENT,
    id_usuario INT,
    fk_idCasa INT,
    fk_idAreaMagica INT,
    CONSTRAINT pkCompostaUsuario PRIMARY KEY (id, id_usuario),
    CONSTRAINT fkResultadoUsuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios (id),
	CONSTRAINT fkResultadoCasa FOREIGN KEY (fk_idCasa)
		REFERENCES selecao_casa(id),
        CONSTRAINT fkResultadoAreaMagica FOREIGN KEY (fk_idAreaMagica)
		REFERENCES area_magica(id)
);


/*======================================QUERIES===========================================================
1- Porcentagem de usuários por casa
2- Radar: interesses por área mágica de cada casa
==========================================================================================================
*/
-- 1
SELECT 
 c.nome AS casa, COUNT(r.id) AS total_resultado
FROM
 selecao_casa c
LEFT JOIN
 resultado r ON r.fk_idCasa = c.id
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

-- Consulta para listar usuários com suas casas
  SELECT u.id, u.nome, u.email, u.id_selecao_casa,sa.nome as nomeCasa
        FROM usuarios as u
			left JOIN selecao_casa as sa
        ON sa.id = u.id_selecao_casa;
        
        -- Consulta simples para listar as casas dos usuários
        select id_selecao_casa from usuarios;