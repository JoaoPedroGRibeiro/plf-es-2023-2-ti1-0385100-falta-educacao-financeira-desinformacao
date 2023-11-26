const apiUrl = 'https://jsonservertiaw--robertasophiacs.repl.co/gastos';

function init() {
    // Define uma variável para o formulário de contato
    FormGasto = document.getElementById("formActive");

    // Adiciona funções para tratar os eventos 
    btnAdd = document.getElementById("btnAdd");
    btnAdd.addEventListener('click', function () {
        // Verifica se o formulário está preenchido corretamente
        if (!FormGasto.checkValidity()) {
            displayMessage("Preencha o formulário corretamente.");
            return;
        }

        // Obtem os valores dos campos do formulário
        let campoGasto = document.getElementById('inputGasto').value;
        let campoPreco = document.getElementById('inputPreco').value;
        let campoData = document.getElementById('inputData').value;
        let campoHora = document.getElementById('inputHora').value;
        let campoTipo = document.getElementById('inputTipo').value;

        // Cria um objeto com os dados do contato
        let gastos = {
            gasto: campoGasto,
            preco: campoPreco,
            data: campoData,
            hora: campoHora,
            tipo: campoTipo,
        };

        // Cria o contato no banco de dados
        createGasto(gastos);

        // Limpa o formulario
        FormGasto.reset()
    });
}

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readGasto(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler gastos via API JSONServer:', error);
            displayMessage("Erro ao ler gastos");
        });
}

function createGasto(gastos, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gastos),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Gasto inserido com sucesso!");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir gasto via API JSONServer:', error);
            displayMessage("Erro ao inserir o gasto");
        });
}