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

const socialComment = bigPicture.querySelector('.social__comment');

function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
}; 

function openBigPicture (photoData) {
  const commentsFragment = document.createDocumentFragment();
   bigPictureImg.src = photoData.url;
   likesCount.textContent = photoData.likes; 
   commentsShownCount.textContent = photoData.comments.length;
   commentTotalCount.textContent = photoData.comments.length;
   commentsList.innerHTML = '';

   const commentTemplate = document.createElement('li');
   commentTemplate.className = 'social__comment';

   const commentImg = document.createElement('img');
   commentImg.className = 'social__picture';
   commentImg.width = 35;
   commentImg.height = 35;

   const commentText = document.createElement('p');
   commentText.className = 'social__text';

   commentTemplate.appendChild(commentImg);
   commentTemplate.appendChild(commentText);

   photoData.comments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentTemplate);
});
   commentsList.appendChild(commentsFragment);

   description.textContent = photoData.description;

   commentCountContainer.classList.add('hidden');
   commentsLoader.classList.add('hidden');

   bigPicture.classList.remove('hidden');
   document.body.classList.add('modal-open');

   document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener ('click',closeBigPicture);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

export { openBigPicture };