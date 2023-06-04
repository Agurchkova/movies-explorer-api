const { celebrate, Joi } = require('celebrate');
const { RegExp } = require('../utils/constants');

// signUpValidation(регистрация)
const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

// signInValidation(логин)
const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

// updateUserValidation
const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// createMovieValidation
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().pattern(RegExp),
    trailerLink: Joi.string().pattern(RegExp),
    thumbnail: Joi.string().pattern(RegExp),
  }),
});

// movieIdValidation
const movieIdValidation = celebrate({
  params: Joi.object().keys({
    moviedId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  updateUserValidation,
  createMovieValidation,
  movieIdValidation,
};
