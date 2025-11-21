const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'jfif'];

export function initPreview() {
  const uploadFileInputElement = document.querySelector('#upload-file');
  const uploadPreview = document.querySelector('.img-upload__preview img');
  const uploadPreviewEffects = document.querySelectorAll('.effects__preview');

  uploadFileInputElement.addEventListener('change', () => {
    const file = uploadFileInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (!matches) {
      return;
    }

    const url = URL.createObjectURL(file);

    uploadPreview.src = url;

    uploadPreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url('${url}')`;
    });
  });
}
