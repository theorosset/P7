const Router = require('express').Router();
const UserControllers = require('../Controllers/user');

Router.post('/signup', UserControllers.signup);
Router.post('/login', UserControllers.login);

module.exports = Router;
