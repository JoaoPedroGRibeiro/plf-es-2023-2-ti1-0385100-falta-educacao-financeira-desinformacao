window.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonservertiaw--robertasophiacs.repl.co/perfil?id=1")
    .then((response) => response.json())
    .then((dataJSON) => {
      const dados = dataJSON[0];
      let info = `
            <div id="pontos">
                <p><b>Pontuação:</b> ${dados.valorTotal}</p>
            </div>
            <div id="perfil">
                <p><b>Perfil de investidor:</b> ${dados.resultado}</p>
            </div>`;

      document.getElementById("infos").innerHTML = info;
    });
});
