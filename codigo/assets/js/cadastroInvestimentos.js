const apiUrl = 'https://jsonserver.rommelpuc.repl.co/contatos'; 

function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readContato(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler contatos via API JSONServer:', error);
            displayMessage("Erro ao ler contatos");
        });
}

function createContato(contato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then(response => response.json())
        .then(data => {
            displayMessage("Contato inserido com sucesso");
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir contato via API JSONServer:', error);
            displayMessage("Erro ao inserir contato");
        });
}
