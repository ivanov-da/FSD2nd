$(document).ready(() => {
  $(".js-date-dropdown").datepicker({
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
  });

  let $dpr = $(".js-date-dropdown").data("datepicker");
  let $applyButton = $dpr.$datepicker
    .find(".datepicker--button")
    .after(
      '<span class="datepicker--button datepicker--button-apply" data-action="apply">Применить</span>'
    );

  $(".datepicker--button-apply").click(() => {
    $dpr.hide();
  });

  $(".date-dropdown__expand-more").click(() => {
    $dpr.show();
  });
});