$(document).ready(() => {

  $('.iqdropdown').each(function (index, element) {

    $title = $(element).data('title');
    $mask = $(element).data('mask');

    $(element).iqDropdown({
      textNull: $title,
      maskArr: $mask,
    });
  })

  $('<p class="button-decrement-minus">-</p>').replaceAll(
    ".button-decrement .icon-decrement"
  );
  $('<p class="button-increment-plus">+</p>').replaceAll(
    ".button-increment .icon-increment"
  );
});