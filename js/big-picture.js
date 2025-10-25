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

function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
}; 

function openBigPicture (photoData) {
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

   photoData.comments.forEach(comment => {
    const li = commentTemplate.cloneNode(true); 
    const img = li.querySelector('.social__picture');
    const p = li.querySelector('.social__text');

    img.src = comment.avatar;
    img.alt = comment.name;
    p.textContent = comment.message;

    commentsList.appendChild(li);
});

   description.textContent = photoData.description;

   commentCountContainer.classList.add('hidden');
   commentsLoader.classList.add('hidden');

   bigPicture.classList.remove('hidden');
   document.body.classList.add('modal-open');
};

closeButton.addEventListener ('click',closeBigPicture);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

export { openBigPicture };