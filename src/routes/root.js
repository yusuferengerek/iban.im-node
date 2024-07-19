const { Router } = require('express');
const name = '/';
const route = Router();

route.get('/', function(req, res, next){
  return res.status(200).json({
    status: 200,
    message: 'Hello, welcome to Ibanim!',
    data: null
  });
});

module.exports = { name, route };