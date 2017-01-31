$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    formSubmit();
});
});

function showThis() {

}

function formSubmit() {
    var data = new FormData($('form')[0]);
    var action = $('form')["0"]["action"];
    $.ajax({
        url: action,
        data: data,
        type: 'POST',
        contentType: false,
        processData: false,
    }).done(function(res){
      $('#test').append("<canvas class='myChart' width='100' height='100' data-id='" + res["chart"]["id"] + "'</canvas>");
      $('#test').append("<a class='export' href='" + res["chart"]["datafile"] + "'><h4>Download Data in Excel</h4></a>");
      makeChart2(res["chart"]);

    });
  }

var colors = [
          'rgba(91, 123, 128, 1)',
          'rgba(157, 176, 179, 1)',
          'rgba(230, 153, 115, 1)',
          'rgba(217, 99, 40, 1)'
      ];

var dataVal;
var dataReal;

function makeChart(res) {
  var labelData = res["labels"];
  dataVal = [];
  dataReal = [];
  res["real"].forEach(function(x) {
    dataReal.push(x);
  });

  res["states"].forEach(function(x,y) {
    var data = {
      label: x[0],
      data: x.slice(1, x.length),
      backgroundColor: [
          colors[y],
          colors[y]
      ],
      borderColor: [
          colors[y],
          colors[y]
      ],
      borderWidth: 1
    };
    dataVal.push(data);
  });

  Chart.defaults.global.defaultFontFamily = 'metric regular';
  Chart.defaults.global.defaultFontSize = 16;
  var ctx = $('.myChart');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {

        labels: labelData,
        datasets: dataVal

    },
    options: {
        tooltips: {

          callbacks: {
            label: function(item, data) {
              return data["datasets"][item.datasetIndex]["label"] + ": " + dataReal[item.datasetIndex][item.index].toLocaleString();
            }
          }
        },
        scales: {
            yAxes: [{
              stacked: true,
                ticks: {
                    beginAtZero:true,
                    max: 100,
                    callback: function(label, index, labels) {
                      return label + "%";
                    }
                },
            }],
            xAxes: [{
              stacked: true
            }]
        }
    }
  });
}




function makeChart2(res) {

  var labelData = res["labels"];
  dataVal = [];
  dataReal = [];
  var labels = [];
  var colors2 = [];
  res["real"].forEach(function(x) {
    dataReal.push(x[0]);
  });

  res["states"].forEach(function(x,y) {
    dataVal.push(x[1]);
    labels.push(x[0]);
    colors2.push(colors[y]);
  });

    Chart.defaults.global.defaultFontFamily = 'metric regular';
    Chart.defaults.global.defaultFontSize = 16;
    var ctx = $('.myChart');

    var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {

        labels: labels,
        datasets: [{
          backgroundColor: colors2,
          data: dataVal
        }]
    },
    options: {
      tooltips: {

        callbacks: {
          label: function(item, data) {
            console.log(data);
            console.log(item);
            return data["labels"][item.index] + ": " + dataReal[item.index].toLocaleString();
          }
        }
      }
    }
  });
}
