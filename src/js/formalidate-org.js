
const form = document.querySelector('#contactForm');
const nameField = form.querySelector('#nameField');
const subjectField = form.querySelector('#subjectField');
const emailField = form.querySelector('#emailField');
// const phoneField = form.querySelector('#phoneField');
// const remarksField = form.querySelector('#remarksField');
const submitButton = form.querySelector('.input__textInput__submitButton');
let click = false;

// const fields = [nameField, subjectField, emailField, phoneField, remarksField];
const fields = [nameField, subjectField, emailField];

function showMessage() {
  click = true;
  fields.forEach((field) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'input__message');
    div.innerText = field.title;
    field.parentNode.insertBefore(div, field);
  });
}

const div = document.createElement('div');
div.setAttribute('class', 'input__message');

function validate() {
  let valid = false;
  // if (document.querySelectorAll('.input__message').remove('.input__message'));
  this.parentNode.insertBefore(div, this);
  if (this === nameField) {
    valid = /^[a-zA-Z]*$/.test(this.value);
    !valid || this.value === '' ? div.innerText = this.title : div.innerText = '';
  } else if (this === subjectField) {
    valid = /^[a-zA-Z0-9]*$/.test(this.value);
    !valid || this.value === '' ? div.innerText = this.title : div.innerText = '';
  } else if (this === emailField) {
    valid = /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(this.value);
    !valid || this.value === '' ? div.innerText = this.title : div.innerText = '';
  }
  return valid;
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!click) showMessage();
});

fields.forEach((field) => {
  field.addEventListener('focus', validate);
  field.addEventListener('blur', validate);
});
