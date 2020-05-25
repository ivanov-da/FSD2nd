$(document).ready(function () {
  var options = {
    // legend: false,
    responsive: false
  };
  new Chart($("#canvas1"), {
    type: 'doughnut',
    tooltipFillColor: "rgba(51, 51, 51, 0.55)",
    data: {
      labels: [
        "Удовлетворительно",
        "Хорошо",
        "Великолепно",
        "Разочарован"
      ],
      datasets: [{
        data: [65, 65, 130, 0],
        backgroundColor: [
          "#BC9CFF",
          "#6FCF97",
          "#FFE39C",
          "#919191"
        ],
        hoverBackgroundColor: [
          "#8BA4F9",
          "#66D2EA",
          "#FFBA9C",
          "#3D4975"
        ]
      }]
    },
    options: {
      responsive: false,
      cutoutPercentage: 90,
      legend: false
    }
  });


});