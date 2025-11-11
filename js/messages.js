import { isEscapeKey } from './util.js';

const body = document.body;

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  const successElement = template.querySelector('.success');

  const close = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEsc);
  };

  const onEsc = (evt) => {
    if (isEscapeKey(evt)) {
      close();
    }
  };

  successElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success') || evt.target.classList.contains('success__button')) {
      close();
    }
  });

  document.addEventListener('keydown', onEsc);
  body.appendChild(successElement);
};

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  const errorElement = template.querySelector('.error');

  const close = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEsc);
  };

  const onEsc = (evt) => {
    if (isEscapeKey(evt)) {
      close();
    }
  };

  errorElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('error') || evt.target.classList.contains('error__button')) {
      close();
    }
  });

  document.addEventListener('keydown', onEsc);
  body.appendChild(errorElement);
};

export { showSuccessMessage, showErrorMessage };
