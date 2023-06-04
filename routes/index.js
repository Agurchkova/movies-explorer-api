const express = require('express');

const router = express.Router();
const { createUser, login, logout } = require('../controllers/users');
const { signUpValidation, signInValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

// crash-test route
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const userRouter = require('./users');
const movieRouter = require('./movies');

// роуты с авторизацией
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.post('/signout', auth, logout);

// роуты, не требующие авторизации (регистрация, логин и логаут)
router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

module.exports = router;
