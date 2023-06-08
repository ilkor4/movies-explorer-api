require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const cookeyParser = require('cookie-parser');
const { errors } = require('celebrate');
const { userRouter, movieRouter } = require('./routes/index');
const globalErrorsHandler = require('./middlewares/globalErrorsHandler');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookeyParser());

app.use('/', userRouter);
app.use('/', movieRouter);

app.use(globalErrorsHandler);

app.listen(PORT);
