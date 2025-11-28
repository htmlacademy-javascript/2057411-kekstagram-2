import { isEscapeKey } from './util.js';
import { closePhotoEditor } from './form.js';

const body = document.body;

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  const successElement = template.querySelector('.success');

  function close() {
    successElement.remove();
    document.removeEventListener('keydown', onDocumentSuccessKeydown);
    closePhotoEditor();
  }

  function onDocumentSuccessKeydown(evt) {
    if (isEscapeKey(evt)) {
      close();
    }
  }

  successElement.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains('success') ||
      evt.target.classList.contains('success__button')
    ) {
      close();
    }
  });

  document.addEventListener('keydown', onDocumentSuccessKeydown);
  body.appendChild(successElement);
};

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  const errorElement = template.querySelector('.error');

  function close() {
    errorElement.remove();
    document.removeEventListener('keydown', onDocumentErrorKeydown);
  }

  function onDocumentErrorKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      close();
    }
  }

  errorElement.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains('error') ||
      evt.target.classList.contains('error__button')
    ) {
      close();
    }
  });

  document.addEventListener('keydown', onDocumentErrorKeydown);
  body.appendChild(errorElement);
};

export { showSuccessMessage, showErrorMessage };
