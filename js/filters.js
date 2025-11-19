import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

let currentFilter = 'filter-default';
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const MAX_PICTURE_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const FILTER = {
default: 'filter-default',
random: 'filter-random',
discussed: 'filter-discussed'
};

const SORTFUNC = {
random: () => 0.5 - Math.random(),
discussed: (a,b) => b.comments.length - a.comments.length,
};

const debouncedRender = debounce((data) => {
  const container = document.querySelector('.pictures');
  container.querySelectorAll('a.picture').forEach((item) => item.remove());
  renderThumbnails(data);
}, DEBOUNCE_DELAY);


function onFilterChange(evt) {
  const targetButton = evt.target;
  if (!targetButton.matches('button')) {
    return;
  }

  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (activeButton === targetButton) {
    return;
  }

  if (activeButton) {
    activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  }
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);

  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {
let filteredPictures = [];
if (currentFilter === FILTER.default) {
filteredPictures = pictures;
}
if (currentFilter === FILTER.random) {
filteredPictures = pictures.toSorted(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
}
if (currentFilter === FILTER.discussed) {
filteredPictures = pictures.toSorted(SORTFUNC.discussed).slice(0, MAX_PICTURE_COUNT);
}
debouncedRender(filteredPictures);
}

function configFilter(picturesData) {
filterElement.classList.remove('img-filters--inactive');
filterElement.addEventListener('click', onFilterChange);
pictures = picturesData;
}

export { configFilter };
