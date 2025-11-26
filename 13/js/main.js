import { getData } from './api.js';
import { renderThumbnails, showDataErrorMessage } from './thumbnails.js';
import { configFilter } from './filters.js';
import { initUploadModal } from './form.js';
import { initPreview } from './preview.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    configFilter(photos);
  })
  .catch(showDataErrorMessage);

initUploadModal();
initPreview();
