const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { jwtKey } = require('../utils/jwtKey');
const {
  AUTHORIZATION_MSG,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(AUTHORIZATION_MSG));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtKey);
  } catch (err) {
    return next(new UnauthorizedError(AUTHORIZATION_MSG));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
