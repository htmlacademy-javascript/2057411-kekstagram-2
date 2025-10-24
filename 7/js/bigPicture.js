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

   photoData.comments.forEach(comment=> {
    const li = document.createElement('li');
    li.className = 'social__comment';

    const img = document.createElement('img');
    img.className = 'social__picture';
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.className = 'social__text';
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);
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