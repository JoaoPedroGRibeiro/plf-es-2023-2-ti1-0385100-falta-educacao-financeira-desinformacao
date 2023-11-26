
const apiUrl = 'https://jsonserver-bb--brunobenfica.repl.co/gastos';

function displayMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readGastos(processaDados) {
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

function createGastos(gastos, refreshFunction) {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gastos),
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

function updateGastos(id, gastos, refreshFunction) {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gastos),
  })
    .then(response => response.json())
    .then(data => {
      displayMessage("Gasto alterado com sucesso");
      if (refreshFunction)
        refreshFunction();
    })
    .catch(error => {
      console.error('Erro ao atualizar contato via API JSONServer:', error);
      displayMessage("Erro ao atualizar contato");
    });
}

function deleteGastos(id, refreshFunction) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      displayMessage("Gasto removido com sucesso");
      if (refreshFunction)
        refreshFunction();
    })
    .catch(error => {
      console.error('Erro ao remover contato via API JSONServer:', error);
      displayMessage("Erro ao remover contato");
    });
}
