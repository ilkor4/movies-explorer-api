require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cookeyParser = require('cookie-parser');
const { errors } = require('celebrate');

const { userRouter, movieRouter } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsRequest = require('./middlewares/corsRequest');

const NotFoundError = require('./errors/not-found-err');
const globalErrorsHandler = require('./middlewares/globalErrorsHandler');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookeyParser());

app.use(requestLogger);

app.use(corsRequest);

app.use('/', userRouter);
app.use('/', movieRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404. Данного ресурса не существует.'));
});

app.use(errorLogger);

app.use(errors());

app.use(globalErrorsHandler);

app.listen(PORT);
