import { getRandomInteger, getRandomArrayElement } from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула и у неё получилась фотография лучше.',
  'Я уронил фотоаппарат на кота и получилось лучше.',
  'Лица перекошены, как будто их избивают. Как можно было поймать такой момент?!',
];

const NAMES = [
  'Иван',
  'Мария',
  'Сергей',
  'Юлия',
  'Олег',
  'Анна',
  'Максим',
  'Алексей',
  'Ольга',
  'Виктор',
];

let commentId = 1;

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from(
    { length: getRandomInteger(1, 2) },
    () => getRandomArrayElement(MESSAGES)
  ).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: `Это фотография №${id}`,
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});

const PHOTOS_COUNT = 25;

export const generatePhotos = () =>
  Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));
