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
    pergunta: "Dia ou Noite?",
    opcoes: {
        A: { texto: "Dia", imagem: "./assets/imgs/dia-noite.png" },
        B: { texto: "Noite", imagem: "./assets/imgs/dia-noite.png" }
    },

    respostas: {
        A: "Grifinoria",
        B: "Sonserina"
    }
},

{
    pergunta: "Fazer trilha ou Nadar?",
    opcoes: {
        A: { texto: "Nadar", imagem: "./assets/imgs/fazer trilha-nadar.png" },
        B: { texto: "Trilha", imagem: "./assets/imgs/fazer trilha-nadar.png" }
    },

    respostas: {
        A: "LufaLufa",
        B: "Corvinal"
    }
},

{
    pergunta: "Se você visse um desconhecido sendo assaldo na sua frente em uma rua deserta:",
    opcoes: {
        A: { texto: "Tiraria a varinha do bolso e lançaria uma maldiação no ladrão", imagem: "./assets/imgs/cenario-assustador.png" },
        B: { texto: "Fingiria que nada aconteceu", imagem: "./assets/imgs/cenario-assustador.png" },
        C: { texto: "Ligaria para a polícia", imagem: "./assets/imgs/cenario-assustador.png" },
        D: { texto: "Acalmaria a vítima depois do assalto", imagem: "./assets/imgs/cenario-assustador.png" }
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

let opcoesAtual = 0;
let letrasAtuais = [];

function iniciarQuiz() {
    document.getElementById('botao-iniciar-quiz').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    carregarPergunta();
}

function carregarPergunta() {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    document.getElementById('numero-pergunta').innerHTML = `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById('texto-pergunta').innerHTML = perguntaAtual.pergunta;

    letrasAtuais = Object.keys(perguntaAtual.opcoes);
    opcoesAtual = 0;

    const carrossel = document.getElementById('carrossel-container');
    carrossel.style.display = 'flex';

    mostrarOpcaoAtual();

    document.getElementById('carrossel-container').style.display = 'flex';
}

function mostrarOpcaoAtual() {
    const letra = letrasAtuais[opcoesAtual];
    const opcao = perguntas[indicePerguntaAtual].opcoes[letra];

    document.getElementById("imagem-opcao").src = opcao.imagem;
    document.getElementById("texto-opcao").innerHTML = opcao.texto;
}

function voltarOpcao() {
    if (opcoesAtual > 0) {
        opcoesAtual--;
        mostrarOpcaoAtual();
    }
}

function avancarOpcao() {
    if (opcoesAtual < letrasAtuais.length - 1) {
        opcoesAtual++;
        mostrarOpcaoAtual();
    }
}

function proximaPergunta() {
    const letraSelecionada = letrasAtuais[opcoesAtual];
    const casa = perguntas[indicePerguntaAtual].respostas[letraSelecionada];

    pontoCasas[casa]++;

    indicePerguntaAtual++
    if (indicePerguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        document.getElementById('carrossel-container').style.display = 'none';
        mostrarResultado();
        atualizarGrafico(pontoCasas);
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