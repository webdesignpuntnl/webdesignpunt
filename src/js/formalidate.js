const form = document.querySelector('#contactForm');
const formInputs = form.querySelectorAll('input');
const submitButton = form.querySelector('button');

const div = document.createElement('div');
div.setAttribute('class', 'input__message');


function checkInput(e) {
  if (e.type === 'click') e.preventDefault();
  const userInput = this.value;
  this.parentNode.insertBefore(div, this);

  const textTest = /^[a-zA-Z]*$/i;
  const testInput = userInput.match(textTest);

  const emailTest = /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/i;
  const telephoneTest = /^[0-9]*$/i;

  console.log(emailTest, telephoneTest);

  if (!testInput || userInput === '') {
    div.innerText = this.title;
  } else if (userInput) {
    div.innerText = '';
  }
}


formInputs.forEach((input) => {
  input.addEventListener('focus', checkInput);
  input.addEventListener('blur', checkInput);
  input.addEventListener('change', checkInput);
});

submitButton.addEventListener('click', checkInput);
