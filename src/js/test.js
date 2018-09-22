console.log('ik kom vanuit testjs');

window.onload = function load() {
  const hamburgerMenu = document.getElementById('hamburgerIcon');
  hamburgerMenu.addEventListener('click', () => {
    console.log('klikken op het hamburgermenu werkt nu');
  });
};
