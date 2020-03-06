import poppupInfo from './poppupInfo';

const projects = Array.from(document.querySelectorAll('.projects'));
const newDiv = document.createElement('div');
const pageBlurr = document.createElement('div');
const header = document.querySelector('.header');
const projectsOverlays = document.querySelectorAll('.projects__overlay');
let overlayShow = false;

header.appendChild(pageBlurr);
newDiv.setAttribute('class', 'projects__modal');

function moveIn(overlay) {
  overlay.style.left = '-1000%';
  let add = -75;
  setInterval(() => {
    if (add <= 50) {
      add += 2;
      overlay.style.left = `${add}%`;
    }
  }, 10);
}

function moveOut(overlay) {
  let down = 1;
  const disappear = setInterval(() => {
    overlay.style.opacity = `${down}`;
    down -= 0.02;
    if (down <= 0) {
      clearInterval(disappear);
      overlay.style.opacity = 1;
      overlay.parentElement.removeChild(newDiv);
    }
  }, 10);
}

function showPoppup(e) {
  e.preventDefault();
  pageBlurr.setAttribute('class', 'pageBlurr');
  const client = this;
  poppupInfo.forEach(info => {
    if (client.title === info.client) {
      const markup = `
          <div class="closeModal role="button">
              <div class="closeModal__line01">Lijn01</div>
              <div class="closeModal__line02">Lijn02</div>
          </div>
          <a href="${info.link}"  >  
          <img src="${info.image}" class="projects__modal__screenshots" alt="${info.client}">
          <h2 class="projects__modal__h2">${info.client}</h2>
          <p class="projects__modal__p">${info.content}</p>
          <p class="projects__modal__p projects__modal__p--smallFont">TOOLS: ${info.tools}</p>
        </a>`;
      newDiv.innerHTML = markup;
    }
  });

  const overlay = this.parentElement.appendChild(newDiv);
  moveIn(overlay);
  overlayShow = true;

  if (overlayShow) {
    const closeModal = document.querySelector('.closeModal');
    closeModal.addEventListener('click', () => {
      moveOut(overlay);
      pageBlurr.setAttribute('class', '');
      projectsOverlays.forEach(projectOverlay => {
        projectOverlay.style.zIndex = '1000';
      });
    });
    overlayShow = false;
  }

  projectsOverlays.forEach(projectOverlay => {
    projectOverlay.style.zIndex = 'initial';
  });
}

projects.forEach(project => project.addEventListener('click', showPoppup));
