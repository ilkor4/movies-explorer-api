const rootRouter = require('express').Router();

const auth = require('../middlewares/auth');
const { signinValidation, signupValidation } = require('../middlewares/validation');
const userRouter = require('./user');
const movieRouter = require('./movie');

const {
  signup,
  signin,
  signout,
} = require('../controllers/user');

rootRouter.post('/signup', signupValidation, signup);
rootRouter.post('/signin', signinValidation, signin);
rootRouter.get('/signout', auth, signout);

rootRouter.use('/', movieRouter);
rootRouter.use('/', userRouter);

module.exports = rootRouter;
