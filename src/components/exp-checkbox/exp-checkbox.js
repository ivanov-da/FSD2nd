$(document).ready(function () {
  let arrow = $(".exp-checkbox__arrow").html();
  let isShown

  if (arrow == 'expand_more') {
    isShown = false;
  } else if (arrow == 'expand_less') {
    isShown = true;
  }


  $(".exp-checkbox__text, .exp-checkbox__arrow").click(function () {
    if (isShown) {
      $(".exp-checkbox__buttons").hide("slow");
      $(".exp-checkbox__arrow").html('expand_more')
    } else {
      $(".exp-checkbox__buttons").show("slow");
      $(".exp-checkbox__arrow").html('expand_less')
    }
    isShown = !isShown;
  });
});