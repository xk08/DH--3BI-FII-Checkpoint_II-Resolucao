let tarefasTerminadasUl = document.querySelector(".tarefas-terminadas");

function renderizaTarefasConcluidas(tarefaRecebida) {
    let liTarefaTerminada = document.createElement('li');
    liTarefaTerminada.classList.add("tarefa");
    //liTarefaPendente.setAttribute('class', 'tarefa'); //Outra forma de setar uma classe em um elemento

    liTarefaTerminada.innerHTML =
        `
        <div class="done"></div>
        <div class="descricao">
            <p class="nome">${tarefaRecebida.description}</p>
            <div>
                <button><i id="${tarefaRecebida.id}" class="fas fa-undo-alt change"></i></button>
                <button><i id="${tarefaRecebida.id}" class="far fa-trash-alt"></i></button>
            </div>
        </div>
    `
    //Adiciona a lista principal
    tarefasTerminadasUl.appendChild(liTarefaTerminada);
}

//Captura toda a lista e verifica qual foi o elemento clicado (com o target)
//Também é possível fazer com vento de click no "onclick"
tarefasTerminadasUl.addEventListener('click', function (tarefaClicada) {
    tarefaClicada.preventDefault(); //Impede de atualizar a pagina

    let targetTarefa = tarefaClicada.target; //Captura o alvo (item que foi clicado na tela)
    let cookieJwt = getCookie("jwt");

    //Trocar o status da tarefa para "pendente"
    if (targetTarefa.className == "fas fa-undo-alt change") { //Captura o click no icone da tela
        let escolhaUsuario = confirm("Deseja realmente voltar esta tarefa para as 'Tarefas Pendentes' ?");
        if (escolhaUsuario) {
            atualizaTarefa(tarefaClicada.target.id, false, cookieJwt); // true -> A tarefa passa de "Pendente" para "Finalizada"
        }
    }

    //Deletar uma tarefa por seu id
    if (targetTarefa.className == "far fa-trash-alt") { //Captura o click pelo icone
        let escolhaUsuario = confirm("Deseja realmente deletar esta tarefa ?");
        if (escolhaUsuario) {
            deletarTarefa(tarefaClicada.target.id, cookieJwt);
        }
    }
});