const perguntas = [{

    pergunta: "Se você pudesse escolher apenas uma area de magia para praticar qual você escolheria?",
    opcoes: {
        A: "Herbologia",
        B: "Magizologia",
        C: "Feitiços",
        D: "Poções"
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
    opcoes.forEach(opcao => opcao.checked = false);

    const perguntaAtual = perguntas[indicePerguntaAtual];
    document.getElementById('numero-pergunta').innerHTML = `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById('texto-pergunta').innerHTML = perguntaAtual.pergunta;

    if (perguntaAtual.opcoes.A) {
        document.getElementById('texto-opcao-A').innerHTML = perguntaAtual.opcoes.A;
        document.getElementById('opcao-A').style.display = 'inline';
    } else {
        document.getElementById('opcao-A').style.display = 'none';
        document.getElementById('texto-opcao-A').innerHTML = '';
    }

    if (perguntaAtual.opcoes.B) {
        document.getElementById('texto-opcao-B').innerHTML = perguntaAtual.opcoes.B;
        document.getElementById('opcao-B').style.display = 'inline';
    } else {
        document.getElementById('opcao-B').style.display = 'none';
        document.getElementById('texto-opcao-B').innerHTML = '';
    }

    if (perguntaAtual.opcoes.C) {
        document.getElementById('texto-opcao-C').innerHTML = perguntaAtual.opcoes.C;
        document.getElementById('opcao-C').style.display = 'inline';
    } else {
        document.getElementById('opcao-C').style.display = 'none';
        document.getElementById('texto-opcao-C').innerHTML = '';
    }

    if (perguntaAtual.opcoes.D) {
        document.getElementById('texto-opcao-D').innerHTML = perguntaAtual.opcoes.D;
        document.getElementById('opcao-D').style.display = 'inline';
    } else {
        document.getElementById('opcao-D').style.display = 'none';
        document.getElementById('texto-opcao-D').innerHTML = '';
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
            atualizarGrafico(casa);
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
    document.getElementById('mensagem-resultado').innerHTML = `Você foi selecionado para a casa ${casaSelecionada}`;
}

function atualizarGrafico(casaSelecionada) {

    document.getElementById('grafico-container').style.display = 'block';

    const porcentagens = {
        Grifinoria: 0,
        Corvinal: 0,
        LufaLufa: 0,
        Sonserina: 0
    };

    porcentagens[casaSelecionada] = 100;

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