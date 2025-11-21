import { getData } from './api.js';
import { openBigPicture } from './big-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const ERROR_MESSAGE_TIMEOUT = 5000;

const createThumbnail = (photo) => {
  const pictureElement = template.cloneNode(true);

  const image = pictureElement.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);

  });

  return pictureElement;
};

export const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => fragment.appendChild(createThumbnail(photo)));
  container.appendChild(fragment);
};

export const showDataErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  document.body.appendChild(errorTemplate);

  setTimeout(() => {
    const message = document.querySelector('.data-error');
    if (message) {
      message.remove();
    }
  }, ERROR_MESSAGE_TIMEOUT);
};

getData()
  .then((photos) => renderThumbnails(photos))
  .catch(() => showDataErrorMessage());
