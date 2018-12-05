import poppupInfo from './poppupInfo';

const projects = Array.from(document.querySelectorAll('.projects'));
const newDiv = document.createElement('div');
const pageBlurr = document.createElement('div');
const main = document.querySelector('.main');
const pageWrapper = document.querySelector('.pageWrapper');
let overlayShow = false;

pageWrapper.insertBefore(pageBlurr, main);


newDiv.setAttribute('class', 'projects__modal');

function showPoppup(e) {
  e.preventDefault();
  pageBlurr.setAttribute('class', 'pageBlurr');
  const client = this;
  poppupInfo.forEach((info) => {
    if (client.title === info.client) {
      const markup = `
          <div class="closeModal role="button">
              <div class="closeModal__line01">Lijn01</div>
              <div class="closeModal__line02">Lijn02</div>
          </div>
          <img src="${info.image}" class="projects__modal__screenshots" alt="${info.client}">
          <h2 class="projects__modal__h2">${info.client}</h2>
          <p class="projects__modal__p">${info.content}</p>
          <a href=${info.link} class="projects__modal__link" target="_blank">Ga naar de site</a>`;
      newDiv.innerHTML = markup;
    }
  });
  const overlay = this.parentElement.appendChild(newDiv);
  overlayShow = true;

  if (overlayShow) {
    const closeModal = document.querySelector('.closeModal');
    closeModal.addEventListener('click', () => {
      overlay.parentElement.removeChild(newDiv);
      pageBlurr.setAttribute('class', '');
    });
    overlayShow = false;
  }
}

projects.forEach(project => project.addEventListener('click', showPoppup));
