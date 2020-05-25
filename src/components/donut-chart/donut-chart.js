$(document).ready(function () {
  let ctx = document.getElementById("myChart").getContext("2d");

  let data = {
    datasets: [{
      data: [10, 20, 30]
    }],
    labels: [
      'Red',
      'Yellow',
      'Blue'
    ]
  };

  var htmlData = [{
      value: 90,
      color: "#74cfae"
    },
    {
      value: 10,
      color: "#f2f2f2"
    }
  ];


  let options = {

  };

  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: htmlData,
    options: {
      percentageInnerCutout: 80
    },
  });


});