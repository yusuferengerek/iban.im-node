const { signIn, signUp } = require('../controllers');
const { Router } = require('express');
const name = '/auth';
const route = Router();

route.post('/sign-up', signUp);
route.post('/sign-in', signIn);

module.exports = { name, route };
