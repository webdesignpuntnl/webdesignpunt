const nav = document.querySelector('.header__nav');
let getHamburgerMenu = document.querySelector('.menuSmall');
const topMenu = document.querySelector('.header__nav__menu');
const hamburgerMenu = document.createElement('div');

// hide the menu on pageload: shows the menu if no js
getHamburgerMenu.parentNode.removeChild(getHamburgerMenu);

// show/hide menu and icon on resize
function windowResize() {
  const windowSize = window.innerWidth; // get windowsize
  getHamburgerMenu = document.querySelector('.menuSmall');
  if (windowSize >= 600) {
    getHamburgerMenu.style.display = 'none';
  } else if (windowSize <= 600) {
    getHamburgerMenu.style.display = 'block';
  }
}

// open or close the menu.Menu stays open on pagechange
function handleMenu() {
  const newHamburgerMenu = document.querySelector('.menuSmall');
  if (topMenu.dataset.show === '2') {
    newHamburgerMenu.classList.toggle('change');
    topMenu.classList.toggle('hideMenu');
  }
}

// markup for the hamburgermenu
const markup = `
  <div class="menuSmall change" id="hamburgerIcon" role="button">
    <div class="menuSmall__line01">Lijn01</div>
    <div class="menuSmall__line02">Lijn02</div>
    <div class="menuSmall__line03">Lijn03</div>
  </div>`;

// put the html into the dom
hamburgerMenu.innerHTML = markup;
nav.appendChild(hamburgerMenu);

// call the resize function
windowResize();

// hide the menu on pageload
if (topMenu.dataset.show === '1') {
  handleMenu();
  topMenu.dataset.show = '2';
}

// event listeners
hamburgerMenu.addEventListener('click', handleMenu);
window.addEventListener('resize', windowResize);
