import poppupInfo from './poppupInfo';

const projects = Array.from(document.querySelectorAll('.projects'));
const newDiv = document.createElement('div');
let overlayShow = false;

newDiv.setAttribute('class', 'projects__modal');

function showPoppup(e) {
  e.preventDefault();
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
          <p class="projects__modal__p">${info.content}</p>`;
      newDiv.innerHTML = markup;
    }
  });
  const overlay = this.parentElement.appendChild(newDiv);
  overlayShow = true;

  if (overlayShow) {
    const closeModal = document.querySelector('.closeModal');
    closeModal.addEventListener('click', () => overlay.parentElement.removeChild(newDiv));
    overlayShow = false;
  }
}

projects.forEach(project => project.addEventListener('click', showPoppup));
