//Captura as entradas de dados e ações do usuário na página de cadastro
let campoNomeCadastro = document.getElementById("inputNomeCadastro");
let campoSobrenomeCadastro = document.getElementById("inputSobrenomeCadastro");
let campoEmailCadastro = document.getElementById("inputEmailCadastro");
let campoSenhaCadastro = document.getElementById("inputSenhaCadastro");
let campoRepetirSenhaCadastro = document.getElementById("inputRepetirSenhaCadastro");

let botaoCriarConta = document.getElementById("botaoCriarContaCadastro");

/// Representa o objeto Js do usuário ao realizar o cadastro na API
const usuarioObjetoCadastro = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

botaoCriarConta.addEventListener('click', evento => {
    evento.preventDefault();
    /* 
    NOTA IMPORTANTE:
    - Não foram realizadas normalizações e validações completas neste projeto modelo
        - Porém, os alunos devem realizar estas ações antes de salvar um novo usuário de acordo com a descrição do 2° checkpoint
    */

    //Verifica se todos os campos estão preenchidos (Validação básica)
    if (campoNomeCadastro.value != "" && campoSenhaCadastro.value != "" &&
        campoEmailCadastro.value != "" && campoSenhaCadastro.value != "" &&
        campoRepetirSenhaCadastro.value != "") {

        //Poem as informações da tela no objeto JS
        usuarioObjetoCadastro.firstName = campoNomeCadastro.value;
        usuarioObjetoCadastro.lastName = campoSobrenomeCadastro.value;
        usuarioObjetoCadastro.email = campoEmailCadastro.value;
        usuarioObjetoCadastro.password = campoSenhaCadastro.value;

        //Converte de objeto JS para JSON String
        let objetoUsuarioCadastroJson = JSON.stringify(usuarioObjetoCadastro);

        let configuracaoRequisicao = {
            method: 'POST',
            body: objetoUsuarioCadastroJson,
            headers: {
                'Content-type': 'application/json',
            },
        };

        //Habilita o Spinner na página
        mostrarSpinner();

        /// Timeout atrasa um pouco a resposta e deixa a animação fluir por 2 segundos
        setTimeout(() => {
            //Chamando a API
            fetch(`${apiBaseUrl()}/users`, configuracaoRequisicao)
                .then((response) => {
                    if (response.status == 201) {
                        return response.json();
                    }
                    /* Se o código for diferente de sucesso (201), lança um throw para que a execução caia no Catch() */
                    throw response;
                }).then(function (resposta) {
                    cadastroSucesso(resposta.jwt);
                })
                .catch(error => {
                    cadastroErro(error);
                });

        }, 2000);

    } else {
        alert("Todos os campos devem ser preenchidos para que possa prosseguir");
    }
});

/*  Ao obter o sucesso, recebe o json (token) do usuário*/
function cadastroSucesso(jsonRecebido) {
    console.log("Json recebido ao cadastrar");
    console.log(jsonRecebido);

    //Desabilita o Spinner
    ocultarSpinner();

    alert("Usuário cadastrado com sucesso");

    ///Direciona o usuário para a página de Login
    window.location = "index.html";
}

function cadastroErro(statusRecebido) {
    console.log("Erro ao cadastrar");
    console.log(statusRecebido);

    //Desabilita o Spinner
    ocultarSpinner();
}