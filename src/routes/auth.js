const { signIn, signUp } = require('../controllers');
const { Router } = require('express');
const name = '/auth';
const route = Router();

route.get('/sign-up', signUp);
route.get('/sign-in', signIn);

module.exports = { name, route };