import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const commentsList = document.querySelector('.social__comments');
const description = document.querySelector('.social__caption');
const commentCountContainer = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');

const commentTemplate = document.querySelector('#comment-template').content.querySelector('.social__comment');

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function openBigPicture(photoData) {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsShownCount.textContent = photoData.comments.length;
  commentTotalCount.textContent = photoData.comments.length;
  description.textContent = photoData.description;

  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  photoData.comments.forEach(comment => {
    const commentElement = commentTemplate.cloneNode(true);

    const img = commentElement.querySelector('.social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;

    const p = commentElement.querySelector('.social__text');
    p.textContent = comment.message;

    fragment.appendChild(commentElement);
  });

  commentsList.appendChild(fragment);

  commentCountContainer.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

closeButton.addEventListener('click', closeBigPicture);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

document.addEventListener('keydown', onDocumentKeydown);

export { openBigPicture };
