const apiUrl = 'https://jsonserver--robertasophiacs.repl.co/investimentos';
var nomesInvestimentos = [];

function verificarInvestimento(evento) {
    nomesInvestimentos = [];
    const tipoInvestimento = evento.target.value;

    if (tipoInvestimento == 'Renda Fixa') {
        nomesInvestimentos = [
            'Tesouro Direto', 'LCI', 'LCA', 'Carteira Digital', 'CDBs'
        ]
    }
    else if (tipoInvestimento == 'Renda Variável') {
        nomesInvestimentos = [
            'Ação em Empresa', 'Cota em Fundo Imobiliário', 'Câmbio', 'Criptomoeda', 'ETF', 'Fundos Multimercados'
        ]
    }

    const qualInvestimento = document.getElementById('selectInvestimento');
    qualInvestimento.innerHTML = '<option value="">Selecionar</option>'

    nomesInvestimentos.forEach((elemento) => {
        qualInvestimento.innerHTML += `<option value="${elemento}">${elemento}</option>`
    })
}

function cadastrarInvestimento(evento) {
    const body = {
        "id_cliente": 1,
        "nome": document.getElementById('inputNome').value,
        "tipo": document.getElementById('selectTipo').value,
        "investimento": document.getElementById('selectInvestimento').value,
        "instituicao": document.getElementById('inputInstituicao').value,
        "valor": document.getElementById('inputValor').value,
        "resgate": 'Imediato',
    }

    console.log(body);

    createContato(body, exibeContatos);
}

function exibeContatos() {
    tabelaInvestimentos = document.getElementById("holderRegistrosInvestimento");

    // Remove todas as linhas do corpo da tabela
    tabelaInvestimentos.innerHTML = "";

    readContato(dados => {
        // Popula a tabela com os registros do banco de dados
        dados.forEach((registro) => {
            tabelaInvestimentos.innerHTML += `
            <div class="holderInvestimento">
                <div class="linhaRegistro">
                    <h3>${registro.instituicao}</h3>
                    <h3>${registro.tipo}</h3>
                </div>
                <div>
                    <h2>${registro.investimento}</h2>
                </div>
                <div class="linhaRegistro">
                    <h4>${registro.valor}</h4>
                    <h4>${registro.resgate}</h4>
                </div>
            </div>`
        })
    })
}

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
