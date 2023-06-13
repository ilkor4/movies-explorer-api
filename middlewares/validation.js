const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/constants');

const postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    duration: Joi.number().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailerLink: Joi.string().required().pattern(regex),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const updateCurrentUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  postMovieValidation,
  deleteMovieValidation,
  signupValidation,
  signinValidation,
  updateCurrentUserValidation,
};
