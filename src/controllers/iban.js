const { createIban, modifyIban, deleteIban, fetchIbans } = require('../functions');

async function ibanCreate (req, res){
  try {
    const { text, description, ownerId } = req.body;
    const { status, message, data } = await createIban({
      text, description, ownerId
    });
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function ibanUpdate (req, res){
  try {
    const { ibanId } = req.params;
    const { text, description } = req.body;
    const { status, message, data } = await modifyIban(
      ibanId, { text, description }
    );
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function ibanDelete (req, res){
  try {
    const { ibanId } = req.params;
    const { status, message, data } = await deleteIban(ibanId);
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

async function ibansFetch (req, res){
  try {
    const { userId } = req;
    const { status, message, data } = await fetchIbans(userId);
    return res.json({ status, message, data });
  } catch (err) {
    return res.json({ status: 500, message: 'Internal server error.' });
  }
}

module.exports = { ibanCreate, ibanUpdate, ibanDelete, ibansFetch };