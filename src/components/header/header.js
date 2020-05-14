$(document).ready(function () {
  $(".header__burger").on("click", function () {

    console.log(this)

    if ($(".header__item").hasClass("header__item_active")) {
      $(".header__item").removeClass("header__item_active");
      $(this).html('dehaze');
    } else {
      $(".header__item").addClass("header__item_active");
      $(this).html('clear');
    }
  });
});