$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();
    formSubmit();
});
});

function formSubmit() {
    var data = new FormData($('form')[0]);

    $.ajax({
        url: '/home/upload',
        data: data,
        type: 'POST',
        contentType: false,
        processData: false,
    }).done(function(res){
      makeChart(res["chart"]);
      console.log(res);
      $('#test').append("<a class='export' href='" + res["chart"]["datafile"] + "'><h4>Download Data in Excel</h4></a>");
    //  $('.export').click(function(e) {
    //    e.preventDefault();
      //  var id = $(this).data("id");
      //  $.get('/download/' + id).done(function(res) {

      //  });
      //  console.log(dataVal.map(function(x) {return x["label"]}));
      //  console.log(dataReal);
    //  });
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
  var ctx = $('#myChart');

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
ctx.click(function(e) {
  console.log(e);
//var activePoints = myChart.getElementsAtEvent(e);
var activePoints = myChart.getElementAtEvent(e);
  console.log(activePoints[0]["_index"]);
});

}
