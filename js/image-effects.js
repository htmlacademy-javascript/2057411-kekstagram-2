const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

let currentScale = SCALE_MAX;

scaleValueInput.value = `${currentScale}%`;
imagePreview.style.transform = `scale(${currentScale / 100})`;

const setScale = (value) => {
  currentScale = value;
  scaleValueInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onSmallerClick = () => {
  if (currentScale > SCALE_MIN) {
    setScale(currentScale - SCALE_STEP);
  }
};

const onBiggerClick = () => {
  if (currentScale < SCALE_MAX) {
    setScale(currentScale + SCALE_STEP);
  }
};

scaleSmallerBtn.addEventListener('click', onSmallerClick);
scaleBiggerBtn.addEventListener('click', onBiggerClick);

noUiSlider.create(slider, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: (value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
});

effectLevel.classList.add('hidden');

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  switch (effect) {
    case 'none':
      imagePreview.style.filter = 'none';
      break;
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `grayscale(${effectLevelValue.value})`;
      });
      break;
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `sepia(${effectLevelValue.value})`;
      });
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `invert(${effectLevelValue.value}%)`;
      });
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `blur(${effectLevelValue.value}px)`;
      });
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `brightness(${effectLevelValue.value})`;
      });
  }
};

export { onSmallerClick, onBiggerClick, onEffectChange };
