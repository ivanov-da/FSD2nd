$(document).ready(function () {
  $(".js-range-slider").ionRangeSlider({
    skin: "round",
    type: "double",
    min: 0,
    max: 20000,
    from: 6000,
    to: 12800,
    prettify_enabled: true,
    prettify_separator: " ",
    force_edges: true,
    hide_min_max: true,
    hide_from_to: true,

    onStart: function (data) {
      $('.js-slider-from').html(data.from_pretty + '₽' + ' ');
      $('.js-slider-to').html(' ' + data.to_pretty + '₽');
    },

    onChange: function (data) {
      $('.js-slider-from').html(data.from_pretty + '₽' + ' ');
      $('.js-slider-to').html(' ' + data.to_pretty + '₽');
    },
  });
});