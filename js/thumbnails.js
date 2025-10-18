import { generatePhotos } from './data.js';

const photos = generatePhotos();

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const pictureElement = template.cloneNode(true);

  const image = pictureElement.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  fragment.appendChild(pictureElement);
});

container.appendChild(fragment);
