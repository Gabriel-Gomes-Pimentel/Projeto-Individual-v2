const perguntas = [{

    pergunta: "Se você pudesse escolher apenas uma área de magia para praticar qual você escolheria?",
    opcoes: {
        A: { texto: "Herbologia", imagem: "./assets/imgs/herbology-area.webp" },
        B: { texto: "Magizologia", imagem: "./assets/imgs/animologia.png" },
        C: { texto: "Feitiços", imagem: "./assets/imgs/speel-area.webp" },
        D: { texto: "Poções", imagem: "./assets/imgs/potions-area.webp" }
    },
    respostas: {
        A: "LufaLufa",
        B: "Grifinoria",
        C: "Corvinal",
        D: "Sonserina"
    }
},
{
    pergunta: "Dia ou Noite",
    opcoes: {
        A: "Dia",
        B: "Noite"
    },

    respostas: {
        A: "Grifinoria",
        B: "Sonserina"
    }
},

{
    pergunta: "Fazer trilha ou Nadar",
    opcoes: {
        A: "Trilha",
        B: "Nadar"
    },

    respostas: {
        A: "LufaLufa",
        B: "Corvinal"
    }
},

{
    pergunta: "Se você visse um desconhecido sendo assaldo na sua frente em uma rua deserta",
    opcoes: {
        A: "Tiraria a varinha do bolso e lançaria uma maldiação no ladrão",
        B: "Fingiria que nada aconteceu",
        C: "Ligaria para a polícia",
        D: "Acalmaria a vítima depois do assalto"
    },
    respostas: {
        A: "Grifinoria",
        B: "Sonserina",
        C: "Corvinal",
        D: "LufaLufa"
    }
}
];


let indicePerguntaAtual = 0;
let pontoCasas = {
    Grifinoria: 0,
    Corvinal: 0,
    LufaLufa: 0,
    Sonserina: 0

};

function iniciarQuiz() {
    document.getElementById('botao-iniciar-quiz').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    carregarPergunta();
}

function carregarPergunta() {

    const opcoes = document.querySelectorAll('input[name="resposta"]');
    for (let i = 0; i < opcoes.length; i++) {
        opcoes[i].checked = false;
    }

    const perguntaAtual = perguntas[indicePerguntaAtual];
    document.getElementById('numero-pergunta').innerHTML = `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById('texto-pergunta').innerHTML = perguntaAtual.pergunta;

    const letras = ['A', 'B', 'C', 'D'];

    for (let i = 0; i < letras.length; i++) {
        const letra = letras[i];
        const opcao = perguntaAtual.opcoes[letra];
        const label = document.getElementById(`opcao-${letra}`);
        const texto = document.getElementById(`texto-opcao-${letra}`);
        const imagem = document.getElementById(`imagem-opcao-${letra}`);

        // Se for a opção existe e ser um objeto
        if (opcao && typeof opcao == 'object') {
            label.style.display = 'inline-block';
            texto.textContent = opcao.texto
            imagem.src = opcao.imagem;
            // Se for texto
        } else if (typeof opcao == 'string') {
            label.style.display = 'inline-block';
            texto.textContent = opcao;
            // Se imagem não for indefinida
            if (imagem) {
                imagem.src = '';
            }

        } else {
            label.style.display = 'none';
            texto.textContent = '';

            if (imagem) {
                imagem.src = '';
            }
        }
    }
}

function proximaPergunta() {
    const opcaoSelecionada = document.querySelector('input[name= "resposta"]:checked');

    if (opcaoSelecionada) {
        const resposta = opcaoSelecionada.value;
        const casa = perguntas[indicePerguntaAtual].respostas[resposta];
        pontoCasas[casa]++;

        indicePerguntaAtual++
        if (indicePerguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            mostrarResultado();
            atualizarGrafico(pontoCasas);
        }
    } else {
        alert("Por favor, selecione uma resposta!");
    }
}

function mostrarResultado() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';

    let maiorPontuacao = 0;
    let casaSelecionada = '';
    const casas = ["Grifinoria", "Corvinal", "LufaLufa", "Sonserina"];

    for (let i = 0; i < casas.length; i++) {
        const casa = casas[i];
        if (pontoCasas[casa] > maiorPontuacao) {
            maiorPontuacao = pontoCasas[casa];
            casaSelecionada = casa;
        }

    }

    document.getElementById('nome-casa').innerHTML = casaSelecionada;
    document.getElementById('mensagem-resultado').innerHTML = `Você foi selecionado para a casa <br> <br>`;
}

function atualizarGrafico(pontoCasas) {

    document.getElementById('grafico-container').style.display = 'block';

    const total = pontoCasas.Grifinoria + pontoCasas.Corvinal + pontoCasas.LufaLufa + pontoCasas.Sonserina;

    const porcentagens = {
        Grifinoria: (pontoCasas.Grifinoria / total) * 100,
        Corvinal: (pontoCasas.Corvinal / total) * 100,
        LufaLufa: (pontoCasas.LufaLufa / total) * 100,
        Sonserina: (pontoCasas.Sonserina / total) * 100,
    };

    atualizarGraficoBarras(porcentagens);
}

let graficoCasas;

function atualizarGraficoBarras(porcentagens) {
    const ctx = document.getElementById('grafico-casas').getContext('2d');

    if (graficoCasas) {
        graficoCasas.destroy();
    }

    graficoCasas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Grifinoria', 'Corvinal', 'LufaLufa', 'Sonserina'],
            datasets: [{
                label: "Porcentagem(%) de Pessoas por Casa",
                data: [
                    porcentagens.Grifinoria,
                    porcentagens.Corvinal,
                    porcentagens.LufaLufa,
                    porcentagens.Sonserina
                ],
                backgroundColor: ['rgba(255, 0, 0, 0.7)', 'rgba(0, 0, 255, 0.7)', 'rgba(255, 215, 0, 0.7)', 'rgba(0, 128, 0, 0.7)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10,
                        max: 100
                    }
                }
            }
        }
    });

}