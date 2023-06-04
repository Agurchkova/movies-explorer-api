const mongoose = require('mongoose');
const Movie = require('../models/movie');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/index');
const {
  OK,
  MOVIE_WRONG_DATA_MSG,
  MOVIE_DELETE_MSG,
  MOVIE_FORBIDDEN_MSG,
  MOVIE_NOT_FOUND_MSG,
  MOVIE_WRONG_ID_MSG,
} = require('../utils/constants');

// getMovies
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MSG);
      }
      res.send(movies);
    })
    .catch(next);
};

// createMovie
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(OK).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(MOVIE_WRONG_DATA_MSG));
      }
      return next(err);
    });
};

// deleteMovie
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MSG);
      }
      if (movie.owner.valueOf() !== _id) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_MSG);
      }
      return movie.deleteOne();
    })
    .then((deleteMovie) => {
      res.send({ message: MOVIE_DELETE_MSG, deleteMovie });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(MOVIE_WRONG_ID_MSG));
      }
      return next(err);
    });
};
