const { sequelize } = require('../database');
const model = sequelize._models.user;

async function createUser (data){
  try {
    const user = await model.create(data);
    await user.save();

    return { code: 201, message: 'The user was successfully created.', data: user };
  } catch (err) {
    return { code: 500, message: 'Internal server error.', data: null  };
  }
}

async function modifyUser (userId, data){
  try {
    const user = await model.findOne({ where:{ userId } });
    if(user){
      await user.update(data);
      await user.save();

      return { status: 200, message: 'The user was successfully modified.', data: user };
    } else {
      return { status: 404, message: 'User not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

async function deleteUser (userId){
  try {
    const user = await model.findOne({ where:{ userId } });
    if(user){
      await user.destroy();
      return { status: 200, message: 'The user was successfully deleted.', data: null };
    } else {
      return { status: 404, message: 'User not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

async function fetchUsers (userId){
  try {
    const users = await model.find({ where:{ userId } });
    if(users){
      return { status: 200, message: 'User fetched successfully.', data: users };
    } else {
      return { status: 404, message: 'User not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

module.exports = { createUser, modifyUser, deleteUser, fetchUsers };