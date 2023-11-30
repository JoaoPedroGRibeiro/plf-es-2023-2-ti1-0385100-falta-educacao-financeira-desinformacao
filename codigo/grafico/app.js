const apiUrl = "https://jsonservertiaw--robertasophiacs.repl.co/gastos";
let dados;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const categoriasSoma = {};

    data.forEach((item) => {
      const categoria = item.tipo;
      const preco = parseFloat(item.preco); // Converte o preço para número

      if (categoriasSoma[categoria]) {
        categoriasSoma[categoria] += preco;
      } else {
        categoriasSoma[categoria] = preco;
      }
    });

    const tipos = Object.keys(categoriasSoma);
    const precos = Object.values(categoriasSoma);

    dados = {
      labels: tipos,
      datasets: [
        {
          label: "Valor gasto",
          data: precos,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(128, 128, 0, 0.6)",
          ],
        },
      ],
    };

    const config = {
      type: "bar",
      data: dados,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Criação do gráfico
    const ctx = document.getElementById("barChart").getContext("2d");
    const myChart = new Chart(ctx, config);
  })
  .catch((error) => console.error("Erro ao carregar dados:", error));
