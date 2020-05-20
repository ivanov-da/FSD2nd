$(document).ready(function () {

  $('.exp-checkbox').each(function (index, element) {
    let $arrow = $(element).find('.exp-checkbox__arrow').html();
    let isShown;

    if ($arrow == 'expand_more') {
      isShown = false;
    } else if ($arrow == 'expand_less') {
      isShown = true;
    }

    $(element).find(".exp-checkbox__title").click(function () {
      if (isShown) {
        $(element).find(".exp-checkbox__buttons").hide("slow");
        $(element).find(".exp-checkbox__arrow").html('expand_more')
      } else {
        $(element).find(".exp-checkbox__buttons").show("slow");
        $(element).find(".exp-checkbox__arrow").html('expand_less')
      }
      isShown = !isShown;
    });

  });
});