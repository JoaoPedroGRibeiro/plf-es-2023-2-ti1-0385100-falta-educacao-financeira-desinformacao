window.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonserver--eduardomoreir20.repl.co/contatos')
        .then((response) => response.json())
        .then((dataJSON) => {
            let info = ''; 
            for (let i = 0; i < dataJSON.length; i++) {
                info += `
                    <div id="usuario">
                        <h2>Id Usuário: ${dataJSON[i].id}</h2>
                    </div>
                    <div id="pontos">
                        <h3>Pontuação: ${dataJSON[i].valortotal}</h3>
                    </div>
                    <div id="perfil">
                        <h4>Perfil de investidor: ${dataJSON[i].resultado}</h4>
                    </div>`;
            }
            
           document.getElementById('infos').innerHTML= info;
        });
});



