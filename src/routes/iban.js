const { checkAuth, ibanCreate, ibanUpdate, ibanDelete, ibansFetch } = require('../controllers');
const { Router } = require('express');
const name = '/iban';
const route = Router();

route.get('/', checkAuth, ibansFetch);
route.post('/', checkAuth, ibanCreate);
route.patch('/:ibanId', checkAuth, ibanUpdate);
route.delete('/:ibanId', checkAuth, ibanDelete);

module.exports = { name, route };