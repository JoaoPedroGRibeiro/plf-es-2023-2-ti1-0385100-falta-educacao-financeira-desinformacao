const apiUrl = 'https://jsonserver--joaoribeiro1485.repl.co/gastos';
const listaGastos = document.getElementById('listaGastos');
const inputBusca = document.getElementById('inputBusca');

let gastos = []; // Para armazenar as organizações carregadas

function exibirLista(gastos) {
  listaGastos.innerHTML = '';

  gastos.forEach((gasto) => {
    const card = document.createElement('div');
    card.classList.add('col', 'col-md-3', 'mb-4');
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${gasto.gasto}</h5>
          <hr>
          <p class="card-text" id="tipo">${gasto.tipo}</p>
          <hr>
          <p class="card-text">R$ ${gasto.preco}</p>
          <hr>
          <p class="card-text">${gasto.data}</p>
          <hr>
          <i><p class="card-text">${gasto.hora}</p></i>
        </div>
      </div>
    `;

    listaGastos.appendChild(card);
  });
}


function displayMessage(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function filtrar() {
  const filtro = inputBusca.value.trim().toLowerCase();
  
  const gastosFiltradas = gastos.filter((gasto) => {
    const nomegasto = gasto.gasto.toLowerCase();

    return nomegasto.includes(filtro);
  });

  exibirLista(gastosFiltradas);
}

inputBusca.addEventListener('input', filtrar); 

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

window.onload = () => {
  readGasto(data => {
    gastos = data; 
    exibirLista(data);
  });
};