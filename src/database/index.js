const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

const { db } = require('../config.json');
const sequelize = new Sequelize(db);
sequelize._models = {};

// MODELS INIT
const files = fs.readdirSync(path.join(__dirname, 'models'));
const confs = [];
for(const file of files){
  try{
    const { conf, model } = require(path.join(__dirname, 'models', file))(sequelize, DataTypes);
    sequelize._models[conf.name] = model;
    confs.push(conf);
    console.log(`(${file}) Model loaded.`);
  }catch (err){
    console.error(`(\\models\\${file}) There is an error. "${err}"`);
  }
}

// MODELS SHIPS
for(const conf of confs){
  for(const ship of conf.ships){
    try{
      const model = sequelize._models[conf.name];
      const target = sequelize._models[ship.target];
      model[ship.method](target, ship.data);
      console.log(`(${conf.name} -> ${ship.target}) Ship etablished.`);
    }catch{
      console.error(`(${conf.name} -> ${ship.target}) There is an error. "${ship.method}" `);
    }
  }
}

async function connect(){
  try{
    await sequelize.authenticate();
    for(const model of Object.values(sequelize._models)){
      try{
        await model.drop();
        await model.sync({ force: true });
      }catch{
        await model.sync({ force: true });
      }
    }
    await sequelize.sync();

    console.log(`PostgreSQL connection etablished.`);
  }catch (err){
    console.error(`(\\database) There is an error. "${err}"`);
  }
}

module.exports = { connect, sequelize };
