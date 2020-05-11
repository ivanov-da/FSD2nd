$(document).ready(() => {
  $(".calendar__element").datepicker({
    clearButton: true,
    range: true,
    multipleDatesSeparator: " - ",
    clearButton: true,
    inline: true,
    prevHtml: '<div class="date-dropdown__arrows material-icons">arrow_back</div>',
    nextHtml: '<div class="date-dropdown__arrows material-icons">arrow_forward</div>',
    navTitles: {
      days: "MM yyyy",
    },
  });

  let $calendar = $(".calendar__element").data("datepicker");
  let $applyButton = $calendar.$datepicker
    .find(".datepicker--button")
    .after(
      '<span class="datepicker--button datepicker--button-apply" data-action="apply">Применить</span>'
    );
});