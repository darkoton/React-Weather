import axios from 'axios';

const key = '75b1bf8b3bcd2aae617d91ae606e57e3';

export default (path, ...args) =>
  axios(
    `https://api.openweathermap.org/${path}${(path.includes('?') ? '&' : '?') + 'appid=' + key}`,
    ...args,
  ).then(r => r);
