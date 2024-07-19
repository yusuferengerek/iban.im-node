const { sequelize } = require('../database');
const model = sequelize._models.group;

async function createGroup (data){
  try {
    const group = await model.create(data);
    await group.save();

    return { code: 201, message: 'The group was successfully created.', data: group };
  } catch (err) {
    return { code: 500, message: 'Internal server error.', data: null  };
  }
}

async function modifyGroup (groupId, data){
  try {
    const group = await model.findOne({ where:{ groupId } });
    if(group){
      await group.update(data);
      await group.save();

      return { status: 200, message: 'The group was successfully modified.', data: group };
    } else {
      return { status: 404, message: 'Group not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

async function deleteGroup (groupId){
  try {
    const group = await model.findOne({ where:{ groupId } });
    if(group){
      await group.destroy();
      return { status: 200, message: 'The group was successfully deleted.', data: null };
    } else {
      return { status: 404, message: 'Group not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

async function fetchGroups (){
  try {
    const groups = await model.findAll();
    if(groups){
      return { status: 200, message: 'Groups listed successfully.', data: groups };
    } else {
      return { status: 404, message: 'Groups not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

module.exports = { createGroup, modifyGroup, deleteGroup, fetchGroups };