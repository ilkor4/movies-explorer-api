const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://ilkor4.students.nomoredomains.monster',
  'http://ilkor4.students.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const regex = /^https?:\/\/(www\.)?[-._~:/?#@!$[&'()*+,;=*a-z0-9]/;

module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  regex,
};
