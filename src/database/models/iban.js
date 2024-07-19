const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes){
  const conf = {
    name: 'iban',
    ships: []
  };

  const model = sequelize.define(conf.name, {
    ibanId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: 'deleted_at', // SQL'de indeks ismi
    },
    text: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeSave: async (iban, options) => {
        if (await model.findOne({
          where: {
            ownerId: iban.ownerId,
            ibanId: {
              [sequelize.Op.ne]: iban.ibanId || 0,
            },
          },
        })) {
          throw new Error('Handle already exists');
        }
      },
    },
  });

  model.prototype.validate = function() {
    if (!this.text) {
      throw new Error('You have to provide IBAN');
    }
  };

  return { conf, model };
};