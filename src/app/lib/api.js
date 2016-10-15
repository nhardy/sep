import config from 'app/config';


export function baseUrl() { // eslint-disable-line import/prefer-default-export
  const path = '/api';
  if (__SERVER__) return `https://localhost:${config.port}${path}`;
  return path;
}
