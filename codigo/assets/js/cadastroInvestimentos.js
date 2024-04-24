
const apiUrl = 'https://jsonservertiaw--robertasophiacs.repl.co/investimentos';
var nomesInvestimentos = [];
var imediato = false;
var baseDados = [];
var idEdicao = null;

const formularioInvest = document.getElementById('formInvestimentos');
formularioInvest.addEventListener("submit", cadastrarInvestimento);

function verificarResgate(evento) {
    defineResgate(evento.target.checked);
}

function defineResgate(marcado = false) {
    const dataResgate = document.getElementById('inputResgate');
    dataResgate.readOnly = false;
    imediato = false;

    if (marcado) {
        dataResgate.value = '';
        dataResgate.readOnly = true;
        imediato = true;
    }
}

function verificarInvestimento(evento) {
    const tipoInvestimento = evento.target.value;
    disponibilizaInvestimentos(tipoInvestimento);
}

function disponibilizaInvestimentos(tipoInvestimento) {
    nomesInvestimentos = [];
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

    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    var body = {
        "id_cliente": 1,
        "nome": document.getElementById('inputNome').value,
        "tipo": document.getElementById('selectTipo').value,
        "investimento": document.getElementById('selectInvestimento').value,
        "instituicao": document.getElementById('inputInstituicao').value,
        "valor": document.getElementById('inputValor').value,
        "cor": color,
        "resgate": imediato ? 'Imediato' : document.getElementById('inputResgate').value
    }

    if (idEdicao) {
        atualizaRegistro(idEdicao, body, refrescarPagina);
    }
    else {
        criarRegistro(body, refrescarPagina);
    }
}

function refrescarPagina() {
    fecharForm();
    carregaDados();
}

function carregaDados() {
    lerDados((dados) => {
        baseDados = dados;
        exibeInvestimentos(baseDados);
    })
}

function exibeInvestimentos(dados) {
    tabelaInvestimentos = document.getElementById("holderRegistrosInvestimento");

    tabelaInvestimentos.innerHTML = "";

    dados.forEach((registro) => {
        tabelaInvestimentos.innerHTML += `
        <div class="holderInvestimento">
        <div class="decoracao" style="background-color:${registro.cor}"></div>
            <div class="linhaRegistro">
                <h2>${registro.nome}</h2>
                <div class='holderIcons'>
                <svg id="editar-${registro.id}" class='svgEditar' onclick="editaInvestimento(event)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path id="editar-${registro.id}" onclick="editaInvestimento(event)" d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z"/>
                </svg>
                <svg id="delete-${registro.id}" class='svgDeletar' onclick="deletaInvestimento(event)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path id="delete-${registro.id}" d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
                </div>
            </div>
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
}

function deletaInvestimento(evento) {
    let idRegistro = evento.target.id.replace('delete-', '');
    const modalDelete = document.getElementById("modal");
    const fundoForms = document.getElementById("fundoForms");
    fundoForms.style.display = 'block';
    modalDelete.style.display = 'block';
    modalDelete.innerHTML = `
    <div class="topoModal">
        <h1> </h1>
        <a id="fecharavisoDelete" onclick="fecharForm()">
        <svg id="fecharavisoDelete" xmlns="http://www.w3.org/2000/svg" height="24"
            viewBox="0 -960 960 960" width="24"><path id="fecharavisoDelete"
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></a>

    </div>
    <p>Deseja deletar o registro?</p>
    <div class="botoesModal">
        <input value="Sim" type=button onclick="deletaRegistro(${idRegistro}, refrescarPagina)"
         style="background-color: #075da8; color:aliceblue">
      <input value="Cancelar" type="button" id="fecharavisoDelete"
         onclick="fecharForm()">
    </div>`
}

function editaInvestimento(evento) {
    let idRegistro = evento.target.id.replace('editar-', '');
    const modalEditar = document.getElementById("holderFormInvestimentos");
    const fundoForms = document.getElementById("fundoForms");
    const tituloModal = document.getElementById("tituloModal");

    tituloModal.innerHTML = 'Editar';
    fundoForms.style.display = 'block';
    modalEditar.style.display = 'block';

    baseDados.forEach((dados) => {
        if (dados.id == idRegistro) {
            idEdicao = idRegistro;
            disponibilizaInvestimentos(dados.tipo);

            document.getElementById("inputNome").value = dados.nome;
            document.getElementById("inputInstituicao").value = dados.instituicao;
            document.getElementById("selectTipo").value = dados.tipo;
            document.getElementById("selectInvestimento").value = dados.investimento;
            document.getElementById("inputValor").value = dados.valor;
            let inputResgate = document.getElementById("inputResgate");
            let selectResgate = document.getElementById("selectResgate");

            if (dados.resgate == 'Imediato') {
                selectResgate.checked = true;
                defineResgate(true);
            }
            else {
                defineResgate(false);
                inputResgate.value = dados.resgate;
            }
        }
    })
}
function pesquisarInvestimento(evento) {
    const pesquisa = evento.target.value;
    const filtro = [];
    baseDados.forEach((item) => {
        if (item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.tipo.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.instituicao.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.valor.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.resgate.toLowerCase().includes(pesquisa.toLowerCase()) ||
            item.investimento.toLowerCase().includes(pesquisa.toLowerCase())) {
            filtro.push(item);
        }
    })

    exibeInvestimentos(filtro);
}

function fecharForm() {
    const formularioCadastro = document.getElementById("holderFormInvestimentos");
    const formularioDelete = document.getElementById("modal");
    const fundoFormulario = document.getElementById("fundoForms");
    document.getElementById("formInvestimentos").onsubmit = `cadastrarInvestimento(event)`;

    fundoFormulario.style.display = 'none';
    formularioCadastro.style.display = 'none';
    formularioDelete.style.display = 'none';

    apagaCampos();
}

function abrirForm() {
    const formulario = document.getElementById('holderFormInvestimentos');
    const fundoFormulario = document.getElementById('fundoForms');
    const tituloModal = document.getElementById("tituloModal");

    tituloModal.innerHTML = 'Cadastrar';
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

function apagaCampos() {
    document.getElementById('inputNome').value = '';
    document.getElementById('selectTipo').value = '';
    document.getElementById('selectInvestimento').value = '';
    document.getElementById('inputInstituicao').value = '';
    document.getElementById('inputValor').value = '';
    document.getElementById('inputResgate').value = '';
    document.getElementById('inputResgate').readOnly = false;
    document.getElementById('selectResgate').checked = false;
    idEdicao = null;
}

function criarRegistro(contato, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    })
        .then((data) => {
            mostrarMensagem('Investimento inserido com sucesso', 'success');
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao inserir investimento via API JSONServer:', error);
            mostrarMensagem("Erro ao inserir investimento!", 'danger');
        });
}

function atualizaRegistro(id, registro, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registro),
    })
        .then(data => {
            mostrarMensagem('Investimento atualizado com sucesso', 'success');
            apagaCampos();
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao atualizar investimento via API JSONServer:', error);
            mostrarMensagem("Erro ao atualizar investimento!", 'danger');
        });
}

function deletaRegistro(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            mostrarMensagem("Investimento deletado com sucesso", 'success');
            if (refreshFunction)
                refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover investimento via API JSONServer:', error);
            mostrarMensagem("Erro ao remover investimento", 'danger');
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
