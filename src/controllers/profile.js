const { modifyUser, deleteUser, fetchUsers } = require('../functions');
const bcrypt = require('bcrypt');

async function updatePass (req, res){
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req;
    const user = await fetchUsers(userId);
    if(user.status == 200){
      const passwordsEqual = await bcrypt.compare(oldPassword, user.data.password);
      if(!passwordsEqual){
        return res.json({ status: 401, message: 'Wrong password.' });
      }
      const password = await bcrypt.hash(newPassword, 12);
      user.data.password = password;
      const { status, message, data } = await modifyUser(userId, user.data);
      return res.json({ status, message, data });
    }else{
      return resjson({ status: user.status, message: user.message, data: user.data });
    }
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function userUpdate (req, res){
  try {
    const { handle, firstName, lastName, bio, avatar } = req.body;
    const { userId } = req;
    const { status, message, data } = await modifyUser(
      userId, { handle, firstName, lastName, bio, avatar }
    );
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function userDelete (req, res){
  try {
    const { userId } = req;
    const { status, message, data } = await deleteUser(userId);
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function userFetch (req, res){
  try {
    const { userId } = req;
    const { status, message, data } = await fetchUsers(userId);
    delete data['password'];
    delete data['deletedAt'];
    delete data['admin'];
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

module.exports = { updatePass, userUpdate, userDelete, userFetch };