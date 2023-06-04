/* eslint no-useless-escape: "error" */
const RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const OK = 200;
const STATUS_BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const STATUS_NOT_FOUND = 404;
const STATUS_ETERNAL_SERVER_ERROR = 404;
const CONFLICT = 409;

// errors messages
const SIGNUP_WRONG_DATA_MSG = 'Переданы некорректные данные';
const SIGNUP_CONFLICT_MSG = 'Пользователь с таким email уже зарегистрирован';
const SIGNIN_MSG = 'Успешный вход в приложение';
const SIGNOUT_MSG = 'Успешный выход из приложения';
const USER_ID_NOT_FOUND_MSG = 'Пользователь с таким id не найден';
const USER_NOT_FOUND_MSG = 'Пользователь не найден';
const USER_UPDATE_WRONG_DATA_MSG = 'Переданы некорректные данные для редактирования профиля';
const MOVIE_WRONG_DATA_MSG = 'Переданы некорректные данные для создания фильма';
const MOVIE_DELETE_MSG = 'Фильм успешно удалён';
const MOVIE_FORBIDDEN_MSG = 'Нет прав для удаления фильма';
const MOVIE_NOT_FOUND_MSG = 'Фильм не найден';
const MOVIE_WRONG_ID_MSG = 'Передан некорректный ID фильма';
const AUTHORIZATION_MSG = 'Необходима авторизация';
const PAGE_NOT_EXIST_MSG = 'Запрашиваемая страница не существует';

const allowedCors = [
  'http://agurchkova.movies.nomoredomains.rocks',
  'https://agurchkova.movies.nomoredomains.rocks',
  'http://158.160.37.182',
  'https://158.160.37.182',
  'http://localhost:3000',
  'https://localhost:3000',
];

// allowed methods
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  OK,
  RegExp,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_ETERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  SIGNUP_WRONG_DATA_MSG,
  SIGNUP_CONFLICT_MSG,
  SIGNIN_MSG,
  SIGNOUT_MSG,
  USER_ID_NOT_FOUND_MSG,
  USER_NOT_FOUND_MSG,
  USER_UPDATE_WRONG_DATA_MSG,
  MOVIE_WRONG_DATA_MSG,
  MOVIE_DELETE_MSG,
  MOVIE_FORBIDDEN_MSG,
  MOVIE_NOT_FOUND_MSG,
  MOVIE_WRONG_ID_MSG,
  AUTHORIZATION_MSG,
  PAGE_NOT_EXIST_MSG,
};
