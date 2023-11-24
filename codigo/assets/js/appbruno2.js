Highcharts.chart("container", {
  chart: {
    type: "column",
  },
  title: {
    align: "left",
    text: "Gráfico de Gasto:",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Porcentagem de gasto",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}%",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> do total<br/>',
  },

  series: [
    {
      name: "Gastos",
      colorByPoint: true,
      data: [
        {
          name: "Categoria 1",
          y: 21.06,
        },
        {
          name: "Categoria 2",
          y: 19.84,
        },
        {
          name: "Categoria 3",
          y: 10.18,
        },
        {
          name: "Categoria 4",
          y: 14.12,
        },
        {
          name: "Categoria 5",
          y: 12.33,
        },
        {
          name: "Categoria 6",
          y: 7.52,
        },
        {
          name: "Outros",
          y: 14.95,
        },
      ],
    },
  ],
});
