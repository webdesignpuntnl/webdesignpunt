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

// open or close the menu. Menu stays open on pagechange
function handleMenu(e) {
  let isClicked;
  if (e) isClicked = true; // als er geklikt wordt
  let menuState = sessionStorage.getItem('menu');
  const newHamburgerMenu = document.querySelector('.menuSmall');

  // het menu verbergt zich als js aan staat cookie menu wordt close
  if (menuState === 'close' || !menuState) {
    newHamburgerMenu.classList.remove('change');
    topMenu.classList.add('hideMenu');
    sessionStorage.setItem('menu', 'close');
    menuState = sessionStorage.getItem('menu');

    /* bij een click gaat het menu open en blijft open cookie wordt op open
  gezet en kan dus niet meer op pagina reload gesloten worden */
    if (e) {
      newHamburgerMenu.classList.add('change');
      topMenu.classList.remove('hideMenu');
      sessionStorage.setItem('menu', 'open');
      menuState = sessionStorage.getItem('menu');
    }
  } else if (isClicked) {
    // bij nog een click gaat het menu dicht en cookie op close
    newHamburgerMenu.classList.remove('change');
    topMenu.classList.add('hideMenu');
    sessionStorage.setItem('menu', 'close');
    menuState = sessionStorage.getItem('menu');
    // const lines = newHamburgerMenu.querySelectorAll('#line');
    // lines.forEach(line => {
    //   line.style.backgroundColor = '#F39200';
    // });
  }
}

// markup for the hamburgermenu
const markup = `
<button class="menuSmall">
<span class="menuSmall__line01"></span>
<span class="menuSmall__line02"></span>
<span class="menuSmall__line03"></span>
</button>`;

// put the html into the dom
hamburgerMenu.innerHTML = markup;
nav.querySelector('.header__nav__link').after(hamburgerMenu);

// call the resize function
windowResize();

// hide the menu on pageload;
handleMenu();

// event listeners
hamburgerMenu.querySelector('button').addEventListener('click', handleMenu);
hamburgerMenu.querySelector('button').addEventListener('focus', handleMenu);
window.addEventListener('resize', windowResize);
