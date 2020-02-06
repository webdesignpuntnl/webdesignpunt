//! moet nog kijken naar codesplitting. Nu wordt deze code op elke pagina geladen

const form = document.querySelector('#contactForm');
const hiddenField = document.querySelector('#hiddenField');
const nameField = form.querySelector('#nameField');
const subjectField = form.querySelector('#subjectField');
const emailField = form.querySelector('#emailField');
const phoneField = form.querySelector('#phoneField');
const remarksField = form.querySelector('#remarksField');
const submitButton = form.querySelector('.input__textInput__submitButton');
let submitClicked = false;

const fields = [hiddenField, nameField, subjectField, emailField, phoneField, remarksField];

function displayMessage(valid, whichField) {
  const userMessage = whichField.parentNode.querySelector('.input__message');

  if (!submitClicked && !valid) {
    userMessage.innerText = whichField.title;
  } else if (valid) {
    userMessage.innerText = '';
  }
}

function testInput(whichField) {
  let valid = false;
  if (whichField === nameField) {
    valid = /[a-zA-Z][^0-9/:http@]$/.test(whichField.value);
    displayMessage(valid, whichField);
  } else if (whichField === subjectField) {
    valid = /[a-zA-Z]/.test(whichField.value);
    displayMessage(valid, whichField);
  } else if (whichField === emailField) {
    valid = /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(
      whichField.value
    );
    displayMessage(valid, whichField);
  } else if (whichField === phoneField) {
    valid = /^((\+|00(\s|\s?-\s?)?)31(\s|\s?-\s?)?(\(0\)[-\s]?)?|0)[1-9]((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/.test(
      whichField.value
    );
    displayMessage(valid, whichField);
  } else if (whichField === remarksField) {
    valid = /[a-zA-Z0-9]$/.test(whichField.value);
    displayMessage(valid, whichField);
  } else if (whichField === hiddenField) {
    if (hiddenField.value === '') {
      valid = true;
    }
  }
  return valid;
}

function validate(whichField, valid) {
  valid = testInput(whichField);
  return valid;
}

fields.forEach(field => {
  // field.addEventListener('focus', function () {
  //   testInput(this);
  // });
  field.addEventListener('blur', function blur() {
    testInput(this);
  });
  // field.addEventListener('click', function () {
  //   testInput(this);
  // });

  const div = document.createElement('div');
  div.setAttribute('class', 'input__message');
  field.parentNode.insertBefore(div, field);
});

submitButton.addEventListener('click', e => {
  const nameValid = validate(nameField);
  const subjectValid = validate(subjectField);
  const emailValid = validate(emailField);
  const phoneValid = validate(phoneField);
  const remarksValid = validate(remarksField);
  const hiddenFieldValid = validate(hiddenField);

  const allFieldsValid = nameValid && subjectValid && emailValid && phoneValid && remarksValid && hiddenFieldValid;
  submitClicked = true;

  if (!allFieldsValid) e.preventDefault();
});
