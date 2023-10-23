
const apiUrl = 'https://jsonserver--robertasophiacs.repl.co/investimentos';
var nomesInvestimentos = [];
var imediato = false;

function verificarResgate(evento) {
    const dataResgate = document.getElementById('inputResgate');
    dataResgate.readOnly = false;
    imediato = false;

    if (evento.target.checked) {
        dataResgate.value = '';
        dataResgate.readOnly = true;
        imediato = true;
    }
}

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
    evento.preventDefault();

    const body = {
        "id_cliente": 1,
        "nome": document.getElementById('inputNome').value,
        "tipo": document.getElementById('selectTipo').value,
        "investimento": document.getElementById('selectInvestimento').value,
        "instituicao": document.getElementById('inputInstituicao').value,
        "valor": document.getElementById('inputValor').value,
        "resgate": imediato ? 'Imediato' : document.getElementById('inputResgate').value
    }

    criarInvestimento(body, refrescarPagina);
}

function refrescarPagina() {
    fecharForm();
    exibeInvestimentos();
}

function exibeInvestimentos() {
    tabelaInvestimentos = document.getElementById("holderRegistrosInvestimento");

    tabelaInvestimentos.innerHTML = "";

    lerDados(dados => {
        dados.forEach((registro) => {
            const letters = '0123456789ABCDEF';
            let color = '#';

            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            tabelaInvestimentos.innerHTML += `
            <div class="holderInvestimento">
            <div class="decoracao" style="background-color:${color}"></div>
                <div class="linhaRegistro">
                    <h3>${registro.instituicao.toUpperCase()}</h3>
                    <h3>${registro.tipo}</h3>
                </div>
                <div>
                    <b><h2>${registro.investimento.toUpperCase()}</h2></b>
                </div>
                <div class="linhaRegistro">
                    <h4>${registro.valor}</h4>
                    <h4>${registro.resgate}</h4>
                </div>
            </div>`
        })
    })
}

function fecharForm() {
    const formulario = document.getElementById('holderFormInvestimentos');
    const fundoFormulario = document.getElementById('fundoForms');

    formulario.style.display = 'none';
    fundoFormulario.style.display = 'none';
}

function abrirForm() {
    const formulario = document.getElementById('holderFormInvestimentos');
    const fundoFormulario = document.getElementById('fundoForms');

    formulario.style.display = 'block';
    fundoFormulario.style.display = 'block';
}

function lerDados(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler investimentos via API JSONServer:', error);
            mostrarMensagem('Problema ao inserir os investimentos!', 'danger')
        });
}

function criarInvestimento(contato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then((data) => {
            mostrarMensagem('Investimento inserido com sucesso', 'success');
            document.getElementById('inputNome').value = '';
            document.getElementById('selectTipo').value = '';
            document.getElementById('selectInvestimento').value = '';
            document.getElementById('inputInstituicao').value = '';
            document.getElementById('inputValor').value = '';
            document.getElementById('inputResgate').value = '';
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir investimento via API JSONServer:', error);
            mostrarMensagem("Erro ao inserir investimento!", 'danger');
        });
}

function mostrarMensagem(mensagem, tema) {
    const container = document.getElementById('alertas');
    container.innerHTML = `
    <div class="alert alert-${tema}" role="alert">
        ${mensagem}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
       </div>`
}
