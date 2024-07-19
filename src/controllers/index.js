const { ibanCreate, ibanUpdate, ibanDelete, ibansFetch } = require('./iban.js');
const { updatePass, userUpdate, userDelete, userFetch } = require('./profile.js');
const { signIn, signUp, checkAuth } = require('./session.js');

module.exports = {
  signIn,
  signUp,
  checkAuth,

  ibanCreate,
  ibanUpdate,
  ibanDelete,
  ibansFetch,

  updatePass,
  userUpdate,
  userDelete,
  userFetch
};