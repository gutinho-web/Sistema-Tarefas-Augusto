
let tarefas = [];


let matrizTarefas = [];


const formulario = document.getElementById("formTarefa");


function verificarCampos(nome, disciplina, data, prioridade, situacao) {

    if (nome === "") {
        return "Digite o nome da tarefa.";
    } else if (disciplina === "") {
        return "Digite a disciplina.";
    } else if (data === "") {
        return "Informe a data de entrega.";
    } else if (prioridade === "") {
        return "Selecione a prioridade.";
    } else if (situacao === "") {
        return "Selecione a situação.";
    } else {
        return "";
    }
}



function cadastrarTarefa(evento) {

    evento.preventDefault();

    
    const nome = document.getElementById("nome").value.trim();
    const disciplina = document.getElementById("disciplina").value.trim();
    const data = document.getElementById("data").value;
    const prioridade = document.getElementById("prioridade").value;
    const situacao = document.getElementById("situacao").value;

    
    const erro = verificarCampos(
        nome,
        disciplina,
        data,
        prioridade,
        situacao
    );

    if (erro !== "") {

        document.getElementById("mensagem").innerHTML = `
            <div class="alert alert-danger mt-3">
                <i class="fa-solid fa-triangle-exclamation"></i>
                ${erro}
            </div>
        `;

        return;

    } else {

        
        const tarefa = {
            nome: nome,
            disciplina: disciplina,
            data: data,
            prioridade: prioridade,
            situacao: situacao
        };

        
        tarefas.push(tarefa);

       
        matrizTarefas.push([
            nome,
            disciplina,
            data,
            prioridade,
            situacao
        ]);

        document.getElementById("mensagem").innerHTML = `
            <div class="alert alert-success mt-3">
                <i class="fa-solid fa-check"></i>
                Tarefa cadastrada com sucesso!
            </div>
        `;

        
        exibirTarefas();

        
        formulario.reset();
    }
}



function exibirTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    
    if (tarefas.length === 0) {

        lista.innerHTML = `
            <div class="alert alert-info">
                Nenhuma tarefa cadastrada.
            </div>
        `;

    } else {

        
        for (let i = 0; i < tarefas.length; i++) {

            const tarefa = tarefas[i];

            
            let classe = "tarefa";

            if (tarefa.prioridade === "Alta") {
                classe += " prioridade-alta";
            } else if (tarefa.situacao === "Concluída") {
                classe += " concluida";
            } else {
                classe += "";
            }

            lista.innerHTML += `
                <div class="${classe}">

                    <h3>
                        <i class="fa-solid fa-book"></i>
                        ${tarefa.nome}
                    </h3>

                    <p>
                        <strong>Disciplina:</strong>
                        ${tarefa.disciplina}
                    </p>

                    <p>
                        <strong>Entrega:</strong>
                        ${formatarData(tarefa.data)}
                    </p>

                    <p>
                        <strong>Prioridade:</strong>
                        <span class="badge bg-primary">
                            ${tarefa.prioridade}
                        </span>
                    </p>

                    <p>
                        <strong>Situação:</strong>
                        ${tarefa.situacao}
                    </p>

                </div>
            `;
        }
    }
}



function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}



formulario.addEventListener("submit", cadastrarTarefa);


exibirTarefas();