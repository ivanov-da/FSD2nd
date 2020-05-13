$(document).ready(function () {
  $(".header__burger").on("click", function () {
    //$(".test__container").addClass("1");

    if ($(".header__item").hasClass("header__item_active")) {
      $(".header__item").removeClass("header__item_active");
      //$(this).find("a").html("<i class='fas fa-bars'></i>");
    } else {
      $(".header__item").addClass("header__item_active");
      //$(this).find("a").html("<i class='fas fa-times'></i>");
    }
  });
});