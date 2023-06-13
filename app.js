require('dotenv').config();

const { PORT = 3000, URI, NODE_ENV } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cookeyParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { mongoURL } = require('./utils/constants');

const { userRouter, movieRouter } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const corsRequest = require('./middlewares/corsRequest');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-err');
const globalErrorsHandler = require('./middlewares/globalErrorsHandler');

const app = express();

mongoose.connect(NODE_ENV === 'production' ? URI : mongoURL, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookeyParser());

app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(corsRequest);

app.use('/', userRouter);
app.use('/', movieRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Ошибка 404. Данного ресурса не существует.'));
});

app.use(errorLogger);

app.use(errors());

app.use(globalErrorsHandler);

app.listen(PORT);
