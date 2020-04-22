$(document).ready(function () {
  let likeButtonList = document.querySelectorAll('.like-button');

  likeButtonList.forEach(element => {
    let like = true;
    let heartIcon;
    let likeCount = element.querySelector('.like-button__text').innerHTML;

    element.addEventListener('click', () => {
      if (like) {
        element.querySelector('.like-button__text').classList.add('like-button__text_checked');
        element.querySelector('.like-button__icon').classList.add('like-button__icon_checked');
        element.classList.add('like-button_checked');
        likeCount = ++likeCount;
        heartIcon = 'favorite';
      } else {
        element.querySelector('.like-button__text').classList.remove('like-button__text_checked');
        element.querySelector('.like-button__icon').classList.remove('like-button__icon_checked');
        element.classList.remove('like-button_checked');
        likeCount = --likeCount;
        heartIcon = 'favorite_border';
      }
      like = !like;
      element.querySelector('.like-button__text').innerHTML = likeCount;
      element.querySelector('.like-button__icon').innerHTML = heartIcon;
    });
  });
});