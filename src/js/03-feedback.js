import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};
// console.log(refs.textarea.value);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
// refs.input.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  if (email.value === '' || message.value === '') {
    return alert('Заповніть всі поля!');
  }

  console.log({ email: email.value.trim(), message: message.value.trim() });

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();

  formData = {};
}

function onTextareaInput() {
  formData = {
    email: refs.input.value.trim(),
    message: refs.textarea.value.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  // console.log(formData);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (!savedMessage) return;
  formData = JSON.parse(savedMessage);
  refs.input.value = formData.email ?? '';
  refs.textarea.value = formData.message ?? '';
}

// refs.form.addEventListener('input', e => {
//   console.log(e);
//   console.log(e.target.name);
//   console.log(e.target.value);

//   formData[e.target.name] = e.target.value;

//   console.log(formData);
// });
