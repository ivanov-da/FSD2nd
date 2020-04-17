function simpleTemplating(data) {
  var html = "<ul>";
  $.each(data, function (index, item) {
    html += "<li>" + item + "</li>";
  });
  html += "</ul>";
  return html;
}

$(document).ready(function () {
  $("#pagination-container").pagination({
    dataSource: function (done) {
      let result = [];
      for (var i = 1; i < 180; i++) {
        result.push(i);
      }
      done(result);
    },
    //dataSource: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7],
    pageSize: 12,
    autoHidePrevious: true,
    autoHideNext: true,
    pageRange: 1,
    prevText: "back",
    //ulClassName: "class-test1",
    //classPrefix: "ololo1",
    callback: function (data, pagination) {
      var html = simpleTemplating(data);
      $("#data-container").html(html);
    },
  });
  console.log("pagination lol");
});
