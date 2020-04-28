$(document).ready(() => {
  $('.js-date-dropdown').datepicker({
    clearButton: true,
    range: true,
    multipleDatesSeparator: ' - ',
    clearButton: true,
    //inline: true,
    prevHtml: '<div class="date-dropdown__arrows material-icons">arrow_back</div>',
    nextHtml: '<div class="date-dropdown__arrows material-icons">arrow_forward</div>',
    navTitles: {
      days: 'MM yyyy',
    },
  });
});