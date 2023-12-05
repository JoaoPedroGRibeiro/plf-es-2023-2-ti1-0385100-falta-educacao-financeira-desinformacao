Highcharts.chart('container2', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Gráfico de Gastos em pizza',
        align: 'center'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Categorias',
        colorByPoint: true,
        data: [{
            name: 'Eletrônicos',
            y: 74.77,
            sliced: true,
            selected: true
        },  {
            name: 'Transporte',
            y: 12.82
        },  {
            name: 'Entretimento',
            y: 4.63
        }, {
            name: 'Viagem',
            y: 2.44
        }, {
            name: 'Tênis',
            y: 2.02
        }, {
            name: 'Outros',
            y: 3.28
        }]
    }]
});