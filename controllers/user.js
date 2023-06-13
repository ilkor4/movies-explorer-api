const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const { jwtSignature } = require('../utils/constants');
const CodeError = require('../errors/code-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже создан.'));
          else if (err.name === 'ValidationError') next(new CodeError('Переданы некорректные данные для создания пользователя.'));
          else next(err);
        });
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = JWT.sign({ id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : jwtSignature, { expiresIn: '7d' });

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 7 * 24,
      })
        .send({ message: 'Авторизация прошла успешно.' })
        .end();
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  res.cookie('jwt', 'ooo', {
    httpOnly: true,
    sameSite: true,
    maxAge: 1,
  })
    .send({ message: 'Выход выполнен успешно.' })
    .end();
};

module.exports.getCurrentUser = (req, res, next) => {
  const { id } = req.user;

  User.findOne({ _id: id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user.id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) next(new NotFoundError('Пользователь с указанным _id не найден.'));
      else res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже создан.'));
      else next(err);
    });
};
