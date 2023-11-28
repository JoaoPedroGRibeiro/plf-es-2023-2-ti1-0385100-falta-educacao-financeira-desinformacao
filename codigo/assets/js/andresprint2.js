Highcharts.chart('container', {
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
            name: 'Categoria 1',
            y: 74.77,
            sliced: true,
            selected: true
        },  {
            name: 'Categoria 2',
            y: 12.82
        },  {
            name: 'Categoria 3',
            y: 4.63
        }, {
            name: 'Categoria 4',
            y: 2.44
        }, {
            name: 'Categoria 5',
            y: 2.02
        }, {
            name: 'Outros',
            y: 3.28
        }]
    }]
});