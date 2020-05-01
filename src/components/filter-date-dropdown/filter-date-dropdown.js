$(document).ready(() => {
  $(".js-filter-date-dropdown").datepicker({
    clearButton: true,
    range: true,
    multipleDatesSeparator: " - ",
    clearButton: true,
    //inline: true,
    prevHtml: '<div class="date-dropdown__arrows material-icons">arrow_back</div>',
    nextHtml: '<div class="date-dropdown__arrows material-icons">arrow_forward</div>',
    navTitles: {
      days: "MM yyyy",
    },
    onSelect: function (fd, d, picker) {
      $(".js-filter-date-dropdown").val(fd.split("-")[0]);
      $(".filter-date-dropdown__end").val(fd.split("-")[1]);
    },
  });

  let $dpr = $(".js-filter-date-dropdown").data("datepicker");
  let $applyButton = $dpr.$datepicker
    .find(".datepicker--button")
    .after(
      '<span class="datepicker--button datepicker--button-apply" data-action="apply">Применить</span>'
    );

  $(".datepicker--button-apply").click(() => {
    $dpr.hide();
  });

  $(".filter-date-dropdown__end, .filter-date-dropdown__arrow_second, .filter-date-dropdown__arrow_first").click(() => {
    $dpr.show();
  });
});