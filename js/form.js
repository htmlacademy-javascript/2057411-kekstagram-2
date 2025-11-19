import { isEscapeKey } from './util.js';
import { onSmallerClick, onBiggerClick, onEffectChange } from './image-effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_COMMENT_LENGTH = 140;

const pageBody = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');
const submitButton = uploadForm.querySelector('#upload-submit');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

let errorMessage = '';
const error = () => errorMessage;

const validateHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы'
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const validateComment = (value) => {
  return value.length <= MAX_COMMENT_LENGTH;
};

const onPhotoEditorResetButtonClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closePhotoEditor();
    }
  }
};

export function closePhotoEditor() {
  uploadForm.reset();
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetButton.removeEventListener('click', onPhotoEditorResetButtonClick);
  uploadFileControl.value = '';
}

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    const smaller = document.querySelector('.scale__control--smaller');
    const bigger = document.querySelector('.scale__control--bigger');
    const effectsList = document.querySelector('.effects__list');

    smaller.addEventListener('click', onSmallerClick);
    bigger.addEventListener('click', onBiggerClick);
    effectsList.addEventListener('change', onEffectChange);

    photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  hashtagInput.value = hashtagInput.value.trim().replace(/\s+/g, ' ');
  const formData = new FormData(uploadForm);
  submitButton.disabled = true;

  sendData(formData)
    .then(() => {
      closePhotoEditor();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButton.disabled = false;
    });
};

pristine.addValidator(hashtagInput, validateHashtags, error, 2, false);
pristine.addValidator(commentInput, validateComment, () => `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`, 2, false);
uploadForm.addEventListener('submit', onFormSubmit);
