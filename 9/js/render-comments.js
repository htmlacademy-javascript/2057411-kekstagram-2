const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentCountContainer = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentTemplate);
  });

  commentsList.appendChild(commentsFragment);

  const shownCountElement = commentCountContainer.querySelector('.social__comment-shown-count');
  const totalCountElement = commentCountContainer.querySelector('.social__comment-total-count');

  if (shownCountElement) {
    shownCountElement.textContent = renderedCommentsLength;
  }

  if (totalCountElement) {
    totalCountElement.textContent = comments.length;
  }

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (photoComments) => {
  comments = photoComments;
  clearComments();
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};

export { clearComments, renderComments };
