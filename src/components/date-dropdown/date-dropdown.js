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
    onShow: function (inst, animationCompleted) {
      if (!animationCompleted) {
        console.log(inst);
        inst.$datepicker.find('.datepicker--button').after("<span class=\"datepicker--button datepicker--button-apply\" data-action=\"apply\">Применить</span>");
      }
    },

    onHide: function (inst, animationCompleted) {
      if (animationCompleted) {
        console.log(inst);
        inst.$datepicker.find('.datepicker--button-apply').remove();

      }
    },

  });
});