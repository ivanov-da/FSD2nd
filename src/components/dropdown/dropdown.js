$(document).ready(() => {
  $(".iqdropdown").iqDropdown({
    textNull: "Сколько гостей",
    //setSelectionText: (itemCount, totalItems),
  });
  $('<p class="button-decrement-minus">-</p>').replaceAll(
    ".button-decrement .icon-decrement"
  );
  $('<p class="button-increment-plus">+</p>').replaceAll(
    ".button-increment .icon-increment"
  );
});