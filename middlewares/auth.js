const JWT = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { jwtSignature } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) return next(new UnauthorizedError('Ошибка авторизации.'));

  let payload;

  try {
    payload = JWT.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : jwtSignature);
  } catch (err) {
    return next(new UnauthorizedError('Ошибка авторизации.'));
  }

  req.user = payload;

  return next();
};
