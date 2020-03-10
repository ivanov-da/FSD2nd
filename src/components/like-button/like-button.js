const btn = document.querySelector('.like-button');

let like = true,
  heartIcon,
  likeCount = document.querySelector('.like-button__text').innerHTML;
btn.addEventListener('click', () => {
  if (like) {
    document.querySelector('.like-button__text').classList.add('like-button__text_checked');
    document.querySelector('.like-button__icon').classList.add('like-button__icon_checked');
    btn.classList.add('like-button_checked');
    likeCount = ++likeCount;
    heartIcon = 'favorite';
  } else {
    document.querySelector('.like-button__text').classList.remove('like-button__text_checked');
    document.querySelector('.like-button__icon').classList.remove('like-button__icon_checked');
    btn.classList.remove('like-button_checked');
    likeCount = --likeCount;
    heartIcon = 'favorite_border';
  }
  like = !like;
  document.querySelector('.like-button__text').innerHTML = likeCount;
  document.querySelector('.like-button__icon').innerHTML = heartIcon;
});