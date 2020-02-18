Highcharts.chart('pie_expenses', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Expenses'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        }
      }
    },
    series: [{
      name: 'Expense',
      colorByPoint: true,
      data: chart_expenses_data
    }]
  });