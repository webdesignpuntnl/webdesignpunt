/* eslint-disable*/
const form = document.querySelector('#contactForm');
const nameField = form.querySelector('#nameField');
const subjectField = form.querySelector('#subjectField');
const emailField = form.querySelector('#emailField');
// const phoneField = form.querySelector('#phoneField');
// const remarksField = form.querySelector('#remarksField');
const submitButton = form.querySelector('.input__textInput__submitButton');
let submitClicked = false;



const fields = [nameField, subjectField];

function displayMessage(valid, whichField) {
  const div = document.createElement('div');
  div.setAttribute('class', 'input__message');

  if (!submitClicked) {
    whichField.parentNode.insertBefore(div, whichField);
  }
  !valid || whichField.value === '' ? div.innerText = whichField.title : div.remove();
}

function testInput(whichField) {
  let valid = false;
  if (whichField === nameField) {
    valid = /[a-zA-Z]/.test(whichField.value);
    displayMessage(valid, whichField);
  } else if (whichField === subjectField) {
    valid = /[a-zA-Z0-9]/.test(whichField.value);
    displayMessage(valid, whichField);
  }
  // } else if (whichField === emailField) {
  //   valid = /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(whichField.value);
  //   !valid || whichField.value === '' ? div.innerText = whichField.title : div.remove();
  return valid;
}

function validate(whichField, valid) {
  valid = testInput(whichField);
  return valid;
}

fields.forEach((field) => {
  field.addEventListener('focus', function () {
    testInput(this);
  });
  // field.addEventListener('click', function () {
  //   testInput(this);
  // });
});

submitButton.addEventListener('click', (e) => {
  const nameValid = validate(nameField);
  const subjectValid = validate(subjectField);
  const emailValid = validate(emailField);
  // const allFieldsValid = nameValid && subjectValid && emailValid;
  const allFieldsValid = nameValid && subjectValid;
  submitClicked = true;

  if (!allFieldsValid) e.preventDefault();
});
