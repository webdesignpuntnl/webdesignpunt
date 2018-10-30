const hamburgerMenu = document.querySelector('.menuSmall');

function handleMenu() {
  hamburgerMenu.classList.toggle('change');
}

hamburgerMenu.addEventListener('click', handleMenu);
