const router = require('express').Router();
const auth = require('../middlewares/auth');
const { updateCurrentUserValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/user');

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, updateCurrentUserValidation, updateCurrentUser);

module.exports = router;
