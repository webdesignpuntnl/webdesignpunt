const hamburgerMenu = document.querySelector('.menuSmall');
const topMenu = document.querySelector('.header__nav__menu');

function handleMenu() {
  hamburgerMenu.classList.toggle('change');
  topMenu.classList.toggle('hideMenu');
}

hamburgerMenu.addEventListener('click', handleMenu);
