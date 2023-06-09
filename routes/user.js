const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { regex } = require('../utils/constants');

const {
  signup,
  signin,
  signout,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, updateCurrentUser);

module.exports = router;
