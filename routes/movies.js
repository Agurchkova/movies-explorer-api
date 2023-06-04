const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  movieIdValidation,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
