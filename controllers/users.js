require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { jwtKey } = require('../utils/jwtKey');
const User = require('../models/user');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require('../errors/index');
const {
  OK,
  SIGNUP_WRONG_DATA_MSG,
  SIGNUP_CONFLICT_MSG,
  SIGNIN_MSG,
  SIGNOUT_MSG,
  USER_ID_NOT_FOUND_MSG,
  USER_NOT_FOUND_MSG,
  USER_UPDATE_WRONG_DATA_MSG,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = require('../config');

// User authentication
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // создание токена
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtKey,
        {
          expiresIn: '7d',
        },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).send({ message: SIGNIN_MSG });
    })
    .catch(next);
};

// logout
module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: SIGNOUT_MSG });
};

// createUser
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      ...req.body, password: hash,
    }))
    .then(({
      email,
      name,
      _id,
    }) => {
      res.status(OK).send(
        {
          data: {
            email, name, _id,
          },
        },
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(SIGNUP_CONFLICT_MSG));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(SIGNUP_WRONG_DATA_MSG));
      }
      return next(err);
    });
};

// getCurrentUser
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    // проверка пользователя по id
    if (!user) {
      return next(new NotFoundError(USER_ID_NOT_FOUND_MSG));
    }
    // возвращаем пользователя
    return res.status(OK).send(user);
  }).catch(next);
};

// функция обновления информации о пользователе с общей логикой
function updateInfo(res, next, id, props) {
  User.findByIdAndUpdate(
    id,
    props,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw next(new NotFoundError(USER_NOT_FOUND_MSG));
      }
      return res.status(OK).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(USER_UPDATE_WRONG_DATA_MSG));
      }
      return next(err);
    });
}

// функция-контроллер вносит изменения в данные пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  return updateInfo(res, next, userId, { name, about });
};
