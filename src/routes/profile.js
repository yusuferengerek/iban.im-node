const { checkAuth, updatePass, userUpdate, userDelete, userFetch } = require('../controllers');
const { Router } = require('express');
const name = '/me';
const route = Router();

route.get('/', checkAuth, userFetch);
route.delete('/', checkAuth, userDelete);
route.patch('/profile', checkAuth, userUpdate);
route.patch('/password', checkAuth, updatePass);

module.exports = { name, route };