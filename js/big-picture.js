import { isEscapeKey } from './util.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const description = document.querySelector('.social__caption');
const closeButton = document.querySelector('.big-picture__cancel');

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(photoData) {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsShownCount.textContent = photoData.comments.length;
  commentTotalCount.textContent = photoData.comments.length;
  description.textContent = photoData.description;

  renderComments(photoData.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
