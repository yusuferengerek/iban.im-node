const { createUser, fetchUsers } = require('../functions');
const { app } = require('../config.json');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function signIn (req, res){
  try {
    const { email, password } = req.body;
    const { status, message, data } = await fetchUsers({ email });
    if(data){
      const passwordsEqual = await bcrypt.compare(password, data.password);
      if(!passwordsEqual){
        return res.json({ status: 401, message: 'Wrong password.' });
      }
      const token = jsonwebtoken.sign(data, app.secret, { expiresIn: '1h' });
      return res.json({ status: 200, token, expire: 1000 * 60 * 60 });
    }else{
      return res.json({ status, message, data });
    }
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function signUp (req, res){
  try {
    const { email, password, handle, firstName, lastName } = req.body;
    password = await bcrypt.hash(password, 12);
    const { status, message, data } = await createUser({
      email, password, handle, firstName, lastName
    });
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function checkAuth (req, res, next){
  try {
    if(req.isAuthenticated) return next();
    req.isAuthenticated = false;
    req.userId = null;

    const { authorization } = req.headers;
    if(!authorization){
      return res.json({ status: 401, message: 'There is no token provided.' });
    }

    try {
      const check = jsonwebtoken.verify(authorization, app.secret);
      if(!check){
        return res.json({ status: 401, message: 'Unauthorized.' });
      }else{
        req.isAuthenticated = true;
        req.userId = check.userId;
        return next();
      }
    } catch (err) {
      console.warn(err);
      return res.json({ status: 401, message: 'That\'s token is expired.' });
    }
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

module.exports = { signIn, signUp, checkAuth };