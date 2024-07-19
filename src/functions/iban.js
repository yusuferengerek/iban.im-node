const { sequelize } = require('../database');
const model = sequelize._models.iban;

async function createIban (data){
  try {
    const iban = await model.create(data);
    await iban.save();

    return { code: 201, message: 'The iban was successfully created.', data: iban };
  } catch (err) {
    return { code: 500, message: 'Internal server error.', data: null  };
  }
}

async function modifyIban (ibanId, data){
  try {
    const iban = await model.findOne({ where:{ ibanId } });
    if(iban){
      await iban.update(data);
      await iban.save();

      return { status: 200, message: 'The iban was successfully modified.', data: iban };
    } else {
      return { status: 404, message: 'Iban not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

async function deleteIban (ibanId){
  try {
    const iban = await model.findOne({ where:{ ibanId } });
    if(iban){
      await iban.destroy();
      return { status: 200, message: 'The iban was successfully deleted.', data: null };
    } else {
      return { status: 404, message: 'Iban not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

async function fetchIbans (userId){
  try {
    const ibans = await model.findAll({ where: { ownerId: userId }});
    if(ibans){
      return { status: 200, message: 'Ibans listed successfully.', data: ibans };
    } else {
      return { status: 404, message: 'Ibans not found.', data: null };
    }
  } catch (err) {
    return { status: 500, message: 'Internal server error.', data: null };
  }
}

module.exports = { createIban, modifyIban, deleteIban, fetchIbans };