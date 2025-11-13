const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const ERRORTEXT = {
  [METHOD.GET]: 'Не удалось загрузить данные. Попробуйте ещё раз',
  [METHOD.POST]: 'Не удалось отправить данные формы',
};

const load = (route, method = METHOD.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) =>
      response.ok ? response.json() : Promise.reject(ERRORTEXT[method])
    );

const getData = () => load(ROUTE.GET_DATA);

const sendData = (body) => load(ROUTE.SEND_DATA, METHOD.POST, body);

export { getData, sendData };

