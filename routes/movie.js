const router = require('express').Router();
const auth = require('../middlewares/auth');
const { postMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, postMovieValidation, postMovie);
router.delete('/movies/:_id', auth, deleteMovieValidation, deleteMovie);

module.exports = router;
