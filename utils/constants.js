const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://ilkor.student.nomoredomains.rocks',
  'http://ilkor.student.nomoredomains.rocks',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const regex = /^https?:\/\/(www\.)?[-._~:/?#@!$[&'()*+,;=*a-z0-9]/;

module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  regex,
};
