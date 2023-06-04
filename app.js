require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter');
const allRouters = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const { PORT, DB_ADDRESS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  PAGE_NOT_EXIST_MSG,
} = require('./utils/constants');

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(cors);

app.use(cookieParser());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(limiter);

// роуты, которым авторизация нужна
app.use(allRouters);

// обработка ошибки неправильного пути
app.use('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_EXIST_MSG));
});

app.use(errorLogger);

// обработчики ошибок
app.use(errors());
app.use(errorHandler);
