function compute_gains(principal, apr) {
  var return_year = principal * apr / 100;
  var mili_in_year = 1000 * 60 * 60 * 24 * 365;

  return return_year / mili_in_year;
}

function compute_revenue(revenue) {
  var return_year = revenue * 12;
  var mili_in_year = 1000 * 60 * 60 * 24 * 365;

  return return_year / mili_in_year;
}

var pulse = 100; // miliseconds
var estimate_apr = 7;
var assets = [{
  id: 1,
  name: 'Pawnshop Business',
  principal: 21600,
  apr: 30,
  compounding: false,
  accrued: 0
}, {
  id: 2,
  name: 'Tezos Staking',
  principal: 13000,
  apr: 6,
  compounds: true,
  accrued: 0
}, {
  id: 3,
  name: 'WebDollar Staking',
  principal: 2000,
  apr: 35,
  compounds: true,
  accrued: 0
}, {
  id: 4,
  name: 'DAI Savings',
  principal: 2800,
  apr: 7.5,
  compounds: true,
  accrued: 0
}];

var services = [{
  id: 11,
  name: 'Petrolube Maintenance',
  revenue: 100,
  accrued: 0
}, {
  id: 12,
  name: 'Dermod Wood Maintenance',
  revenue: 10,
  accrued: 0
}, {
  id: 13,
  name: 'WebDollar Maintenance',
  revenue: 90,
  accrued: 0
}, {
  id: 14,
  name: 'WebDollar Tip Bot',
  revenue: 20,
  accrued: 0
}, {
  id: 15,
  name: 'Hostero Dashboard',
  revenue: 10,
  accrued: 0
}, {
  id: 16,
  name: 'Hostero Bootstrap',
  revenue: 10,
  accrued: 0
}, {
  id: 17,
  name: 'Job',
  revenue: 3300,
  accrued: 0
}];

var expenses = [{
  id: 21,
  name: 'Rent',
  amount: 400
}, {
  id: 22,
  name: 'Food',
  amount: 300
}, {
  id: 23,
  name: 'Car',
  amount: 100
}, {
  id: 24,
  name: 'Bills',
  amount: 100
}, {
  id: 25,
  name: 'Misc',
  amount: 100
}, {
  id: 26,
  name: 'Taxes',
  amount: 250
}];

var total_expenses = 0;

for (var i = 0; i < expenses.length; i++) {
  var expense = expenses[i];

  total_expenses += expense.amount;
}

var expense_year = total_expenses * 12;
var expense_month = total_expenses;
var expense_day = expense_year / 365;
var expense_hour = expense_day / 24;

$('#expense_hour').text('$' + expense_hour.toFixed(2));
$('#expense_day').text('$' + expense_day.toFixed(1));
$('#expense_month').text('$' + expense_month.toFixed(0));
$('#expense_year').text('$' + expense_year.toFixed(0));

var total_gains_per_hour = 0;
var total_principal = 0;
var total_revenue = 0;

for (var i = 0; i < assets.length; i++) {
  var asset = assets[i];
  var tooltip_compounds = asset.compounds ? 'Compounded' : 'Not compounded';
  var gains_per_hour = compute_gains(asset.principal, asset.apr) * 1000 * 3600;
  var gains_per_day = gains_per_hour * 24;
  var gains_per_month = gains_per_day * 30;
  var gains_per_year = gains_per_day * 365;
  var tooltip_apr = 'Hour: $' + gains_per_hour.toFixed(2) + '<br />' +
    'Day: $' + gains_per_day.toFixed(1) + '<br />' +
    'Month: $' + gains_per_month.toFixed(0) + '<br />' +
    'Year: $' + gains_per_year.toFixed(0);
  var element =
    '<br />' +
    '<div class="row">' +
    '<div class="col-sm">' +
    '<div class="form-label-group">' +
    '<strong><label for="principal" data-toggle="tooltip" data-html="true" title="' + tooltip_compounds + '">' + asset.name + '</label></strong>' +
    '<input type="text" id="principal_' + asset.id + '" class="form-control" disabled>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm">' +
    '<div class="form-label-group">' +
    '<label for="gains" data-toggle="tooltip" data-html="true" title="' + tooltip_apr + '">APR ' + asset.apr + '%</label>' +
    '<input type="text" id="accrued_' + asset.id + '" class="form-control" disabled>' +
    '</div>' +
    '</div>' +
    '</div>';

  $('#assets').append(element);

  total_gains_per_hour += gains_per_hour;
  total_principal += asset.principal;
}

var total_gains_per_day = total_gains_per_hour * 24;
var total_gains_per_month = total_gains_per_day * 30;
var total_gains_per_year = total_gains_per_day * 365;
var total_apr = total_gains_per_year / total_principal * 100;
var tooltip_total_apr = 'Hour: $' + total_gains_per_hour.toFixed(2) + '<br />' +
  'Day: $' + total_gains_per_day.toFixed(1) + '<br />' +
  'Month: $' + total_gains_per_month.toFixed(0) + '<br />' +
  'Year: $' + total_gains_per_year.toFixed(0);

$('#assets_accrued_total').attr('title', tooltip_total_apr);
$('#assets_apr_total').text(total_apr.toFixed(1) + '%');

var total_estimated_principal = 0;

for (var i = 0; i < services.length; i++) {
  var service = services[i];
  var gains_per_month = service.revenue;
  var gains_per_year = gains_per_month * 12;
  var gains_per_day = gains_per_year / 365;
  var gains_per_hour = gains_per_day / 24;
  var tooltip_apr = 'Hour: $' + gains_per_hour.toFixed(2) + '<br />' +
    'Day: $' + gains_per_day.toFixed(1) + '<br />' +
    'Month: $' + gains_per_month.toFixed(0) + '<br />' +
    'Year: $' + gains_per_year.toFixed(0);
  var estimated_principal = gains_per_year / estimate_apr * 100;
  var tooltip_estimated_principal = 'Est. $' + estimated_principal.toFixed(0) + ' @ ' + estimate_apr + '% APR';
  var element =
    '<br />' +
    '<div class="row">' +
    '<div class="col-sm">' +
    '<div class="form-label-group">' +
    '<strong><label for="principal" data-toggle="tooltip" data-html="true" title="' + tooltip_estimated_principal + '">' + service.name + '</label></strong>' +
    '<input type="text" id="principal_' + service.id + '" class="form-control" disabled>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm">' +
    '<div class="form-label-group">' +
    '<label for="gains" data-toggle="tooltip" data-html="true" title="' + tooltip_apr + '">Revenue</label>' +
    '<input type="text" id="accrued_' + service.id + '" class="form-control" disabled>' +
    '</div>' +
    '</div>' +
    '</div>';

  $('#services').append(element);

  $('#principal_' + service.id).val('$' + service.revenue);

  total_estimated_principal += estimated_principal;
  total_revenue += service.revenue * 12;
}

$('#services_estimated_principal_total').text('$' + total_estimated_principal.toFixed(0));

var total_revenue_per_year = total_revenue;
var total_revenue_per_month = total_revenue_per_year / 12;
var total_revenue_per_day = total_revenue_per_year / 365;
var total_revenue_per_hour = total_revenue_per_day / 24;

var tooltip_total_revenue = 'Hour: $' + total_revenue_per_hour.toFixed(2) + '<br />' +
  'Day: $' + total_revenue_per_day.toFixed(1) + '<br />' +
  'Month: $' + total_revenue_per_month.toFixed(0) + '<br />' +
  'Year: $' + total_revenue_per_year.toFixed(0);

$('#services_accrued_total').attr('title', tooltip_total_revenue);
$('#services_revenue_total').text('$' + total_revenue);

var streaming_year = total_revenue + total_gains_per_year;
$('#streaming_year').text('$' + streaming_year.toFixed(0));
$('#streaming_month').text('$' + (streaming_year / 12).toFixed(0));
$('#streaming_day').text('$' + (streaming_year / 365).toFixed(1));
$('#streaming_hour').text('$' + (streaming_year / 365 / 24).toFixed(2));

$('#net_worth').text('$' + (total_estimated_principal + total_principal).toFixed(0));

if (streaming_year - (total_expenses * 12) < 0) {
  var runway = total_principal / Math.abs(streaming_year - (total_expenses * 12));
  $('#runway').text(runway.toFixed(1) + ' Years');
  $('#runway').attr('title', 'Deficit: $' + Math.abs(streaming_year - (total_expenses * 12)).toFixed(0));
} else {
  $('#runway').html('&infin;');
  $('#runway').attr('title', 'Not applicable');
}

setInterval(function() {
  var principal_total = 0;
  var accrued_total = 0;
  var services_accrued_total = 0;

  for (var i = 0; i < assets.length; i++) {
    var asset = assets[i];
    var gains = compute_gains(asset.principal, asset.apr) * pulse;

    if (asset.compounds) {
      asset.principal += gains;
    }

    asset.accrued += gains;

    principal_total += asset.principal;
    accrued_total += asset.accrued;

    $('#principal_' + asset.id).val('$' + asset.principal.toFixed(5));
    $('#accrued_' + asset.id).val('$' + asset.accrued.toFixed(6));
  }

  $('#assets_principal_total').text('$' + principal_total.toFixed(5));
  $('#assets_accrued_total').text('$' + accrued_total.toFixed(6));

  for (var j = 0; j < services.length; j++) {
    var service = services[j];
    var gains = compute_revenue(service.revenue) * pulse;

    service.accrued += gains;
    services_accrued_total += service.accrued;

    $('#accrued_' + service.id).val('$' + service.accrued.toFixed(6));
  }

  $('#services_accrued_total').text('$' + services_accrued_total.toFixed(6));

  var streaming_revenue = accrued_total + services_accrued_total;
  $('#streaming_revenue').text('$' + streaming_revenue.toFixed(6));
}, pulse);

$(function() {
  $('[data-toggle="tooltip"]').tooltip();

  var chart_data = [];
  var total_assets = 0;
  var total_services = 0;
  var total_expenses = 0;

  for (var i = 0; i < assets.length; i++) {
    var month_income = assets[i].principal * assets[i].apr / 100 / 12;
    total_assets += month_income;

    chart_data.push([assets[i].name, 'Savings', parseInt(month_income)]);
  }

  total_assets = parseInt(total_assets);

  for (var i = 0; i < services.length; i++) {
    total_services += services[i].revenue;

    chart_data.push([services[i].name, 'Services', services[i].revenue]);
  }

  for (var i = 0; i < expenses.length; i++) {
    total_expenses += expenses[i].amount;

    chart_data.push(['Expenses', expenses[i].name, expenses[i].amount]);
  }

  var total_income = total_services + total_assets;

  chart_data.push(['Savings', 'Income', total_assets]);
  chart_data.push(['Services', 'Income', total_services]);

  if (total_income < total_expenses) {
    chart_data.push(['Income', 'Expenses', total_income]);
    chart_data.push(['Deficit', 'Expenses', total_expenses - total_income]);
  }

  if (total_income >= total_expenses) {
    chart_data.push(['Income', 'Expenses', total_income - (total_income - total_expenses)]);
    chart_data.push(['Income', 'Surplus', total_income - total_expenses]);
  }

  Highcharts.chart('sankey', {
    title: {
      text: 'Sankey Diagram'
    },
    series: [{
      keys: ['from', 'to', 'weight'],
      data: chart_data,
      type: 'sankey',
      name: 'Streams'
    }]
  });

  var chart_income_data = [];

  for (var i = 0; i < assets.length; i++) {
    var amount = assets[i].principal * assets[i].apr / 100 / 12;

    chart_income_data.push({
      name: assets[i].name,
      y: parseInt(amount)
    });
  }

  for (var i = 0; i < services.length; i++) {
    chart_income_data.push({
      name: services[i].name,
      y: parseInt(services[i].revenue)
    });
  }

  console.log(chart_income_data);

  Highcharts.chart('pie_income', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Income'
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
      name: 'Asset / Service',
      colorByPoint: true,
      data: chart_income_data
    }]
  });

  var chart_expenses_data = [];

  for (var i = 0; i < expenses.length; i++) {
    chart_expenses_data.push({
      name: expenses[i].name,
      y: expenses[i].amount
    });
  }

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

  Highcharts.chart('donut_overall_status', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Ratio',
      align: 'center',
      verticalAlign: 'middle',
      y: 60
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        colors: [
          'blue',
          'red'
        ],
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Balance',
      innerSize: '50%',
      data: [
        ['Income', total_income],
        ['Expenses', total_expenses],
      ]
    }]
  });
});
