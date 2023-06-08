const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, postMovie);
router.delete('/movies/:_id', auth, deleteMovie);

module.exports = router;
