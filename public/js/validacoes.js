function validarNome() {
    var nome = input_nome.value;
    if (input_nome.value.length > 0) {
        input_nome.style.border = "1px solid #fff";
        nomeValido = true;
    } else {
        input_nome.style.border = "1px solid red";
        nomeValido = false;
    }
}
function validarEmail() {
    var email = input_email.value;
    if (email.length > 0) {
        if (email.includes('@') && email.includes('.')) {
            input_email.style.border = '1px solid #fff';
            emailValido = true;
        } else {
            input_email.style.border = '1px solid red';
            emailValido = false;
        }
    } else {
        input_email.style.border = '1px solid red';
        emailValido = false;
    }
}
function validarSenha() {
    var senha = input_senha.value;
    input_senha.value = senha.replaceAll("'", '').replaceAll('=', '').replaceAll(';', '').replaceAll('"', '').replaceAll('#', '');

    if (senha.length > 0) {
        boxSenha.style.display = 'block';
    } else {
        boxSenha.style.display = 'none';
    }

    var senhaMaiscula = senha.toUpperCase();
    var senhaMinuscula = senha.toLowerCase();
    var senhaExclamacao = senha.includes('!');
    var senhaArroba = senha.includes('@');
    var senhaSifrao = senha.includes('$');
    var senhaPorcetagem = senha.includes('%');
    var senhaEcomercial = senha.includes('&');
    var senhaAsteristico = senha.includes('*');
    var senhaUnderline = senha.includes('_');
    var senhaPonto = senha.includes('.');
    var senhaNumero = false;
    var letraMaiuscula = false;
    var letraMinusculo = false;

    if (senha != senhaMaiscula) {
        letraMinusculo = true;
    } else {
        letraMinusculo = false;
    }

    if (senha != senhaMinuscula) {
        letraMaiuscula = true;
    } else {
        letraMaiuscula = false;
    }

    if (senha.includes(0)) {
        senhaNumero = true;
    } else if (senha.includes(1)) {
        senhaNumero = true;
    } else if (senha.includes(2)) {
        senhaNumero = true;
    } else if (senha.includes(3)) {
        senhaNumero = true;
    } else if (senha.includes(4)) {
        senhaNumero = true;
    } else if (senha.includes(5)) {
        senhaNumero = true;
    } else if (senha.includes(6)) {
        senhaNumero = true;
    } else if (senha.includes(7)) {
        senhaNumero = true;
    } else if (senha.includes(8)) {
        senhaNumero = true;
    } else if (senha.includes(9)) {
        senhaNumero = true;
    } else {
        senhaNumero = false;
    }

    if (letraMaiuscula) {
        span_maiuscula.style.color = '#fff';
    } else {
        span_maiuscula.style.color = 'red';
    }

    if (letraMinusculo) {
        span_minuscula.style.color = '#fff';
    } else {
        span_minuscula.style.color = 'red';
    }

    if (senhaNumero) {
        span_numero.style.color = '#fff';
    } else {
        span_numero.style.color = 'red';
    }

    if (senhaArroba || senhaExclamacao || senhaSifrao || senhaPorcetagem || senhaEcomercial || senhaAsteristico || senhaUnderline || senhaPonto) {
        span_especial.style.color = '#fff';
    } else {
        span_especial.style.color = 'red';
    }

    if (senha.length >= 8) {
        span_tamanho.style.color = '#fff';
    } else {
        span_tamanho.style.color = 'red';
    }

    if (senha.length > 0) {
        if (senhaNumero && letraMaiuscula && letraMinusculo && (senhaArroba || senhaExclamacao || senhaSifrao || senhaPorcetagem || senhaEcomercial || senhaAsteristico || senhaUnderline || senhaPonto)) {
            input_senha.style.border = '1px solid #fff';
        } else {
            input_senha.style.border = '1px solid red';
        }
    } else {
        input_senha.style.border = '1px solid red';
    }

    senhaValida = (
        senha.length >= 8 &&
        senhaNumero &&
        letraMinusculo &&
        letraMaiuscula &&
        (senhaArroba || senhaExclamacao || senhaSifrao || senhaPorcetagem || senhaEcomercial || senhaAsteristico || senhaUnderline || senhaPonto)
    );
}

function validarCadastro(event) {
    event.preventDefault();

    if (nomeValido && emailValido && senhaValida) {
        var nome = input_nome.value;
        var email = input_email.value;
        var senha = input_senha.value;
        var casa = document.getElementById("selecao_casa").value;
        var areaMagica = document.getElementById("area_magica").value;

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                id_selecao_casaVincularServer: casa,
                id_area_magicaVincularServer: areaMagica
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert("Erro ao cadastrar: " + data.error);

                } else {
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = 'login.html';
                }
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Erro no servidor. Tente novamente");
            });

    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

function alternarVisibilidadeSenha() {

    const inputSenha = document.getElementById('input_senha');
    const iconeOlhoAberto = document.getElementById('iconeOlhoAberto');
    const iconeOlhoFechado = document.getElementById('iconeOlhoFechado');

    if (inputSenha.type == 'password') {
        inputSenha.type = 'text';
        iconeOlhoAberto.style.display = 'inline';
        iconeOlhoFechado.style.display = 'none';
    } else {
        inputSenha.type = 'password'
        iconeOlhoAberto.style.display = 'none';
        iconeOlhoFechado.style.display = 'inline';
    }
}


// function validarLogin(event) {
//     event.preventDefault();

//ESTÁTICO EXEMPLO
//     var emailCorreto = "teste@1123.com";
//     var senhaCorreta = "Senha123."

//     if (senha == senhaCorreta && email == emailCorreto) {
//         input_email.style.border = '1px solid #fff';
//         inpu_senha.style.border = '1px solid #fff'
//     } else {
//         alert('Usuario não encontrado')
//         input_senha.style.border = '1px solid red';
//         inpput_email.style.border = '1px solid red';
//     }
// }




// const luz = document.querySelector('.luz');

// window.addEventListener('mousemove', (e) => {
//     luz.style.setProperty('--x', `${e.clientX}px`);
//     luz.style.setProperty('--y', `${e.clientY}px`);
// })
