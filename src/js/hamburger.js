//! het menu moet alleen zichtaar zijn als er geklikt
//! is niet bij de eerste paginaload en niet als het weg geklikt is

const nav = document.querySelector('.header__nav');
let getHamburgerMenu = document.querySelector('.menuSmall');
const topMenu = document.querySelector('.header__nav__menu');
const hamburgerMenu = document.createElement('div');

getHamburgerMenu.parentNode.removeChild(getHamburgerMenu);

function windowResize() {
  const windowSize = window.innerWidth;
  getHamburgerMenu = document.querySelector('.menuSmall');
  if (windowSize >= 600) {
    getHamburgerMenu.style.display = 'none';
    console.log(typeof (getHamburgerMenu));
  } else if (windowSize <= 600) {
    getHamburgerMenu.style.display = 'block';
  }
}

function handleMenu() {
  const newHamburgerMenu = document.querySelector('.menuSmall');
  newHamburgerMenu.classList.toggle('change');
  topMenu.classList.toggle('hideMenu');
}

const markup = `
  <div class="menuSmall change" id="hamburgerIcon" role="button">
    <div class="menuSmall__line01">Lijn01</div>
    <div class="menuSmall__line02">Lijn02</div>
    <div class="menuSmall__line03">Lijn03</div>
  </div>`;

hamburgerMenu.innerHTML = markup;
nav.appendChild(hamburgerMenu);

hamburgerMenu.addEventListener('click', handleMenu);
window.addEventListener('resize', windowResize);
