const { createUser, modifyUser, deleteUser, fetchUsers } = require('./user.js');
const { createIban, modifyIban, deleteIban, fetchIbans } = require('./iban.js');
const { createGroup, modifyGroup, deleteGroup, fetchGroups } = require('./group.js');

module.exports = {
  createUser,
  modifyUser,
  deleteUser,
  fetchUsers,

  createIban,
  modifyIban,
  deleteIban,
  fetchIbans,

  createGroup,
  modifyGroup,
  deleteGroup,
  fetchGroups
};