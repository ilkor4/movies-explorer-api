const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  signup,
  signin,
  signout,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/user');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, updateCurrentUser);

module.exports = router;
